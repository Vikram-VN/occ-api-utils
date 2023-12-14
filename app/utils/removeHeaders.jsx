
// List of headers to be removed from the request
const blocklistHeaders = [
    // Common headers to be removed
    "accept",
    "cookie",
    "host",
    "postman-token",
    "cache-control",
    "connection",
    "accept-language",
    "x-forwarded-for",
    "x-forwarded-host",
    "origin",
    "x-forwarded-port",
    "x-forwarded-proto",
    "referrer",
    "x-invoke-path",
    "transfer-encoding",
    "x-invoke-query",
    "x-middleware-invoke",
];

const filterHeaders = request => {
    const headers = new Headers(request.headers);

    // Remove specified headers from the request
    blocklistHeaders.forEach((key) => {
        headers.delete(key);
    });

    const newHeaders = {};
    for (const [key, value] of headers.entries()) {
        newHeaders[key] = value;
    }

    return newHeaders;
}

export default filterHeaders;