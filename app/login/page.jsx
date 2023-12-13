import React from "react";
import Login from "@/login/components/login";

export const metadata = {
  title: "Login",
  description:
    "When you register an application, Oracle Commerce automatically generates a JSON Web Token called an application key. You send the application key in the authorization header of a POST request, and Oracle Commerce responds with an access token that the application must supply in subsequent requests.",
};

export default function Page() {
  return <Login />;
}
