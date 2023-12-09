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

const AminConf = (props) => {
  const { adminApi, onSuccess, onError } = props;
  const [currentSettings, setSettings] = useState();

  const setAdminConfig = async (config) => {
    // Getting current basic auth settings
    const response = await adminApi({
      method: "put",
      url: "merchant/adminConfiguration",
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
        url: "merchant/adminConfiguration",
        showNotification: true,
        onError,
        onSuccess,
      });
      setSettings(response);
    };

    fetchConf();
  }, []);

  const updateInput = (e) =>
    setSettings({ ...currentSettings, [e.target.name]: e.target.value });

  const saveAdminConfig = (event) => {
    event.preventDefault();
    const formData = event.target;
    const payload = formToJson(formData);
    payload.allowedOriginMethods = JSON.parse(payload.allowedOriginMethods);
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
            label="Sort By Price Enabled"
            className="mb-4"
            name="sortByPriceEnabled"
            disabled
            checked={currentSettings.sortByPriceEnabled}
            onChange={(isChecked) =>
              updateInput({
                target: { name: "sortByPriceEnabled", value: isChecked },
              })
            }
          />
          <ToggleSwitch
            label="Support Version 1 Catalogs"
            className="mb-4"
            name="supportVersion1Catalogs"
            disabled
            checked={currentSettings.supportVersion1Catalogs}
            onChange={(isChecked) =>
              updateInput({
                target: { name: "supportVersion1Catalogs", value: isChecked },
              })
            }
          />

          <div className="w-full m-auto mb-4">
            <div className="mb-2 block">
              <Label
                htmlFor="sessionTimeout"
                value="Session Timeout (In Minutes)"
              />
            </div>
            <TextInput
              type="number"
              name="sessionTimeout"
              disabled
              id="sessionTimeout"
              value={currentSettings.sessionTimeout}
              onChange={updateInput}
              placeholder="Ex: 15 (minutes)"
            />
          </div>

          <div className="w-full m-auto mb-4">
            <div className="mb-2 block">
              <Label
                htmlFor="allowedOriginMethods"
                value="Allowed Origin Methods"
              />
            </div>
            <Textarea
              type="text"
              disabled
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
            <Button type="submit" disabled>
              Save Changes
            </Button>
          </div>
        </form>
      )}
    </React.Fragment>
  );
};

export default AminConf;
