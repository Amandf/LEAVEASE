// next-auth.d.ts
import { Role } from "@prisma/client"; // Import Role from Prisma
import { DefaultSession, DefaultUser } from "next-auth"; // Import Default types from next-auth
import { DefaultJWT } from "next-auth/jwt"; // Import DefaultJWT type

// Extend the default session type provided by next-auth
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string; // Add the `id` field to the user
      role: Role; // Add the `role` field from Prisma
    } & DefaultSession["user"]; // Ensure other default properties remain
    accessToken?: string; // Optionally add the `accessToken`
  }

  interface User extends DefaultUser {
    role: Role; // Add the `role` field from Prisma
    id: string; // Add the `id` field to the user
  }
}

// Extend the default JWT type provided by next-auth
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string; // Add the `id` field to the JWT
    role: Role; // Add the `role` field from Prisma
    accessToken?: string; // Optionally add the `accessToken` field
  }
}
