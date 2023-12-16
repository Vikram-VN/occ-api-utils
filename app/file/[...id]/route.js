import { NextResponse } from "next/server";
import axios from "axios";
import filterHeaders from "@/utils/removeHeaders";

export async function GET(request) {
  try {
    const newUrl = request.nextUrl.pathname.concat(request.nextUrl.search);
    const hostId = request.headers.get("x-instanceid");

    let payload = {
      baseURL: `https://${hostId}-admin.occa.ocs.oraclecloud.com`,
      url: newUrl,
      method: "get",
      headers: filterHeaders(request),
      responseType: "arraybuffer",
    };

    const storeApi = await axios.request(payload);
    const newHeaders = new Headers(storeApi.headers);
    newHeaders.delete("content-length");

    return NextResponse.json(
      { content: storeApi.data },
      { status: storeApi.data.statusCode, headers: newHeaders },
    );
  } catch (error) {
    return NextResponse.json(
      error.response?.data || { errorCode: "02", message: `${error.message}.` },
      { status: 400 },
    );
  }
}
