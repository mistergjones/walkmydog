import React, { useState } from "react";

function Upload(props) {
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    let widget = window.cloudinary.createUploadWidget(
        {
            cloud_name: "dqnazdwqk",
            upload_preset: "gr2bgrfy",
            sources: ["local"],
            multiple: false,
        },
        function (error, result) {
            console.log("result = " + result + "error = " + error);
            setError(error);
            setResult(result);
        }
    );

    return (
        <div>
            <h1>Uplaod</h1>
            <button onClick={() => widget.open()}>Upload</button>
            {error && <h1>{error.message}</h1>}
            {result && (
                <img
                    style={{
                        height: "150px",
                        width: "150px",
                        borderRadius: "75px",
                    }}
                    src={result[0].url}
                />
            )}
        </div>
    );
}

export default Upload;
