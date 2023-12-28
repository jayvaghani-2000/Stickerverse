import { NextResponse } from "next/server";
import prisma from "../../../../prisma";

export async function GET() {
  const currentDate = new Date();
  const thresholdDate = new Date(currentDate);
  thresholdDate.setDate(currentDate.getDate() - 2);

  try {
    await prisma.visitorCart.deleteMany({
      where: {
        createdAt: {
          lt: thresholdDate.toISOString(),
        },
      },
    });
    return NextResponse.json({ success: true, status: 200 });
  } catch (err) {
    return NextResponse.error({ message: "something went wrong", status: 500 });
  }
}
