import React, { useState, createContext, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import "./UploadBox.css";
import { Button } from "primereact/button";
import api from "utils/api";
import { formContext } from "../../formContext";
import { record } from "pages/Patient/List/ResultDataTable";
import { cur_record_id } from "../../FirstPage/InputForm/Selector";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
export const fileContext = createContext(null);

export default function FileUpload() {
  const form_context = useContext(formContext);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate("");
  const [fileState, setFileState] = useState('取消');
  const token = localStorage.getItem("token");
  const filepondRef = useRef(null);
  return (
    <div className="filepond-upload">
      <FilePond
        ref={filepondRef}
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
        checkValidity={true}
        // instantUpload={false}
        labelIdle='請拖移檔案至此 或是 <span class="filepond--label-action">瀏覽</span>'
        credits="false"
        allowMultiple={true}
        onprocessfile={ (error, files) => {
            setFileState('完成');
            //console.log(fileState);
            const cur_file = filepondRef.current.getFiles();
            
            console.log(form_context.Form.date);
            console.log(form_context.Form.time);
            console.log(form_context.Form.place);
            console.log(form_context.Form.option);
            
            api('upload-record','POST',
                {
                    "submit_time": `${form_context.Form.date} ${form_context.Form.time}`,
                    "category": form_context.Form.option,
                    "location": form_context.Form.place,
                    "mission_id":record[cur_record_id].mission_id,
                    "video":cur_file.map((files)=>{
                      var serverId = `${files.serverId}`;
                      //console.log(serverId);
                      var newserverId = serverId.replace(/"/g, '');
                      //console.log(newserverId);
                      return {
                        serverId: newserverId,
                        "filename": `${files.filename}`,
                      }
                    })
                }
            );
          }
        }
        onremovefile={ (error, files) => {
            setFileState('取消');
        }}
        
        
       
      />
      <div className="b-layout">
        <div className='sec-button'>
          {(() => {
            if(fileState === '取消') {
              return (
                <Button 
                  label={fileState} 
                  iconPos="left"
                  icon="pi pi-times"
                  onClick={() => {
                      navigate('/patient')
                  }}
                />
              );
            }
            else {
              return (
                <Button 
                  className='second-button'
                  label={fileState} 
                  iconPos="left"
                  icon="pi pi-check"
                  onClick={() => {
                      navigate('/patient')
                  }}
                />
              );
            }
          })()}
        </div>
      </div>
      
    </div>
  );
}

// need process chunks if file is very big?
