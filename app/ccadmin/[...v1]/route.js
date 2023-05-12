import { NextResponse } from 'next/server';
import axios from 'axios';


export async function GET() {
  return NextResponse.json({ msg: "NexJS server is running!" });
}

export async function POST(req) {
  try {
    const pathName = req.nextUrl.pathname;
    const request = await req.json();
    const { instanceId, data, method = 'post', accessToken, contentType } = request;
    const accessTokenFromCookie = req.cookies.get('apexAccessToken');
    const instanceIdFromCookie = req.cookies.get('apexInstanceId');
    let payload = {
      baseURL: `https://${instanceIdFromCookie || instanceId}-admin.occa.ocs.oraclecloud.com`,
      url: pathName,
      data,
      method,
      headers: {
        Authorization: `Bearer ${accessTokenFromCookie || accessToken}`,
        "Content-Type": contentType || (pathName.includes("login")
          ? "application/x-www-form-urlencoded" :
          "application/json")
      }
    }

    // Removing the keys those values are empty in the request body.
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
    return NextResponse.json(error.response?.data || { errorCode: "00002000", message: `${error.message}.` }, { status: error.response?.status })
  }

}

export const dynamic = 'force-static';