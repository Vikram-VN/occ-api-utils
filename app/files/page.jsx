import React from "react";
import Files from "@/files";

export const metadata = {
  title: "Files",
  description: "Import files to OCC server",
};

export default function page(props) {
  return <Files {...props} />
}
