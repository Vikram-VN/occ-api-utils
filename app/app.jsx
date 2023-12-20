"use client";
import React, { useCallback, useContext, useEffect } from "react";
import { StoreContext } from "@/store/context";
import { useLoginStatus } from "@/store/hooks";
import { usePathname } from "next/navigation";
import ToastProvider from "@/components/toast";
import Login from "@/login/components/login";
import { setCookie } from "cookies-next";

const OCCUtilsApp = (props) => {
  const { action } = useContext(StoreContext);
  const currentPath = usePathname();

  const publicRoutes = ["/", "/login", "/tools", "/docs"];

  // Rendering children"s conditionally
  const isLoggedIn = useLoginStatus();

  const stateHandler = useCallback((payload, apiResponse) => {
    const result = apiResponse;
    if (result.access_token) {
      setCookie("x-authorization", result.access_token);
      return {
        key: "occRepository",
        value: {
          accessToken: result?.access_token,
        },
      };
    } else {
      return {
        key: "occRepository",
        value: {
          accessToken: "",
          isLoggedIn: false,
        },
      };
    }
  }, []);

  // Calling refresh API to get the new access token
  useEffect(() => {
    // Updating the state based on need.
    if (isLoggedIn) {
      const refresh = setInterval(
        () => {
          action("adminApiCall", {
            method: "post",
            url: "refresh",
            data: {},
            stateAction: "updateKeyValue",
            stateHandler,
          });
        },
        2.5 * 60 * 1000,
      );
      return () => clearInterval(refresh);
    }
  }, [action, isLoggedIn, stateHandler]);

  const component =
    isLoggedIn || publicRoutes.includes(currentPath) ? (
      props.children
    ) : (
      <Login />
    );

  return <ToastProvider>{component}</ToastProvider>;
};

export default OCCUtilsApp;
