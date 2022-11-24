import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import useAuth, { AuthContext } from "hooks/useAuth";
import { useContext } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const { user, login, logout } = useAuth();

  const context = useContext(AuthContext);
  console.log(context);
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
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
            label="忘記密碼"
            onClick={() => {
              logout();
            }}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <Button
            label="登入"
            icon="pi pi-arrow-right"
            iconPos="right"
            onClick={() => {
              login(username, password);
            }}
          />
        </div>
        {JSON.stringify(user, " ")}
      </Card>
    </div>
  );
}
