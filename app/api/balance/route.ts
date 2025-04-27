import { prisma } from '@/lib/prisma'; // Ensure the correct import
import { NextRequest, NextResponse } from "next/server";

type SubmittedCredits = {
  annual: number;
  family: number;
  health: number;
  study: number;
  maternity: number;
  paternity: number;
  unpaid: number;
  email: string;
  year: string;
  name: string;
};

export async function POST(req: NextRequest) {
  try {
    if (!prisma) {
      // Check if prisma is undefined
      return NextResponse.json(
        { error: "Prisma client not initialized" },
        { status: 500 }
      );
    }

    const body: SubmittedCredits = await req.json();

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
    } = body;

    const existingCredits = await prisma.balances.findFirst({
      where: {
        year,
        email,
      },
    });

    if (existingCredits) {
      return NextResponse.json(
        "Credits for the current period already exists",
        { status: 400 }
      );
    }

    await prisma.balances.create({
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
      },
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
