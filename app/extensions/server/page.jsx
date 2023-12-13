import React from "react";
import ExtensionsServer from "@/extensions/components/server";

export const metadata = {
  title: "Extensions Server",
  description: "Get extensions info, logs etc from OCC server",
};

export default function Page() {
  return <ExtensionsServer />;
}
