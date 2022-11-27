import useAuth from "hooks/useAuth";
import { useState } from 'react';
import { useEffect } from "react";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { useNavigate, useLocation} from 'react-router-dom';
import { SplitButton } from "primereact/splitbutton";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from 'primereact/dialog';
import React from "react";
import "./header.css";
import icon from "./parkinson.png";
import api from "utils/api";

export default function Header({ title }) {
  const navigate = useNavigate("");
  const { user, isLogin, loading, logout } = useAuth();
  const [profileShow, setProfileShow] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if (loading) return;
    if (isLogin){
      api("user-info", "GET")
      .then((json) => {
        setCurrentUser(json);
      })
      .catch((e) => {
        alert(e.message);
        navigate("/login");
      });
    }
    else{
      navigate("/login");
    }
  }, [isLogin, loading]);

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
          <img alt="logo" src={icon} height="40"></img>
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
                      navigate('/patient/upload', {
                          state: {
                            option: "",
                          }
                        }
                      )
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
          header="個人資料"
          visible={profileShow}
          style={{ width: '60rem', height: 'auto'}}
          onHide={() => setProfileShow(false)}>
            {JSON.stringify(currentUser)}
          </Dialog>
      </div>
    </div>
  );
}
