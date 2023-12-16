/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef, useContext } from "react";
import Link from "next/link";
import { StoreContext } from "@/store/context";
import { useLoginStatus, useToasts } from "@/store/hooks";
import { useRouter, usePathname } from "next/navigation";
import {
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";
import AppLogo from "@/components/logo";
import Modal from "@/components/modal";
import Login from "@/login/components/login";
import "@/components/header/styles.css";

const Header = ({ children }) => {
  const loginModalRef = useRef();
  const toast = useToasts();

  const { action } = useContext(StoreContext);
  const router = useRouter();

  const loginPath = usePathname().includes("login");
  const isLoggedIn = useLoginStatus();

  // Used to show notifications
  const onSuccess = () => {
    toast.show({
      status: "success",
      message: "You are successfully logged out..",
    });

    const redirect = setTimeout(() => {
      router.push("/");
    }, 2000);

    return () => clearTimeout(redirect);
  };

  // Used to show notifications
  const onError = (error) => {
    toast.show({
      status: "failure",
      message: error.message || "Logout Failed",
    });
  };

  const logout = () => {
    // Doing login
    action("adminApiCall", {
      method: "post",
      url: "logout",
      showNotification: true,
      onError,
      onSuccess,
    });
    action("stateUpdate", { stateAction: "clearState" });
  };

  // Changing header text for user
  const userIcon = isLoggedIn ? (
    <ArrowRightOnRectangleIcon title="Log out" width={30} height={30} />
  ) : (
    <ArrowLeftOnRectangleIcon title="Log in" width={30} height={30} />
  );
  const userAction = isLoggedIn ? "user-logout" : "user-login";

  return (
    <header className="w-full sticky top-0 flex-none h-24 mx-auto  border-b dark:border-b-slate-600 bg-slate-100 dark:bg-slate-900 z-50">
      <nav className="h-full bg-slate-100 border-slate-200 px-4 lg:px-6 py-2.5 dark:bg-slate-900 relative ">
        <div className="flex h-full flex-wrap justify-between items-center">
          <div className="CAU__FlexBox">
            <Link href="/" className="flex items-center dark:text-white">
              <AppLogo className="mr-4 text-black dark:text-white" />
            </Link>
            <h1 className="text-3xl font-semibold whitespace-nowrap text-slate-900 dark:text-white CAU__HeaderText">
              Commerce API Utils
            </h1>
          </div>
          <div className="flex items-center lg:order-2">
            {children}
            <label
              htmlFor={userAction}
              className="text-slate-600 cursor-pointer dark:text-slate-400 hover:bg-slate-50 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm px-4 lg:px-2.5 py-2 lg:py-2.5 mr-2 dark:hover:bg-slate-700 focus:outline-none dark:focus:ring-slate-800"
            >
              {userIcon}
            </label>
          </div>
        </div>
      </nav>
      <input
        name="logout-modal"
        type="text"
        id="user-logout"
        className="hidden"
        onClick={logout}
      />
      {!loginPath && !isLoggedIn && (
        <Modal title={"OCC API Login"} loginModalRef={loginModalRef}>
          <Login loginModalRef={loginModalRef} />
        </Modal>
      )}
    </header>
  );
};

export default Header;
