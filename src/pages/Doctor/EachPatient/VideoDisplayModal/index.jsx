import { Dialog } from "primereact/dialog";
import { useEffect, useRef, useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import api from "utils/api";
import useAuth from "hooks/useAuth";

export default function VideoDisplayModal({
  videoModalShow,
  setVideoModalShow,
  rid,
}) {
  const [src, setSrc] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!rid || !token) return;
    fetch(`http://${process.env.REACT_APP_API}/api/video/${rid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(function (response) {
        return response.blob();
      })
      .then((blob) => {
        if (blob) {
          setSrc(URL.createObjectURL(blob));
        } else {
        }
      });
  }, [rid]);

  return (
    <Dialog
      header={"影片檢視"}
      visible={videoModalShow}
      onHide={() => setVideoModalShow(false)}
      style={{ textAlign: "center", width: "600px" }}
    >
      <video width="400" src={src} controls="true"></video>
    </Dialog>
  );
}
