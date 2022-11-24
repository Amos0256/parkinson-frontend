import Header from "components/Header";
import useAuth from "hooks/useAuth";
import { Button } from "primereact/button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExamDataTable from "./ExamDataTable/inedx";

export default function EachPatient() {
  const { loading, isLogin, user } = useAuth();

  const navgate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (isLogin) {
      if (user.roles[0].id === 2) {
        navgate("/patient");
      }
    } else {
      navgate("/login");
    }
  }, [isLogin, loading]);

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
