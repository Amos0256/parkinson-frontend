import React, { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import "./UploadBox.css";
import { Button } from "primereact/button";


registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
export const fileContext = createContext(null);

export default function FileUpload() {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate("");
  const [fileState, setFileState] = useState('取消');
  const token = localStorage.getItem("token");

  return (
    <div className="filepond-upload">
      <FilePond
        files={files}
        onupdatefiles={(files) => {
          setFiles(files);
        }}
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
        allowBrowse={true}
        maxFiles={3}
        allowMultiple={true}
        checkValidity={true}
        instantUpload={false}
        labelIdle='請拖移檔案至此 或是 <span class="filepond--label-action">瀏覽</span>'
        
        onprocessfile={ (error, files) => {
            setFileState('完成');
            console.log(fileState);
          }
        }
      //   onupdatefiles={ (setFiles) => {
          
      //   }
      // }
        
        
       
      />
      <div className="b-layout">
        <div className='sec-button'>
          <Button 
            label={fileState} 
            onClick={() => {
                navigate('/patient')
            }}
          />
        </div>
      </div>
      
    </div>
  );
}

// need process chunks if file is very big?
