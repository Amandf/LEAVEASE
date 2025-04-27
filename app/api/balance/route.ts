import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from "next/server";

type SubmittedCredits = {
  annual: number;
  family: number;
  health: number;
  study: number;
  maternity: number;
  paternity: number;
  unpaid?: number; // Made optional since not used in the function
  email: string;
  year: string;
  name: string;
};

export async function POST(req: NextRequest) {
  try {
    // Validate Prisma client initialization
    if (!prisma) {
      console.error('Prisma client not initialized');
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }

    // Validate request body
    const body = await req.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    // Destructure with validation
    const requiredFields = ['annual', 'family', 'health', 'study', 'maternity', 'paternity', 'year', 'email', 'name'];
    for (const field of requiredFields) {
      if (body[field] === undefined) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const {
      annual,
      family,
      health,
      study,
      maternity,
      paternity,
      year,
      email,
      name,
    } = body as SubmittedCredits;

    // Check for existing credits
    const existingCredits = await prisma.balances.findFirst({
      where: {
        year,
        email,
      },
    });

    if (existingCredits) {
      return NextResponse.json(
        { error: "Credits for the current period already exist" },
        { status: 409 } // 409 Conflict is more appropriate for duplicate resources
      );
    }

    // Create new balance record
    const createdBalance = await prisma.balances.create({
      data: {
        name,
        email,
        year,
        annualCredit: annual,
        familyCredit: family,
        healthCredit: health,
        studyCredit: study,
        maternityCredit: maternity,
        paternityCredit: paternity,
        // unpaidCredit: unpaid, // Uncomment if needed
      },
    });

    return NextResponse.json(
      { 
        message: "Successfully created leave credits",
        data: createdBalance 
      },
      { status: 201 } // 201 Created for successful resource creation
    );
  } catch (error) {
    console.error('Error in POST /api/credits:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}