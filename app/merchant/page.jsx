"use client"

import React, { useCallback, useMemo, useState } from "react";
import { ListGroup, Card } from "flowbite-react";
import basicAuth from "./basicAuth";
import policies from "./policies";
import adminConf from "./adminConf";
import agentConf from "./agentConf";
import allowedUrls from "./allowedUrls";
import cloudConf from "./cloudConf";
import whitelistUrls from "./whitelistUrls";
import restrictedWords from "./restrictedWords";
import { useToasts } from "../store/hooks";
import adminApi from "../utils/api";

export default function Merchant() {

  const toast = useToasts();

  const [activeTab, setActiveTab] = useState(1);

  const Component = useMemo(() => {
    const components = {
      1: basicAuth, 2: policies, 3: adminConf,
      4: agentConf, 5: allowedUrls, 6: cloudConf,
      7: whitelistUrls, 8: restrictedWords
    };

    return components[activeTab];
  }, [activeTab]);


  console.log('comp->', Component)

  // Used to show notifications
  const onSuccess = () => {
    toast.show({
      status: "success",
      message: "Results fetched successfully"
    });
  }


  // Used to show notifications
  const onError = (error) => {
    toast.show({
      status: "failure",
      message: error.message || "Something went wrong"
    });

  }

  return (
    <React.Fragment>
      <Card className="mb-4">
        <h1 className="mb-2 text-2xl text-justify bold ">Merchant Settings</h1>
      </Card>

      <div className="flex flex-col tablet:flex-row gap-4 w-full">
        <ListGroup className="w-full tablet:w-1/6">
          <ListGroup.Item
            active={activeTab === 1}
            onClick={() => setActiveTab(1)}
          >
            Basic Auth
          </ListGroup.Item>
          <ListGroup.Item
            active={activeTab === 2}
            onClick={() => setActiveTab(2)}
          >
            Policies
          </ListGroup.Item>
          <ListGroup.Item
            active={activeTab === 3}
            onClick={() => setActiveTab(3)}
          >
            Admin Configuration
          </ListGroup.Item>
          <ListGroup.Item
            active={activeTab === 4}
            onClick={() => setActiveTab(4)}
          >
            Agent Configuration
          </ListGroup.Item>
          <ListGroup.Item
            active={activeTab === 5}
            onClick={() => setActiveTab(5)}
          >
            Allowed URLs
          </ListGroup.Item>
          <ListGroup.Item
            active={activeTab === 6}
            onClick={() => setActiveTab(6)}
          >
            Cloud Configuration
          </ListGroup.Item>
          <ListGroup.Item
            active={activeTab === 7}
            onClick={() => setActiveTab(7)}
          >
            Whitelist URLs
          </ListGroup.Item>
          <ListGroup.Item
            active={activeTab === 8}
            onClick={() => setActiveTab(8)}
          >
            Restricted Words
          </ListGroup.Item>
        </ListGroup>
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-md p-4">
          <Component adminApi={adminApi} toast={toast} onSuccess={onSuccess} onError={onError} />
        </div>
      </div>
    </React.Fragment>
  )
}
