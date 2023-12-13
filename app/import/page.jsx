import React from "react";
import Import from "@/import/components/import";

export const metadata = {
  title: "Import",
  description:
    "In an environment where Oracle Commerce interacts with an external system, you may want to exchange data. Oracle Commerce includes REST web services APIs that allows you to select data items and export or import them in bulk.",
};

export default function Page() {
  return <Import />;
}
