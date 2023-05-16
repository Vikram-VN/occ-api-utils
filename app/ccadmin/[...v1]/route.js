import { NextResponse } from 'next/server';
import axios from 'axios';


export async function GET() {
  return NextResponse.json({ msg: 'NexJS server is running!' });
}

export async function POST(request) {
  try {
    const pathName = request.nextUrl.pathname;
    const requestBody = await request.json();
    const { instanceId, data, method = 'post', accessToken, contentType } = requestBody;
    
    const requestHeaders = new Headers(request.headers);
    const accessTokenFromHeader = requestHeaders.get('apexit-access-token');
    const instanceIdFromHeader = requestHeaders.get('apexit-instance-id');

    const hostId = instanceIdFromHeader || instanceId;
    const auth = accessTokenFromHeader || accessToken;

    let payload = {
      baseURL: `https://${hostId}-admin.occa.ocs.oraclecloud.com`,
      url: pathName,
      data,
      method,
      headers: {
        Authorization: `Bearer ${auth}`,
        'Content-Type': contentType || (pathName.includes('login')
          ? 'application/x-www-form-urlencoded' :
          'application/json')
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
    newHeaders.delete('content-length');

    return NextResponse.json({ ...httpCall.data }, { status: httpCall.data.statusCode, headers: newHeaders });

  } catch (error) {
    return NextResponse.json(error.response?.data || { errorCode: '00002000', message: `${error.message}.` }, { status: error.response?.status })
  }

}

export const dynamic = 'force-static';