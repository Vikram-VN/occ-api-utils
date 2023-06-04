"use client";
import React from "react";
import Excel2Json from "./excel2json";

export default function Tools(props) {
  return (
    <React.Fragment>
      <h1 className="text-2xl mb-4">Convert Excel to Json</h1>
      <Excel2Json />
      <h1 className="text-2xl mt-10 mb-4">Convert Json to Excel</h1>
      <Excel2Json />
    </React.Fragment>
  )
}
