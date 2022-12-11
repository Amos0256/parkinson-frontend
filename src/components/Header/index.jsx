import useAuth from "hooks/useAuth";
import { useState, useEffect } from 'react';
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { useNavigate, useLocation} from 'react-router-dom';
import { SplitButton } from "primereact/splitbutton";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from 'primereact/dialog';
import React from "react";
import "./header.css";
import icon from "./parkinson.png";
import Personal_info from "./Personal-info";
import { record } from "pages/Patient/List/ResultDataTable";


export default function Header({ title }) {
  const navigate = useNavigate("");
  const { user, logout } = useAuth();
  const [profileShow, setProfileShow] = useState(false);

  const info = [
    {
      label: "個人資料",
      icon: "pi pi-fw pi-file-edit",
      command: () => {
        //direct to personal information
        setProfileShow(true);
      }
    },
    {
      label: "登出",
      icon: "pi pi-fw pi-power-off",
      command: () => {
        logout();
      }
    },
  ];

  const start = (
      <React.Fragment>
          <img alt="logo" src={icon} height="45"></img>
          {(() => {
              if(window.location.pathname === '/patient/upload') {
                return(
                  <Button 
                    label="檢測結果"
                    icon="pi pi-fw pi-chart-bar"
                    className="p-button-text result-button" 
                    onClick={() => {
                      navigate('/patient')
                    }}
                  />
                );
              }
              else if(window.location.pathname === '/patient') {
                return(
                  <Button
                    label="影片上傳"
                    icon="pi pi-fw pi-upload"
                    className="p-button-text upload-button"
                    onClick={() => {
                      let flag = 0;
                      for(let i = 0; i<record.length;i++) {
                        if(record[i].status === '未上傳') {
                          flag = 1;
                        }
                      }
                      if(flag) {
                        navigate('/patient/upload', {
                          state: {
                            option: "",
                          }
                        })
                      }
                      else {
                        alert('目前無待檢測項目，無須上傳檢測影片!');
                      }
                      
                    }}
                  />
                );
              }
          })()}  
          
      </React.Fragment>
  );

  const end = (
    <SplitButton
      label={user.name}
      icon="pi pi-user"
      model={info}
      className="p-button-text header-button" 
    />
  );
  
  return (
    <div>
      <div className="card">
        <Toolbar left={start}  right={end} style={{ padding: "0.5rem" }} />
        <Dialog 
          visible={profileShow}
          style={{ width: 'auto', height: 'auto'}}
          onHide={() => setProfileShow(false)}>
            <Personal_info/>
          </Dialog>
      </div>
    </div>
  );
}

//如mission欄位中的status == 未上傳 為空，上傳影片鍵消失?
