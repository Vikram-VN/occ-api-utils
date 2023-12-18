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
    };

    if (newUrl.includes(".zip")) {
      payload.responseType = "arraybuffer";
    }

    const agentApi = await axios.request(payload);
    const newHeaders = new Headers(agentApi.headers);
    newHeaders.delete("content-length");

    return NextResponse.json(agentApi.data, {
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
    // Parsing the binary large object as it is into occ server
    const requestBody = await request.arrayBuffer();
    const hostId = request.headers.get("x-instanceid");

    let payload = {
      baseURL: `https://${hostId}-admin.occa.ocs.oraclecloud.com`,
      url: newUrl,
      data: requestBody,
      method: "post",
      headers: filterHeaders(request),
    };

    const agentApi = await axios.request(payload);
    const newHeaders = new Headers(agentApi.headers);
    newHeaders.delete("content-length");

    return NextResponse.json(
      { ...agentApi.data },
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
    const hostId = request.headers.get("x-instanceid");

    let payload = {
      baseURL: `https://${hostId}-admin.occa.ocs.oraclecloud.com`,
      url: newUrl,
      data: requestBody,
      method: "put",
      headers: filterHeaders(request),
    };

    const agentApi = await axios.request(payload);
    const newHeaders = new Headers(agentApi.headers);
    newHeaders.delete("content-length");

    return NextResponse.json(
      { ...agentApi.data },
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
    const hostId = request.headers.get("x-instanceid");

    let payload = {
      baseURL: `https://${hostId}-admin.occa.ocs.oraclecloud.com`,
      url: newUrl,
      data: requestBody,
      method: "delete",
      headers: filterHeaders(request),
    };

    const agentApi = await axios.request(payload);
    const newHeaders = new Headers(agentApi.headers);
    newHeaders.delete("content-length");

    return NextResponse.json(
      { ...agentApi.data },
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
    const hostId = request.headers.get("x-instanceid");

    let payload = {
      baseURL: `https://${hostId}-admin.occa.ocs.oraclecloud.com`,
      url: newUrl,
      data: requestBody,
      method: "patch",
      headers: filterHeaders(request),
    };

    const agentApi = await axios.request(payload);
    const newHeaders = new Headers(agentApi.headers);
    newHeaders.delete("content-length");

    return NextResponse.json(
      { ...agentApi.data },
      { status: 200, headers: newHeaders },
    );
  } catch (error) {
    return NextResponse.json(
      error.response?.data || { errorCode: "02", message: `${error.message}.` },
      { status: 400 },
    );
  }
}
