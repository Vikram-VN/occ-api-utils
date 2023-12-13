import React from "react";
import Files from "@/files/components/file";

export const metadata = {
  title: "Files",
  description:
    "Oracle Commerce allows you to upload third-party files to your sites, such as files used for site and merchant domain verification.",
};

export default function page(props) {
  return <Files {...props} />;
}
