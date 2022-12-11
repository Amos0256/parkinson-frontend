import Header from "components/Header";
import useAuth from "hooks/useAuth";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "utils/api";
import AssignMissionModal from "./AssignMissionModal";
import ExamDataTable from "./ExamDataTable/inedx";
import style from "./style.module.css";

const col_style = {
  display: "flex",
  alignItems: "center",
  fontSize: "20px",
  gap: 10,
};

export default function EachPatient() {
  const { loading, isLogin, user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [profileModalShow, setProfileModalShow] = useState(false);
  const [assignModalShow, setAssignModalShow] = useState(false);
  const [table, setTable] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  function getRecords() {
    api(`users/${id}`, "GET")
      .then((json) => {
        setCurrentUser(json);
        api(`records`, "GET")
          .then((json) => {
            setTable(json.filter((item) => item.user_id == id));
            setTableLoading(false);
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
  }
  useEffect(() => {
    if (loading) return;
    if (isLogin) {
      if (user.roles[0].id === 2) {
        navigate("/patient");
      }
    } else {
      navigate("/login");
    }

    getRecords();
  }, [isLogin, loading]);

  function concatRecords(records) {
    setTable([...table, ...records]);
  }

  function modifyRecords(id, mod) {
    const mod_table = [...table];

    const index = mod_table.findIndex((item) => item.id === id);
    mod_table[index] = {
      ...mod_table[index],
      ...mod,
    };
    setTable(mod_table);
  }

  return (
    <div>
      <Header />
      <div style={{ padding: 10 }}>
        <Button
          onClick={() => setProfileModalShow(true)}
          label="個人資料"
          icon="pi pi-user"
          iconPos="left"
          className="p-button-secondary p-button-text"
        />
        <Button
          onClick={() => setAssignModalShow(true)}
          label="指派檢測任務"
          icon="pi pi-calendar-plus"
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
      <ExamDataTable
        reload={getRecords}
        data={table}
        loading={tableLoading}
        modifyRecords={modifyRecords}
      />
      <Dialog
        header="個人資料"
        visible={profileModalShow}
        style={{ width: "400px" }}
        onHide={() => setProfileModalShow(false)}
      >
        <div style={{ textAlign: "center" }}>
          <h2 style={{ marginTop: 0 }}>{currentUser.name}</h2>
          <h3>{currentUser.personal_id}</h3>
        </div>
        <div style={{ textAlign: "center" }}>
          {" "}
          <div className={style["profile-row"]}>
            <div className={style.title}>性別</div>
            <div>{{
              male:"男",
              female:"女",
              else:"其他",
            }[currentUser.gender]}</div>
          </div>
          <div className={style["profile-row"]}>
            <div className={style.title}>生日</div>
            <div>{currentUser.birthday}</div>
          </div>
          <div className={style["profile-row"]}>
            <div className={style.title}>電話</div>
            <div>{currentUser.phone}</div>
          </div>
          <div className={style["profile-row"]}>
            <div className={style.title}>電子郵件</div>
            <div>{currentUser.email}</div>
          </div>
        </div>
      </Dialog>
      <AssignMissionModal
        uid={id}
        assignModalShow={assignModalShow}
        setAssignModalShow={setAssignModalShow}
        concatRecords={concatRecords}
        reload={getRecords}
      />
    </div>
  );
}
