import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request) {
  try {
    const newUrl = request.nextUrl.pathname.concat(request.nextUrl.search);
    const hostId = request.headers.get("x-instanceid");

    let payload = {
      baseURL: `https://${hostId}-admin.occa.ocs.oraclecloud.com`,
      url: newUrl,
      method: "get",
      headers: request.headers,
      responseType: "arraybuffer",
    };

    if (newUrl.includes(".zip")) {
      payload.responseType = "arraybuffer";
    }

    const adminXApi = await axios.request(payload);
    const newHeaders = new Headers(adminXApi.headers);
    newHeaders.delete("content-length");

    return NextResponse.json(adminXApi.data, {
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
      headers: request.headers,
    };

    const adminXApi = await axios.request(payload);
    const newHeaders = new Headers(adminXApi.headers);
    newHeaders.delete("content-length");

    return NextResponse.json(
      { ...adminXApi.data },
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
      headers: request.headers,
    };

    const adminXApi = await axios.request(payload);
    const newHeaders = new Headers(adminXApi.headers);
    newHeaders.delete("content-length");

    return NextResponse.json(
      { ...adminXApi.data },
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
      headers: request.headers,
    };

    const adminXApi = await axios.request(payload);
    const newHeaders = new Headers(adminXApi.headers);
    newHeaders.delete("content-length");

    return NextResponse.json(
      { ...adminXApi.data },
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
      headers: request.headers,
    };

    const adminXApi = await axios.request(payload);
    const newHeaders = new Headers(adminXApi.headers);
    newHeaders.delete("content-length");

    return NextResponse.json(
      { ...adminXApi.data },
      { status: 200, headers: newHeaders },
    );
  } catch (error) {
    return NextResponse.json(
      error.response?.data || { errorCode: "02", message: `${error.message}.` },
      { status: 400 },
    );
  }
}
