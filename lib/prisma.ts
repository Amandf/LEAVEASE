import { PrismaClient } from '@prisma/client';

// Type-safe global extension
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Enhanced Prisma client with logging and error handling
const createPrismaClient = (): PrismaClient => {
  const prisma = new PrismaClient({
    log: [
      { level: 'warn', emit: 'event' },
      { level: 'error', emit: 'event' },
      { level: 'query', emit: 'event' },
    ],
  });

  // Add logging in development
  if (process.env.NODE_ENV !== 'production') {
    prisma.$on('query', (e) => {
      console.log(`Query: ${e.query}`);
      console.log(`Duration: ${e.duration}ms`);
    });

    prisma.$on('error', (e) => {
      console.error(`Prisma Error: ${e.message}`);
    });

    prisma.$on('warn', (e) => {
      console.warn(`Prisma Warning: ${e.message}`);
    });
  }

  // Middleware for common operations
  prisma.$use(async (params, next) => {
    // Add timestamps for create/update operations
    if (params.action === 'create' || params.action === 'update') {
      if (params.args.data) {
        params.args.data.updatedAt = new Date();
        if (params.action === 'create') {
          params.args.data.createdAt = new Date();
        }
      }
    }
    return next(params);
  });

  return prisma;
};

// Singleton pattern implementation
const prisma: PrismaClient = globalThis.prisma || createPrismaClient();

// Store in globalThis for development hot-reload
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

// Proper shutdown hook
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export { prisma };