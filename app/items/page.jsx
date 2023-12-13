import React from "react";
import ItemTypes from "@/items/components/items";

export const metadata = {
  title: "Item Types",
  description:
    "Get Item Type. Get information about item types by ID. Optionally takes the x-ccasset-language header to get translated content in another language.",
};

export default function Page() {
  return <ItemTypes />;
}
