import { cookies } from "next/headers";

const targetTimeZone = "Asia/Kolkata"; // Replace with your desired timezone

// Create an Intl.DateTimeFormat object with the desired timezone
const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: targetTimeZone,
  hour12: false, // Optional: Use 24-hour time format
});

export const sessionValidation = async (request, response) => {
  const { headers } = request;
  const {
    data: { access_token: accessToken },
  } = response;

  const instanceId = headers.get("x-instanceid");
  let expiryDate = 24 * 60 * 60 * 1000;

  const calculateExpiryTime = () => {
    const currentDate = new Date();
    const timezoneOffset = currentDate.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
    return new Date(currentDate.getTime() + timezoneOffset + expiryDate);
  };

  // Set Authorization cookie
  cookies().set({
    name: "Authorization",
    value: accessToken,
    sameSite: "strict",
    secure: true,
    path: "/",
    expires: calculateExpiryTime(),
  });

  // Set X-instanceId cookie
  cookies().set({
    name: "X-instanceId",
    value: instanceId,
    sameSite: "strict",
    secure: true,
    path: "/",
    expires: calculateExpiryTime(),
  });
};

export const clearSession = () => {
  // Set Authorization cookie
  cookies().set({
    name: "Authorization",
    value: "",
    sameSite: "strict",
    secure: true,
    path: "/",
    expires: -1, // Expires immediately
  });

  // Set X-instanceId cookie
  cookies().set({
    name: "X-instanceId",
    value: "",
    sameSite: "strict",
    secure: true,
    path: "/",
    expires: -1, // Expires immediately
  });
};
