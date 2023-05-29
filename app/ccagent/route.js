import { NextResponse } from "next/server";

export async function GET() {

  return NextResponse.json({ msg: "OCC agent server is running!" });

}
