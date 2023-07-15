"use client";
import React, { useContext, useEffect } from "react";
import { StoreContext } from "./store/context";
import { useLoginStatus } from "./store/hooks";
import { usePathname } from "next/navigation";
import ToastProvider from "./components/toast";
import Login from "./login/page";

const OccUtilsApp = (props) => {

  const { action } = useContext(StoreContext);
  const currentPath = usePathname();

  const publicRoutes = ["/", "/login", "/tools", "/docs"];

  // Rendering children"s conditionally
  const isLoggedIn = useLoginStatus();

  // Calling refresh API to get the new access token
  useEffect(() => {
    // Updating the state based on need.
    const stateHandler = (payload, apiResponse) => {
      const result = apiResponse;
      return {
        key: "occRepository",
        value: {
          accessToken: result?.access_token || ""
        }
      }

    }

    if (isLoggedIn) {
      const refresh = setInterval(() => {
        action("adminApiCall", {
          method: "post",
          url: "refresh",
          data: {},
          stateAction: "updateKeyValue",
          stateHandler
        })
      }, (1 * 60 * 1000));
      return () => clearInterval(refresh);
    }

  }, [action, isLoggedIn]);


  const component = (isLoggedIn || publicRoutes.includes(currentPath)) ? props.children : <Login />;

  return (
    <ToastProvider>
      {component}
    </ToastProvider>
  )
}

export default OccUtilsApp;
