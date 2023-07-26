import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { bookingNumber: string } },
) {
  const url = `https://api.bookeo.com/v2/bookings/${context.params.bookingNumber}?secretKey=${process.env.BOOKEO_SECRET_KEY}&apiKey=${process.env.BOOKEO_API_KEY}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: `There was an error getting the booking: ${error}`,
      }),
      { status: 400 },
    );
  }
}
