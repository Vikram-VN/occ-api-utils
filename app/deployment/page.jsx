import React from "react";
import Deployment from "@/deployment/components/deployment";

export const metadata = {
  title: "Deployment | Publish",
  description:
    "Get Application Deployments. Returns any Application Deployments matching an appName",
};

export default function Page() {
  return <Deployment />;
}
