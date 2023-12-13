import React from "react";
import Organizations from "@/organizations/components/organizations";

export const metadata = {
  title: "Organizations",
  description:
    "This operation is used to get the collection of customer organizations from Oracle Commerce Cloud. It can also be used to return the list on a searched string and in a sorted order against various properties of organization.Optionally takes the X-CCOrganization header to specify current Organization id of logged in user.",
};

export default function Page() {
  return <Organizations />;
}
