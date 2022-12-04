import React, { useState } from "react";
import { FilePond, registerPlugin } from "filepond";

import 'filepond/dist/filepond.min.css';
import FileUpload from "./Upload_box/filepond";


export default function SecondPage() {
    return (
        <div>
            <FileUpload />
            {/* <Upload_box /> */}
        </div>
    );
}