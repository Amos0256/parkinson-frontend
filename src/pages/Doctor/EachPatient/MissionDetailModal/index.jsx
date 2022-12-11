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

  const formatDate = (value) => {
    return value
      ? new Date(value).toLocaleDateString("zh-TW", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      : "N/A";
  };

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
        <h3>指派日期</h3>
        {formatDate(record.created_at)}
        <h3>上傳日期</h3>
        {formatDate(record.submit_time)}
        <h3>檢測結果</h3>
        {(() => {
          try {
            const json = JSON.parse(record.result);
            return (
              <>
                左：{json.left}
                <br />
                右：{json.right}
              </>
            );
          } catch {
            return "";
          }
        })()}

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
