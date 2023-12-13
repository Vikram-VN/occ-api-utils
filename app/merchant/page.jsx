import React from "react";
import Merchant from "@/merchant/components/merchant";

export const metadata = {
  title: "Merchant Settings",
  description:
    "The Oracle Commerce Service REST APIs provide an extensive set of endpoints for configuring and managing your store.",
};

export default function Page() {
  return <Merchant />;
}
