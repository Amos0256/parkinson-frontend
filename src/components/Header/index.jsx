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
  const [new_password1, setNewPassword1] = useState("");
  const [new_password2, setNewPassword2] = useState("");
  const [old_password, setOldPassword] = useState("");
  const [displaydialog, setDisplayDialog] = useState(false);
  const [showPw1, setShowPw1] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [showPw3, setShowPw3] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});

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
    api(`update-password`, "POST", { old_password, new_password: new_password1 })
      .then((res) => {
        if (!res.errors) {
          setDisplayDialog(false)
          clear();
          alert("更新密碼成功，請使用新密碼重新登入");
          logout();
        }
        else if (res.errors) {
          setErrorMessage({ old_password: res.errors.old_password, new_password: res.errors.new_password });
        }
        else {
          alert('未知錯誤，請回報錯誤訊息');
        }
      })
      .catch((err) => console.log(err))
      .finally(() => { });
  }

  function clear() {
    setNewPassword1("");
    setNewPassword2("");
    setOldPassword("");
    setShowPw1(false);
    setShowPw2(false);
    setShowPw3(false);
    setErrorMessage("");
  }

  const getErrorMessage = (name) => {
    return (
      <small style={{ color: 'red', display: 'block', marginBottom: '10px' }}>{errorMessage[name]}</small>
    )
  }

  const footer1 = (
    <div>
      <Button label="確定" onClick={() => { (new_password1 === new_password2) ? update_password() : setErrorMessage({ new_password: '請確認新密碼是否正確' }) }} />
      <Button
        className="p-button-secondary p-button-text"
        label="取消"
        onClick={() => {
          clear();
          setDisplayDialog(false);
        }}
      />
    </div>
  );
  const footer2 = (
    <div>
      <Button label="修改密碼" style={{ marginTop: '10px' }} onClick={() => setDisplayDialog(true)} />
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
            clear();
            setDisplayDialog(false);
          }}
        >
          請輸入舊密碼
          <div className="p-inputgroup" style={{ marginTop: "10px"}}>
            <InputText
              type={showPw1 ? "text" : "password"}
              value={old_password} onChange={(e) => setOldPassword(e.target.value)}
              placeholder="舊密碼"
            />
            <span
              className="p-inputgroup-addon"
              style={{ backgroundColor: "white", cursor: "pointer" }}
              onClick={() => setShowPw1(!showPw1)}
            >
              <i className={`pi ${showPw1 ? "pi-eye-slash" : "pi-eye"}`}></i>
            </span>
          </div>
          {getErrorMessage('old_password')}
          請輸入新密碼(最少需要8個字元，並包含1個英文字母)
          <div className="p-inputgroup" style={{ marginTop: "10px"}}>
            <InputText
              type={showPw2 ? "text" : "password"}
              value={new_password1} onChange={(e) => setNewPassword1(e.target.value)}
              placeholder="新密碼"
            />
            <span
              className="p-inputgroup-addon"
              style={{ backgroundColor: "white", cursor: "pointer" }}
              onClick={() => setShowPw2(!showPw2)}
            >
              <i className={`pi ${showPw2 ? "pi-eye-slash" : "pi-eye"}`}></i>
            </span>
          </div>
          {getErrorMessage('new_password')}
          確認新密碼
          <div className="p-inputgroup" style={{ marginTop: "10px", marginBottom: "20px" }}>
            <InputText
              type={showPw3 ? "text" : "password"}
              value={new_password2} onChange={(e) => setNewPassword2(e.target.value)}
              placeholder="確認新密碼"
            />
            <span
              className="p-inputgroup-addon"
              style={{ backgroundColor: "white", cursor: "pointer" }}
              onClick={() => setShowPw3(!showPw3)}
            >
              <i className={`pi ${showPw3 ? "pi-eye-slash" : "pi-eye"}`}></i>
            </span>
          </div>
        </Dialog>
      </div>
    </div>
  );
}

