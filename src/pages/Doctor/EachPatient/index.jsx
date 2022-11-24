import Header from "components/Header";
import useAuth from "hooks/useAuth";
import { Button } from "primereact/button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExamDataTable from "./ExamDataTable/inedx";

export default function EachPatient() {
  const { loading, isLogin, logout, user } = useAuth();

  const navgate = useNavigate();
  useEffect(() => {
    if (isLogin) {
      if (user.roles[0].id === 1) {
        navgate("/doctor");
      }
    } else {
      navgate("/login");
    }
  }, []);

  return (
    <div>
      <Header />
      <div style={{ padding: 10 }}>
        <Button
          label="個人資料"
          icon="pi pi-user"
          iconPos="left"
          className="p-button-secondary p-button-text"
        />
        <Button
          label="重置密碼"
          icon="pi pi-refresh"
          iconPos="left"
          className="p-button-secondary p-button-text"
        />
      </div>
      <ExamDataTable />
    </div>
  );
}
