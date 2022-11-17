import React, { useState } from "react";
import Upload_box from "./Upload_box"
import { FilePond, registerPlugin } from "filepond";

import 'filepond/dist/filepond.min.css';

export default function SecondPage() {
    return (
        <div>
            {/* <FilePond allowMultiple={true} maxFiles={3} server="/api" /> */}
            <Upload_box />
        </div>
    );
}