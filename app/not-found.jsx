'use client'; // Error components must be Client components
import Link from "next/link";
import React from "react";
import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="text-center grid items-center m-auto ">
      <section>
        <h1 className="mb-2 text-4xl">Something went wrong!</h1>
        <Link href="/" >
          <button className="bg-cyan-600 p-2 rounded-full">
            Go to Home
          </button>
        </Link>
      </section>
    </div>
  );
}
