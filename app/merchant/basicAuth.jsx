import React, { useEffect, useState } from "react";


const BasicAuth = (props) => {

    const { adminApi, onSuccess, onError } = props;
    const [currentSettings, setAuthSettings] = useState({});

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


    return (
        <React.Fragment>
            <h1 className="mb-2 text-2xl text-justify bold">Site Basic Authorization Settings</h1>
            {JSON.stringify(currentSettings)}
        </React.Fragment>
    )
}

export default BasicAuth