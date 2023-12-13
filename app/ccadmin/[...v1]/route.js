import { NextResponse } from "next/server";
import axios from "axios";
import { clearSession, sessionValidation } from "@/lib/session";

export async function GET(request) {
  try {
    const newUrl = request.nextUrl.pathname.concat(request.nextUrl.search);
    const hostId = request.headers.get("X-InstanceId");

    let payload = {
      baseURL: `https://${hostId}-admin.occa.ocs.oraclecloud.com`,
      url: newUrl,
      method: "get",
      headers: request.headers,
    };

    if (newUrl.includes(".zip")) {
      payload.responseType = "arraybuffer";
    }

    const adminApi = await axios.request(payload);
    const newHeaders = new Headers(adminApi.headers);
    newHeaders.delete("content-length");

    if (adminApi?.data?.status === "401") clearSession();

    return NextResponse.json(adminApi.data, {
      status: 200,
      headers: newHeaders,
    });
  } catch (error) {
    return NextResponse.json(
      error.response?.data || { errorCode: "02", message: `${error.message}.` },
      { status: 400 },
    );
  }
}

export async function POST(request) {
  try {
    const newUrl = request.nextUrl.pathname.concat(request.nextUrl.search);
    // On login method, verifying the session
    // Parsing the binary large object as it is into occ server
    const requestBody = await request.arrayBuffer();
    const hostId = request.headers.get("X-InstanceId");

    let payload = {
      baseURL: `https://${hostId}-admin.occa.ocs.oraclecloud.com`,
      url: newUrl,
      data: requestBody,
      method: "post",
      headers: request.headers,
    };

    const adminApi = await axios.request(payload);
    const newHeaders = new Headers(adminApi.headers);
    newHeaders.delete("content-length");

    if (newUrl.includes("login")) sessionValidation(request, adminApi);
    if (adminApi?.data?.status === "401" || newUrl.includes("logout"))
      clearSession();

    return NextResponse.json(
      { ...adminApi.data },
      { status: 200, headers: newHeaders },
    );
  } catch (error) {
    return NextResponse.json(
      error.response?.data || { errorCode: "02", message: `${error.message}.` },
      { status: 400 },
    );
  }
}

export async function PUT(request) {
  try {
    const newUrl = request.nextUrl.pathname.concat(request.nextUrl.search);
    const requestBody = await request.arrayBuffer();
    const hostId = request.headers.get("X-InstanceId");

    let payload = {
      baseURL: `https://${hostId}-admin.occa.ocs.oraclecloud.com`,
      url: newUrl,
      data: requestBody,
      method: "put",
      headers: request.headers,
    };

    const adminApi = await axios.request(payload);
    const newHeaders = new Headers(adminApi.headers);
    newHeaders.delete("content-length");

    if (adminApi?.data?.status === "401") clearSession();

    return NextResponse.json(
      { ...adminApi.data },
      { status: 200, headers: newHeaders },
    );
  } catch (error) {
    return NextResponse.json(
      error.response?.data || { errorCode: "02", message: `${error.message}.` },
      { status: 400 },
    );
  }
}

export async function DELETE(request) {
  try {
    const newUrl = request.nextUrl.pathname.concat(request.nextUrl.search);
    const requestBody = await request.arrayBuffer();
    const hostId = request.headers.get("X-InstanceId");

    let payload = {
      baseURL: `https://${hostId}-admin.occa.ocs.oraclecloud.com`,
      url: newUrl,
      data: requestBody,
      method: "delete",
      headers: request.headers,
    };

    const adminApi = await axios.request(payload);
    const newHeaders = new Headers(adminApi.headers);
    newHeaders.delete("content-length");

    if (adminApi?.data?.status === "401") clearSession();

    return NextResponse.json(
      { ...adminApi.data },
      { status: 200, headers: newHeaders },
    );
  } catch (error) {
    return NextResponse.json(
      error.response?.data || { errorCode: "02", message: `${error.message}.` },
      { status: 400 },
    );
  }
}

export async function PATCH(request) {
  try {
    const newUrl = request.nextUrl.pathname.concat(request.nextUrl.search);
    const requestBody = await request.arrayBuffer();
    const hostId = request.headers.get("X-InstanceId");

    let payload = {
      baseURL: `https://${hostId}-admin.occa.ocs.oraclecloud.com`,
      url: newUrl,
      data: requestBody,
      method: "patch",
      headers: request.headers,
    };

    const adminApi = await axios.request(payload);
    const newHeaders = new Headers(adminApi.headers);
    newHeaders.delete("content-length");

    if (adminApi?.data?.status === "401") clearSession();

    return NextResponse.json(
      { ...adminApi.data },
      { status: 200, headers: newHeaders },
    );
  } catch (error) {
    return NextResponse.json(
      error.response?.data || { errorCode: "02", message: `${error.message}.` },
      { status: 400 },
    );
  }
}
