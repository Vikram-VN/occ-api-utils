"use client";
import { Tabs } from "flowbite-react";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { useToasts } from "@/store/hooks";
import { InboxArrowDownIcon, ServerIcon } from "@heroicons/react/24/solid";
import { StoreContext } from "@/store/context";

import Deployment from "@/deployment/deployment";
import Publish from "@/deployment/publish";

export default function Deployments() {
  const { action } = useContext(StoreContext);

  const router = useRouter();
  const toast = useToasts();

  const actions = { router, toast, action };

  return (
    <React.Fragment>
      <Tabs
        aria-label="Tabs with icons"
        style="underline"
        className="bg-white dark:bg-gray-800 rounded-md gap-4"
      >
        <Tabs.Item
          title="Deployments History"
          active={true}
          icon={InboxArrowDownIcon}
        >
          <Deployment {...actions} />
        </Tabs.Item>

        <Tabs.Item title="Publish History" icon={ServerIcon}>
          <Publish {...actions} />
        </Tabs.Item>
      </Tabs>
    </React.Fragment>
  );
}
