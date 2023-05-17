import { NextResponse } from 'next/server';
import axios from 'axios';

const blocklistHeaders = [
  'accept', 'cookie', 'host', 'postman-token',
  'cache-control', 'connection', 'accept-language',
  'x-forwarded-for', 'x-forwarded-host', 'origin',
  'x-forwarded-port', 'x-forwarded-proto', 'referrer',
  'x-instanceid', 'x-invoke-path', 'transfer-encoding',
  'x-invoke-query', 'x-middleware-invoke'
];

export async function GET(request) {
  try {

    const newUrl = request.nextUrl.pathname.concat(request.nextUrl.search);
    const hostId = request.headers.get('X-InstanceId');

    let payload = {
      baseURL: `https://${hostId}-admin.occa.ocs.oraclecloud.com`,
      url: newUrl,
      method: 'get',
      headers: {
        ...request.headers,
      }
    }

    const httpCall = await axios.request(payload);
    const newHeaders = new Headers(httpCall.headers);
    newHeaders.delete('content-length');

    return NextResponse.json({ ...httpCall.data }, { status: httpCall.data.statusCode, headers: newHeaders });

  } catch (error) {
    return NextResponse.json(error.response?.data || { errorCode: '01', message: `${error.message}.` }, { status: error.response?.status })
  }

}


export async function POST(request) {
  try {

    const newUrl = request.nextUrl.pathname.concat(request.nextUrl.search);
    const requestBody = await request.arrayBuffer();
    const hostId = request.headers.get('X-InstanceId');

    const modifiedHeaders = {};
    request.headers.forEach((value, key) => {
      if (!blocklistHeaders.includes(key)) {
        modifiedHeaders[key] = value;
      }
    })

    let payload = {
      baseURL: `https://${hostId}-admin.occa.ocs.oraclecloud.com`,
      url: newUrl,
      data: requestBody,
      method: 'post',
      headers: modifiedHeaders,
    }

    const httpCall = await axios.request(payload);
    const newHeaders = new Headers(httpCall.headers);
    newHeaders.delete('content-length');

    return NextResponse.json({ ...httpCall.data }, { status: httpCall.data.statusCode, headers: newHeaders });

  } catch (error) {
    return NextResponse.json(error.response?.data || { errorCode: '02', message: `${error.message}.` }, { status: error.response?.status })
  }

}


export async function PUT(request) {
  try {

    const newUrl = request.nextUrl.pathname.concat(request.nextUrl.search);
    const requestBody = await request.arrayBuffer();
    const hostId = request.headers.get('X-InstanceId');

    const modifiedHeaders = {};
    request.headers.forEach((value, key) => {
      if (!blocklistHeaders.includes(key)) {
        modifiedHeaders[key] = value;
      }
    })

    let payload = {
      baseURL: `https://${hostId}-admin.occa.ocs.oraclecloud.com`,
      url: newUrl,
      data: requestBody,
      method: 'post',
      headers: modifiedHeaders,
    }

    const httpCall = await axios.request(payload);
    const newHeaders = new Headers(httpCall.headers);
    newHeaders.delete('content-length');

    return NextResponse.json({ ...httpCall.data }, { status: httpCall.data.statusCode, headers: newHeaders });

  } catch (error) {
    return NextResponse.json(error.response?.data || { errorCode: '03', message: `${error.message}.` }, { status: error.response?.status })
  }

}


export async function DELETE(request) {
  try {

    const newUrl = request.nextUrl.pathname.concat(request.nextUrl.search);
    const requestBody = await request.arrayBuffer();
    const hostId = request.headers.get('X-InstanceId');

    const modifiedHeaders = {};
    request.headers.forEach((value, key) => {
      if (!blocklistHeaders.includes(key)) {
        modifiedHeaders[key] = value;
      }
    })

    let payload = {
      baseURL: `https://${hostId}-admin.occa.ocs.oraclecloud.com`,
      url: newUrl,
      data: requestBody,
      method: 'post',
      headers: modifiedHeaders,
    }

    const httpCall = await axios.request(payload);
    const newHeaders = new Headers(httpCall.headers);
    newHeaders.delete('content-length');

    return NextResponse.json({ ...httpCall.data }, { status: httpCall.data.statusCode, headers: newHeaders });

  } catch (error) {
    return NextResponse.json(error.response?.data || { errorCode: '04', message: `${error.message}.` }, { status: error.response?.status })
  }

}


export async function PATCH(request) {
  try {

    const newUrl = request.nextUrl.pathname.concat(request.nextUrl.search);
    const requestBody = await request.arrayBuffer();
    const hostId = request.headers.get('X-InstanceId');

    const modifiedHeaders = {};
    request.headers.forEach((value, key) => {
      if (!blocklistHeaders.includes(key)) {
        modifiedHeaders[key] = value;
      }
    })

    let payload = {
      baseURL: `https://${hostId}-admin.occa.ocs.oraclecloud.com`,
      url: newUrl,
      data: requestBody,
      method: 'post',
      headers: modifiedHeaders,
    }

    const httpCall = await axios.request(payload);
    const newHeaders = new Headers(httpCall.headers);
    newHeaders.delete('content-length');

    return NextResponse.json({ ...httpCall.data }, { status: httpCall.data.statusCode, headers: newHeaders });

  } catch (error) {
    return NextResponse.json(error.response?.data || { errorCode: '05', message: `${error.message}.` }, { status: error.response?.status })
  }

}
