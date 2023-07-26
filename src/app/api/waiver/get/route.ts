import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
const waiversPerPage = 10; // number of waivers per page

export async function GET(req: NextRequest) {
  const page = Number(req.nextUrl.searchParams.get("page")) || 1;
  const searchTerm = String(req.nextUrl.searchParams.get("searchTerm")) || "";
  const fromDate = req.nextUrl.searchParams.get("fromDate");
  const toDate = req.nextUrl.searchParams.get("toDate");

  const skip = (page - 1) * waiversPerPage;

  let dateFilter = {};
  if (fromDate && toDate) {
    dateFilter = {
      AND: [
        { timestamp: { gte: new Date(fromDate) } },
        { timestamp: { lte: new Date(toDate) } },
      ],
    };
  }

  try {
    const waivers = await prisma.waiver.findMany({
      skip,
      take: waiversPerPage,
      orderBy: { timestamp: "desc" },
      where: {
        OR: [
          { firstName: { contains: searchTerm } },
          { lastName: { contains: searchTerm } },
          { email: { contains: searchTerm } },
        ],
        ...dateFilter,
      },
      include: {
        Booking: true,
      },
    });

    const totalWaivers = await prisma.waiver.count();

    return new NextResponse(JSON.stringify({ waivers, total: totalWaivers }));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: `There was an error getting the waivers: ${error}`,
      }),
      { status: 400 },
    );
  }
}
