import { NextResponse } from 'next/server';

export async function GET() {

  return NextResponse.json({ msg: "NexJS server is running!" });

}

export const dynamic = 'force-static';