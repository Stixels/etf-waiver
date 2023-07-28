// app/api/waiver/create/route.ts
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

type IRequestData = {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  bookingNumber: string;
  productName: string;
  startTime: string;
  minors: string[];
  source: string;
};

export async function POST(req: NextRequest) {
  const data: IRequestData = await req.json();
  const {
    firstName,
    lastName,
    email,
    dob,
    bookingNumber,
    productName,
    startTime,
    minors,
    source,
  } = data;

  try {
    // check if booking already exists
    const booking = await prisma.booking.findUnique({
      where: {
        id: bookingNumber,
      },
    });

    if (!booking) {
      // create booking
      const newBooking = await prisma.booking.create({
        data: {
          id: bookingNumber,
          productName,
          startTime: new Date(startTime),
        },
      });
    }

    // create waiver
    const newWaiver = await prisma.waiver.create({
      data: {
        firstName,
        lastName,
        email,
        dob: new Date(dob),
        bookingId: bookingNumber,
        minors: JSON.stringify(minors),
        source,
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
