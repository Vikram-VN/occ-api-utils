import { Accordion, Button, Label, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { formToJson } from "../utils";


const BasicAuth = (props) => {

    const { adminApi, onSuccess, onError } = props;
    const [currentSettings, setAuthSettings] = useState();

    const setAuthConfig = async (config) => {
        // Getting current basic auth settings
        const response = await adminApi({
            method: "put",
            url: "merchant/basicAuth",
            data: config,
            showNotification: true,
            onError, onSuccess
        });
        setAuthSettings(response);
    }

    useEffect(() => {

        const fetchAuth = async () => {
            // Getting current basic auth settings
            const response = await adminApi({
                method: "get",
                url: "merchant/basicAuth",
                showNotification: true,
                onError, onSuccess
            });
            setAuthSettings(response);
        }

        fetchAuth();
    }, []);

    const disableBasicAuth = (event) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            setAuthConfig({
                pathWhitelist: ["/"]
            })
        } else {
            setAuthConfig({
                pathWhitelist: []
            })
        }
    }


    const updateInput = (e) => setAuthSettings({ ...currentSettings, [e.target.name]: e.target.value })

    const saveAdvancedConfig = (event) => {
        event.preventDefault();
        const formData = event.target;
        const payload = formToJson(formData);
        Object.keys(payload).map(key => {
            const list = payload[key].split(",");
            payload[key] = payload[key] ? list.map(item => {
                return item.trim()
            }) : []
        });
        setAuthConfig(payload);
    }


    return (
        <React.Fragment>
            <h1 className="mb-2 text-2xl text-justify bold">Site Basic Authorization Settings</h1>
            {currentSettings &&
                <form onSubmit={saveAdvancedConfig}>
                    <label class="relative inline-flex items-center cursor-pointer mb-4">
                        <input type="checkbox"
                            class="sr-only peer"
                            checked={
                                currentSettings.headersWhitelist?.length > 0 ||
                                currentSettings.ipRangesWhitelist?.length > 0 ||
                                currentSettings.pathWhitelist?.length > 0 ||
                                currentSettings.neverAuthenticateTargetHostNames?.length > 0
                            }
                            onChange={disableBasicAuth}

                        />
                        <div class="w-14 h-7 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full 
                        peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white 
                        after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-slate-300 
                        after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600" />
                        <span class="ml-3 text-xl font-medium text-slate-900 dark:text-slate-300">Basic Authorization</span>
                    </label>
                    <Accordion collapseAll>
                        <Accordion.Panel>
                            <Accordion.Title>
                                Advanced Settings
                            </Accordion.Title>
                            <Accordion.Content>
                                <div className="w-full m-auto mb-4">
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="headersWhitelist"
                                            value="Whitelisted Headers"
                                        />
                                    </div>
                                    <TextInput type="text" name="headersWhitelist" id="headersWhitelist" value={currentSettings.headersWhitelist} onChange={updateInput} placeholder="Ex: X-MyHeader, X-Agent" />
                                </div>
                                <div className="w-full m-auto mb-4">
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="ipRangesWhitelist"
                                            value="Whitelisted Ip Ranges"
                                        />
                                    </div>
                                    <TextInput type="text" name="ipRangesWhitelist" id="ipRangesWhitelist" value={currentSettings.ipRangesWhitelist} onChange={updateInput} placeholder="Ex: 10.0.0.1 - 10.0.0.240, 127.0.0.1 - 127.0.0.242" />
                                </div>
                                <div className="w-full m-auto mb-4">
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="neverAuthenticateTargetHostNames"
                                            value="Whitelisted Hosts"
                                        />
                                    </div>
                                    <TextInput type="text" name="neverAuthenticateTargetHostNames" id="neverAuthenticateTargetHostNames" value={currentSettings.neverAuthenticateTargetHostNames} onChange={updateInput} placeholder="Ex: www.exaple.com, abcde.com" />
                                </div>
                                <div className="w-full m-auto mb-4">
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="pathWhitelist"
                                            value="Whitelisted Paths"
                                        />
                                    </div>
                                    <TextInput type="text" name="pathWhitelist" id="pathWhitelist" value={currentSettings.pathWhitelist} onChange={updateInput} placeholder="Ex: /ccstore/v1/login, /ccstore/v1/products" />
                                </div>
                                <div className="flex justify-center">
                                    <Button type="submit">
                                        Save Changes
                                    </Button>
                                </div>


                            </Accordion.Content>
                        </Accordion.Panel>
                    </Accordion>

                </form>

            }
        </React.Fragment>
    )
}

export default BasicAuth