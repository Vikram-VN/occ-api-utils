"use client";
import { Spinner } from "flowbite-react";
import React from "react";

const PageLoader = ({ isLoading = true, message = "Please wait..." }) => {
    return (isLoading &&
        <div className="text-center absolute z-10 grid w-full h-full content-center bg-slate-200 dark:bg-slate-900">
            <Spinner
                aria-label="Page Loader"
                size="xl"
                className="block"
            />
            <p>{message}</p>
        </div>
    )
}

export default PageLoader;