"use client";
import React, { useState } from "react";
import VanillaJSONEditor from "./jsonEditor";

const JsonEditor = () => {

    const [showEditor, setShowEditor] = useState(true);
    const [readOnly, setReadOnly] = useState(false);
    const [content, setContent] = useState({
        json: {
            
        }
    });

    return (
        <div className="justify">
            <h1>JSON Editor in React</h1>
            <div className="mt-4">
                <label>
                    <input
                        type="checkbox"
                        checked={showEditor}
                        onChange={() => setShowEditor(!showEditor)}
                    />
                    Show JSON editor
                </label>
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={readOnly}
                        onChange={() => setReadOnly(!readOnly)}
                    />
                    Read only
                </label>
            </div>

            <div className="flex phone:flex-col mt-6">

                {showEditor && (
                    <div>
                        <h2>Editor</h2>
                        <div className="my-editor">
                            <VanillaJSONEditor
                                content={content}
                                readOnly={readOnly}
                                onChange={setContent}
                            />
                        </div>
                    </div>
                )}
                <div>
                    <h2>Contents</h2>
                    <VanillaJSONEditor
                        content={content}
                        readOnly={readOnly}
                        onChange={setContent}
                    />
                </div>
            </div>
        </div>
    );
}

export default JsonEditor;