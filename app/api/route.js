import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req = NextRequest) {
  try {
    const request = await req.json();
    const { instanceId, url, params, data, method, accessToken, contentType } = request;
    let payload = {
      baseURL: `https://${instanceId}-admin.occa.ocs.oraclecloud.com`,
      url,
      data,
      params,
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": contentType || "application/json"
      }
    }
    for (const [key, value] of Object.entries(payload)) {
      if (!value) {
        delete payload[key];
      }
    }
    const httpCall = await axios.request(payload);
    const newHeaders = new Headers(httpCall.headers);
    return NextResponse.json({ ...httpCall.data }, { status: 200, headers: newHeaders });

  } catch (error) {
    return NextResponse.json(error.response?.data || { errorCode: "00002000", message: `${error.message}. Please make sure the payload is valid JSON.` }, { status: 415 })
  }

}


export async function GET() {

  return NextResponse.json({ msg: "NexJS server is running!" });

}

export const dynamic = 'force-static';