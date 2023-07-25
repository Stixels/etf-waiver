// pages/api/waivers.ts
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

type IRequestData = {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  groupId: string;
};

export async function POST(req: NextRequest) {
  const data: IRequestData = await req.json();
  const { firstName, lastName, email, dob, groupId } = data;

  try {
    const newWaiver = await prisma.waiver.create({
      data: {
        firstName,
        lastName,
        email,
        dob: new Date(dob),
        groupId,
      },
    });

    return new NextResponse(JSON.stringify(newWaiver), { status: 201 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: `There was an error creating the waiver: ${error}`,
      }),
      { status: 400 },
    );
  }
}
