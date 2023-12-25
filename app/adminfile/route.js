import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse.json({ msg: "Files API is running!" });
}
