"use client";
import { Spinner } from "flowbite-react";
import React from "react";

const PageLoader = () => {
  return (
    <div className="text-center absolute z-10 grid w-full h-full content-center bg-slate-200 dark:bg-slate-900">
      <div className="text-center">
        <Spinner aria-label="Page Loader" size="xl" className="block" />
        <p>Please wait...</p>
      </div>
    </div>
  );
};

export default PageLoader;
