import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: " \n Recommendation endpoint working" });
}

export async function POST(request: Request) {
  const body = await request.json();

  // TODO: Add your recommendation logic here

  return NextResponse.json({ received: body });
}
