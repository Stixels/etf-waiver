// pages/api/groups.ts
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");

  // start and end time for testing:
  const startTime = `2023-05-27T01:00:00-05:00`;
  const endTime = `2023-05-27T23:59:59-05:00`;

  const url = `https://api.bookeo.com/v2/bookings?secretKey=${process.env.BOOKEO_SECRET_KEY}&apiKey=${process.env.BOOKEO_API_KEY}&startTime=${startTime}&endTime=${endTime}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: `There was an error getting the groups: ${error}`,
      }),
      { status: 400 },
    );
  }
}
