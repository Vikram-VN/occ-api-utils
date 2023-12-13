import { NextResponse } from "next/server";
import axios from "axios";
import { clearSession } from "@/lib/session";

export async function GET(request) {
  try {
    const newUrl = request.nextUrl.pathname.concat(request.nextUrl.search);
    const hostId = request.headers.get("X-InstanceId");

    let payload = {
      baseURL: `https://${hostId}-admin.occa.ocs.oraclecloud.com`,
      url: newUrl,
      method: "get",
      headers: request.headers,
      responseType: "arraybuffer",
    };

    const storeApi = await axios.request(payload);
    const newHeaders = new Headers(storeApi.headers);
    newHeaders.delete("content-length");

    if (storeApi?.data?.status === "401") clearSession();

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
