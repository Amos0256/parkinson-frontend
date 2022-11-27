import Header from "components/Header";
import useAuth from "hooks/useAuth";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "utils/api";
import ExamDataTable from "./ExamDataTable/inedx";

export default function EachPatient() {
  const { loading, isLogin, user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [profileShow, setProfileShow] = useState(false);
  const [table, setTable] = useState([]);

  useEffect(() => {
    if (loading) return;
    if (isLogin) {
      if (user.roles[0].id === 2) {
        navigate("/patient");
      }
    } else {
      navigate("/login");
    }

    api(`users/${id}`, "GET")
      .then((json) => {
        setCurrentUser(json);
        api(`records`, "GET")
          .then((json) => {
            setTable(json);
          })
          .catch((e) => {
            alert(e.message);
            navigate("/login");
          });
      })
      .catch((e) => {
        alert(e.message);
        navigate("/login");
      });
  }, [isLogin, loading]);

  return (
    <div>
      <Header />
      {id}
      <div style={{ padding: 10 }}>
        <Button
          onClick={() => setProfileShow(true)}
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
      <ExamDataTable data={table}/>
      <Dialog
        header="個人資料"
        visible={profileShow}
        style={{ width: "50vw" }}
        onHide={() => setProfileShow(false)}
      >
        {JSON.stringify(currentUser)}
      </Dialog>
    </div>
  );
}
