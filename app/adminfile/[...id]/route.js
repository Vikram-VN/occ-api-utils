import { NextResponse } from "next/server";
import axios from "axios";
import filterHeaders from "@/utils/removeHeaders";
import { Readable } from "stream";

export async function GET(request) {
  try {
    const newUrl = request.nextUrl.pathname.concat(request.nextUrl.search);
    const hostId = request.headers.get("x-instanceid");

    let payload = {
      baseURL: `https://${hostId}-admin.occa.ocs.oraclecloud.com`,
      url: newUrl,
      method: "get",
      responseType: "stream",
      headers: filterHeaders(request),
    };

    const adminApi = await axios.request(payload);
    const newHeaders = new Headers(adminApi.headers);
    newHeaders.delete("content-length");

    return new NextResponse(adminApi.data, {
      status: adminApi.data.statusCode,
      headers: newHeaders,
    });
  } catch (error) {
    const response = JSON.stringify(
      error.response?.data || {
        errorCode: "02",
        message: `${error.message}.`,
      },
    );

    return new NextResponse(response, {
      status: 400,
      headers: {
        "content-type": "application/json",
      },
    });
  }
}
