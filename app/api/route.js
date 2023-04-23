import { NextRequest, NextResponse as res } from 'next/server';
import axios from 'axios';

export async function POST(req = NextRequest) {
  try {
    const request = await req.json();
    const { id, url, params, data, method, accessToken } = request;
    let payload = {
      baseURL: `https://${id}-admin.occa.ocs.oraclecloud.com`,
      url,
      data,
      params,
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    }
    for (const [key, value] of Object.entries(payload)) {
      if (!value) {
        delete payload[key];
      }
    }
    const httpCall = await axios.request(payload);
    return res.json(httpCall.body);

  } catch (error) {
    return res.json(error.response?.data || { errorCode: "00002000", message: `${error.message}. Please make sure the payload is valid JSON.`, status: 415, })
  }

}
