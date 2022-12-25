import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import useAuth, { AuthContext } from "hooks/useAuth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const { user, login, logout, isLogin, loading } = useAuth();
  const navgate = useNavigate();
  const [forgetPasswordModal, setForgetPasswordModal] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (isLogin) {
      if (user.roles[0].id === 1) {
        navgate("/doctor");
      } else if (user.roles[0].id === 2) {
        navgate("/patient");
      }
    }
  }, [isLogin, loading]);

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        boxSizing: "border-box",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          height: "max(50vh, 500px)",
          width: "min(100vw, 400px)",
          padding: "20px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>登入分析系統</h1>
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">
            <i className="pi pi-user"></i>
          </span>
          <InputText
            placeholder="身分證字號/醫師編號"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="p-inputgroup" style={{ marginTop: "20px" }}>
          <span className="p-inputgroup-addon">
            <i className="pi pi-key"></i>
          </span>
          <InputText
            type={showPw ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="密碼"
          />
          <span
            className="p-inputgroup-addon"
            style={{ backgroundColor: "white", cursor: "pointer" }}
            onClick={() => setShowPw(!showPw)}
          >
            <i className={`pi ${showPw ? "pi-eye-slash" : "pi-eye"}`}></i>
          </span>
        </div>
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <Button
            className="p-button-link"
            label="忘記密碼"
            onClick={() => {
              setForgetPasswordModal(true);
            }}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <Button
            label="登入"
            icon="pi pi-arrow-right"
            iconPos="right"
            onClick={() => {
              if (username && password) login(username, password);
              else alert("身分證字號與密碼不得空白!");
            }}
          />
        </div>
        <Dialog
          header={"忘記密碼說明"}
          visible={forgetPasswordModal}
          onHide={() => setForgetPasswordModal(false)}
          style={{ textAlign: "left", width: "500px" }}
        >
          由於安全性與個人資料隱私問題：
          <br />
          1. 若您是醫師，請聯絡系統管理員，以協助重置密碼。
          <br />
          2. 若您是病患，請聯絡您的主治醫師，以協助重置密碼。
        </Dialog>
      </Card>
    </div>
  );
}
