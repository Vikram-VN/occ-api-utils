import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse.json({ msg: "OCC admin server is running!" });
}
