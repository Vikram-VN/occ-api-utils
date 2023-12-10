"use client";
import React, { useCallback, useContext } from "react";
import { useLoginStatus } from "@/store/hooks";
import { useRouter, usePathname } from "next/navigation";
import { useToasts } from "@/store/hooks";
import { StoreContext } from "@/store/context";
import { formToJson } from "@/utils";
import { TextInput, Button, Label, Checkbox } from "flowbite-react";
import { KeyIcon, WindowIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export default function Login(props) {
  const { action } = useContext(StoreContext);

  const toast = useToasts();
  const router = useRouter();

  const isLoggedIn = useLoginStatus();
  const pagePath = usePathname();

  // Avoiding the unnecessary redirect for other routes
  isLoggedIn && pagePath.includes("login") && router.push("/");

  // Used to show notifications
  const onSuccess = (res) => {
    toast.show({
      status: "success",
      message: "You are successfully logged in..",
    });
    const redirect = setTimeout(() => {
      pagePath.includes("login") && router.push("/");
      props.loginModalRef?.current();
    }, 2000);
    return () => clearTimeout(redirect);
  };

  // Used to show notifications
  const onError = (error) => {
    toast.show({
      status: "failure",
      message: error.message || "Login Failed",
    });
  };

  // Updating the state based on need.
  const stateHandler = useCallback((payload, apiResponse) => {
    const result = apiResponse;
    if (result.access_token) {
      return {
        key: "occRepository",
        value: {
          accessToken: result.access_token,
        },
      };
    }
  }, []);

  const updateStore = useCallback((payload) => {
    if (payload.instanceId) {
      return {
        key: "occRepository",
        value: {
          instanceId: payload.instanceId,
          appKey: payload.accessToken,
        },
      };
    }
  }, []);

  const submitForm = (event, customCall = false) => {
    let payload;
    if (!customCall) {
      event.preventDefault();
      const formData = event.target;
      payload = formToJson(formData);
    } else {
      payload = event;
    }

    // Adding instance and token fields to redux store
    action("stateUpdate", { stateHandler: updateStore, data: payload });

    // Doing login
    action("adminApiCall", {
      method: "post",
      url: "login",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "x-remember": payload.rememberMe  || 'off',
      },
      data: "grant_type=client_credentials",
      showNotification: true,
      onError,
      onSuccess,
      stateHandler,
      stateAction: "updateKeyValue",
    });
  };
  return (
    <div id="login-form">
      <form onSubmit={submitForm} className="block">
        <section className="m-auto my-6 lg:flex bg-slate-100 dark:bg-slate-800 p-10 rounded-md gap-10 lg">
          <div className="w-full flex m-auto mb-4 lg:mb-0">
            <Image
              src="/media/loginBanner.png"
              className="rounded w-full"
              alt="occ banner"
              width={50}
              height={50}
            />
          </div>
          <div className="w-full m-auto">
            <div className="mb-2 block">
              <Label htmlFor="instanceId" value="Instance Id" />
            </div>
            <TextInput
              type="text"
              id="instanceId"
              className="mb-2"
              name="instanceId"
              required
              placeholder="Ex: p1234567890dev"
              icon={WindowIcon}
            />
            <div className="mb-2 block mt-4">
              <Label htmlFor="token" value="App Key" />
            </div>
            <TextInput
              type="text"
              id="token"
              className="block"
              name="accessToken"
              required
              autoComplete="off"
              placeholder="Ex: eyJ2ZXJzaW9uIjowLCJ1cmkiOiJjbGllbnRBcHBsaWNhdGlvbnMvbXRtLXN0b3JlZnJvbnQvcGFnZS9sb2dpbi8iLCJoYXNoIjoiOEdnY2tBPT0ifQ=="
              icon={KeyIcon}
            />
            <div className="mt-6 flex items-center gap-2 justify-end">
              <Checkbox id="rememberMe" name="rememberMe" />
              <Label className="flex" htmlFor="rememberMe">
                <p>Remember Me</p>
              </Label>
            </div>
            <Button
              className="m-auto mt-10 w-2/6"
              value="sign-in"
              type="submit"
            >
              Sign in
            </Button>
          </div>
        </section>
      </form>
    </div>
  );
}
