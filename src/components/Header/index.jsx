import useAuth from "hooks/useAuth";
import { useState, useEffect } from 'react';
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { useNavigate, useLocation } from 'react-router-dom';
import { SplitButton } from "primereact/splitbutton";
import { InputText } from 'primereact/inputtext';
import { Toolbar } from "primereact/toolbar";
import { Dialog } from 'primereact/dialog';
import React from "react";
import "./header.css";
import icon from "./parkinson.png";
import Personal_info from "./Personal-info";
import { record } from "pages/Patient/List/ResultDataTable";
import api from "utils/api";
import { upload_button } from "pages/Patient/Upload";
import { upload } from "@testing-library/user-event/dist/upload";


export default function Header({ title }) {
  const navigate = useNavigate("");
  const { user, logout } = useAuth();
  const [profileShow, setProfileShow] = useState(false);
  const [password, setPassword] = useState("");
  const [displaydialog, setDisplayDialog] = useState(false);
  const [showPw, setShowPw] = useState(false);

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
        if (window.location.pathname === '/patient/upload') {
          return (
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
        else if (window.location.pathname === '/patient') {
          return (
            <Button
              label="影片上傳"
              icon="pi pi-fw pi-upload"
              className="p-button-text upload-button"
              onClick={() => {
                let flag = 0;
                console.log(record);
                let max = 0;
                for (let i = 0; i < record.length; i++) {

                  if (record[i].status === '未上傳' && record[i].mission_id > max) {
                    max = record[i].mission_id;
                    flag = 1;
                  }

                }
                if (flag) {

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

  function update_password() {
    api(`update-password`, "POST", {password})
      .then(() => {
        setDisplayDialog(false)
        setPassword("");
        alert("更新密碼成功，請使用新密碼重新登入");
        logout();
        
    })
      .catch((err) => console.log(err))
      .finally(() => {});
}

  const footer1 = (
    <div>
      <Button label="確定" onClick={update_password} />
      <Button
        className="p-button-secondary p-button-text"
        label="取消"
        onClick={() => {
            setPassword("");
            setDisplayDialog(false);
        }}
      />
    </div>
);
  const footer2 = (
    <div>
      <Button label="修改密碼" style={{ marginTop: '10px'}} onClick={() => setDisplayDialog(true)} />
    </div>
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
        <Toolbar left={start} right={end} style={{ padding: "0.5rem" }} />
        <Dialog
          footer={footer2}
          visible={profileShow}
          style={{ width: 'auto', height: 'auto' }}
          onHide={() => setProfileShow(false)}>
          <Personal_info />
        </Dialog>
        <Dialog
          header={"修改密碼"}
          footer={footer1}
          visible={displaydialog}
          style={{ width: "350px" }}
          onHide={() => {
            setPassword("");
            setDisplayDialog(false);
        }}
        >
          請輸入新密碼
          <div className="p-inputgroup" style={{ marginTop: "20px" }}>
            <InputText
              type={showPw ? "text" : "password"}
              value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="新密碼"
            />
            <span
              className="p-inputgroup-addon"
              style={{ backgroundColor: "white", cursor: "pointer" }}
              onClick={() => setShowPw(!showPw)}
            >
              <i className={`pi ${showPw ? "pi-eye-slash" : "pi-eye"}`}></i>
            </span>
          </div>
        </Dialog>
      </div>
    </div>
  );
}

