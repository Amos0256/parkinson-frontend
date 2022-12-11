import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import api from "utils/api";

export default function MissionDetailModal({
  uid,
  missionDetailModalShow,
  setMissionDetailModalShow,
  record,
  modifyRecords,
}) {
  const [comment, setComment] = useState("");
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    if (record) {
      setComment(record.doctor_comment);
      setChanged(false);
    }
  }, [record, missionDetailModalShow]);

  function finish() {
    if (changed) {
      api("update-comment", "PATCH", {
        record_id: record.id,
        status: "已檢閱",
        doctor_comment: comment,
      })
        .then((json) => {
          modifyRecords(record.id, json);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setMissionDetailModalShow(false);
        });
    }
  }

  const footer = (
    <div>
      <Button
        className="p-button-secondary p-button-text"
        label="取消"
        onClick={() => setMissionDetailModalShow(false)}
      />
      <Button label="完成" onClick={finish} />
    </div>
  );

  const statusBodyTemplate = ({ status }) => {
    const map = {
      未上傳: 0,
      未處理: 1,
      待檢閱: 2,
      已檢閱: 3,
    };
    const bgcolors = ["#CFCFCF", "#FFD8B2", "#B3E5FC", "#C8E6C9"];
    const colors = ["#6F6F6F", "#805B36", "#23547B", "#346C37"];
    return (
      <span
        style={{
          backgroundColor: bgcolors[map[status]],
          color: colors[map[status]],
          padding: "5px",
        }}
      >
        {status}
      </span>
    );
  };

  return (
    record && (
      <Dialog
        header={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {record.category}
            {statusBodyTemplate(record)}
          </div>
        }
        footer={footer}
        visible={missionDetailModalShow}
        style={{ width: "350px" }}
        onHide={() => setMissionDetailModalShow(false)}
      >
        <div style={{ textAlign: "right" }}></div>
        <h3>期限</h3>

        <h3>評論</h3>
        <InputTextarea
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            setChanged(true);
          }}
          rows={5}
          cols={30}
          autoResize
        />
      </Dialog>
    )
  );
}
