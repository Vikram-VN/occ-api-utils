import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  try {
    const request = await req.json();
    const { instanceId, url, params, data, method, accessToken, contentType } = request;
    const accessTokenFromCookie = req.cookies.get('apexAccessToken');
    const instanceIdFromCookie = req.cookies.get('apexInstanceId');
    let payload = {
      baseURL: `https://${instanceIdFromCookie || instanceId}-admin.occa.ocs.oraclecloud.com`,
      url,
      data,
      params,
      method,
      headers: {
        Authorization: `Bearer ${accessTokenFromCookie || accessToken}`,
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
    // Setting accessToken as a cookie for easy access
    httpCall.data?.access_token && newHeaders.set('set-cookie', `apexAccessToken=${httpCall.data.access_token};path=/;expires=${httpCall.data.expires_in * 10};`);
   // Instance id also saving in cookies
    httpCall.data?.access_token && newHeaders.append('set-cookie', `apexInstanceId=${instanceId};path=/;expires=${httpCall.data.expires_in * 1000};`);
    newHeaders.delete('content-length');
    return NextResponse.json({ ...httpCall.data }, { status: httpCall.data.statusCode, headers: newHeaders });

  } catch (error) {
    return NextResponse.json(error.response?.data || { errorCode: "00002000", message: `${error.message}. Please make sure the payload is valid JSON.` }, { status: httpCall.data.statusCode })
  }

}


export async function GET() {

  return NextResponse.json({ msg: "NexJS server is running!" });

}

export const dynamic = 'force-static';