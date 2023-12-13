import {
  Accordion,
  Button,
  Label,
  TextInput,
  Textarea,
  ToggleSwitch,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { formToJson } from "@/utils";

const AgentConf = (props) => {
  const { adminApi, onSuccess, onError } = props;
  const [currentSettings, setSettings] = useState();

  const setAdminConfig = async (config) => {
    // Getting current basic auth settings
    const response = await adminApi({
      method: "put",
      url: "merchant/agentConfiguration",
      data: config,
      showNotification: true,
      onError,
      onSuccess,
    });
    setSettings(response);
  };

  useEffect(() => {
    const fetchConf = async () => {
      // Getting current basic auth settings
      const response = await adminApi({
        method: "get",
        url: "merchant/agentConfiguration",
        showNotification: true,
        onError,
        onSuccess,
      });
      setSettings(response);
    };

    fetchConf();
  }, []);

  const updateInput = (e) => {
    setSettings({ ...currentSettings, [e.target.name]: e.target.value });
  };

  const saveAdminConfig = (event) => {
    event.preventDefault();
    const formData = event.target;
    const payload = formToJson(formData);
    payload.allowedOriginMethods = JSON.parse(payload.allowedOriginMethods);

    console.log(payload);
    setAdminConfig(payload);
  };

  return (
    <React.Fragment>
      <h1 className="mb-2 text-2xl text-justify bold">
        Site Basic Authorization Settings
      </h1>
      {currentSettings && (
        <form onSubmit={saveAdminConfig}>
          <ToggleSwitch
            label="Delegated Admin Allowed Through Settings"
            className="mb-4"
            name="delegatedAdminAllowedThroughAgent"
            checked={currentSettings.delegatedAdminAllowedThroughAgent}
            onChange={(isChecked) =>
              updateInput({
                target: {
                  name: "delegatedAdminAllowedThroughAgent",
                  value: isChecked,
                },
              })
            }
          />
          <ToggleSwitch
            label="Order Approvals Allowed Through Agent"
            className="mb-4"
            name="orderApprovalsAllowedThroughAgent"
            checked={currentSettings.orderApprovalsAllowedThroughAgent}
            onChange={(isChecked) =>
              updateInput({
                target: {
                  name: "orderApprovalsAllowedThroughAgent",
                  value: isChecked,
                },
              })
            }
          />

          <div className="w-full m-auto mb-4">
            <div className="mb-2 block">
              <Label
                htmlFor="allowedOriginMethods"
                value="Allowed Origin Methods"
              />
            </div>
            <Textarea
              type="text"
              name="allowedOriginMethods"
              id="allowedOriginMethods"
              onChange={updateInput}
              defaultValue={JSON.stringify(
                currentSettings.allowedOriginMethods,
              )}
              placeholder="Ex: {'https:example.com': 'GET,POST'}"
            />
          </div>
          <div className="flex justify-center">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      )}
    </React.Fragment>
  );
};

export default AgentConf;
