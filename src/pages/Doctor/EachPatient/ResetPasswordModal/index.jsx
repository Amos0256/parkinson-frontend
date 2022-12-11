import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import api from "utils/api";
import { InputText } from "primereact/inputtext";
// 0:close/1:confirm/2:reset/
export default function ResetPasswordModal({
  uid,
  resetModalState,
  setResetModalState,
}) {
  const [password, setPassword] = useState("test1234");
  const [showPw, setShowPw] = useState(false);
  function reset() {
    api(`reset-password/${uid}`, "POST")
      .then((json) => {
        setPassword(json.password);
        setResetModalState(2);
      })
      .catch((err) => console.log(err))
      .finally(() => {});
  }

  const footer1 = (
    <div>
      <Button label="確定" onClick={reset} />
      <Button
        className="p-button-secondary p-button-text"
        label="取消"
        onClick={() => setResetModalState(0)}
      />
    </div>
  );

  const footer2 = (
    <div>
      <Button label="確定" 
      onClick={() => setResetModalState(0)}
       />
    </div>
  );

  return (
    <>
      <Dialog
        header={"重置密碼"}
        footer={footer1}
        visible={resetModalState === 1}
        style={{ width: "350px" }}
        onHide={() => setResetModalState(0)}
      >
        此動作會隨機重置該患者的密碼，通常用於患者忘記密碼時，確定繼續?
      </Dialog>
      <Dialog
        header={"重置密碼"}
        footer={footer2}
        visible={resetModalState === 2}
        style={{ width: "350px" }}
        onHide={() => setResetModalState(0)}
      >
        重置後密碼如下，請盡快通知患者使用新密碼登入，並修改密碼!
        <div className="p-inputgroup" style={{ marginTop: "20px" }}>
          <span className="p-inputgroup-addon">
            <i className="pi pi-key"></i>
          </span>
          <InputText
            type={showPw ? "text" : "password"}
            value={password}
            placeholder="密碼"
            readOnly
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
    </>
  );
}
