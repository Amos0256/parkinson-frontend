import React, { useRef, useState, useContext } from "react";
import { browserHistory, Router, Route } from "react-router";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
// import { usePage } from "@inertiajs/inertia-react";

import "./UploadBox.css";
// import { create } from 'filepond';
// import { AuthContext } from "hooks/useAuth";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default function FileUpload() {
  const [files, setFiles] = useState([]);
  // const auth_context = useContext(AuthContext);
  // const { csrf_token } = usePage().props;
  const token = localStorage.getItem("token");
  return (
    <div className="filepond-upload">
      <FilePond
        files={files}
        // onupdateFiles={setFiles}
        server={{
          url: "http://140.123.242.78/api/upload-video",
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }}
        name="video"
        acceptedFileTypes={["video/mp4"]}
        allowDrop={true}
        dropValidation={true}
        maxFiles={3}
        instantUpload={false}
        labelIdle='請拖移檔案至此 或是 <span class="filepond--label-action">瀏覽</span>'
      />
    </div>
  );
}

// need process chunks if file is very big?
