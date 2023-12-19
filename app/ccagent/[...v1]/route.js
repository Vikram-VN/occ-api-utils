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
      responseType: "stream",
      headers: filterHeaders(request),
    };

    const agentApi = await axios.request(payload);
    const newHeaders = new Headers(agentApi.headers);
    newHeaders.delete("content-length");

    return new NextResponse(agentApi.data, {
      status: 200,
      headers: newHeaders,
    });
  } catch (error) {
    // TODO: This needs to be fixed. Currently giving [object object]
    return new NextResponse(
      error.response?.data || {
        errorCode: "02",
        message: `${error.message}.`,
      },
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
      responseType: "stream",
      headers: filterHeaders(request),
    };

    const agentApi = await axios.request(payload);
    const newHeaders = new Headers(agentApi.headers);
    newHeaders.delete("content-length");

    return new NextResponse(agentApi.data, {
      status: 200,
      headers: newHeaders,
    });
  } catch (error) {
    // TODO: This needs to be fixed. Currently giving [object object]
    return new NextResponse(
      error.response?.data || {
        errorCode: "02",
        message: `${error.message}.`,
      },
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
      responseType: "stream",
      headers: filterHeaders(request),
    };

    const agentApi = await axios.request(payload);
    const newHeaders = new Headers(agentApi.headers);
    newHeaders.delete("content-length");

    return new NextResponse(agentApi.data, {
      status: 200,
      headers: newHeaders,
    });
  } catch (error) {
    // TODO: This needs to be fixed. Currently giving [object object]
    return new NextResponse(
      error.response?.data || {
        errorCode: "02",
        message: `${error.message}.`,
      },
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
      responseType: "stream",
      headers: filterHeaders(request),
    };

    const agentApi = await axios.request(payload);
    const newHeaders = new Headers(agentApi.headers);
    newHeaders.delete("content-length");

    return new NextResponse(agentApi.data, {
      status: 200,
      headers: newHeaders,
    });
  } catch (error) {
    // TODO: This needs to be fixed. Currently giving [object object]
    return new NextResponse(
      error.response?.data || {
        errorCode: "02",
        message: `${error.message}.`,
      },
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
      responseType: "stream",
      headers: filterHeaders(request),
    };

    const agentApi = await axios.request(payload);
    const newHeaders = new Headers(agentApi.headers);
    newHeaders.delete("content-length");

    return new NextResponse(agentApi.data, {
      status: 200,
      headers: newHeaders,
    });
  } catch (error) {
    // TODO: This needs to be fixed. Currently giving [object object]
    return new NextResponse(
      error.response?.data || {
        errorCode: "02",
        message: `${error.message}.`,
      },
      { status: 400 },
    );
  }
}
