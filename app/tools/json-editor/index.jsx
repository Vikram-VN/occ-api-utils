"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const VanillaJSONEditor = dynamic(() => import("./jsonEditor"), { ssr: false })


const JsonEditor = () => {

    const [content, setContent] = useState({ json: { msg: "Hello world!" } });

    return (
        <div className="justify">
            <div className="flex phone:flex-row flex-col gap-6 mt-6">
                <div className="w-full">
                    <h2>Editor</h2>
                    <VanillaJSONEditor
                        content={content}
                        onChange={setContent}
                    />
                </div>
                <div className="flex justify-center items-center">
                    Items
                </div>
                <div className="w-full">
                    <h2>Contents</h2>
                    <VanillaJSONEditor
                        content={content}
                        readOnly={true}
                        onChange={setContent}
                    />
                </div>
            </div>
        </div>
    );
}

export default JsonEditor;