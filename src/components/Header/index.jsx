import useAuth from "hooks/useAuth";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { SplitButton } from "primereact/splitbutton";
import { Toolbar } from "primereact/toolbar";
import "./header.css";
import icon from "./parkinson.png";

export default function Header({ title }) {
  const { user } = useAuth();

  const info = [
    {
      label: "個人資料",
      icon: "pi pi-fw pi-file-edit",
    },
    {
      label: "登出",
      icon: "pi pi-fw pi-power-off",
    },
  ];

  const start = <img alt="logo" src={icon} height="40"></img>;
  const end = (
    <SplitButton
      label={user.name}
      icon="pi pi-user"
      model={info}
      className="header-button"
    />
  );
  return (
    <div>
      <div className="card">
        <Toolbar left={start} right={end} style={{ padding: "0.5rem" }} />
      </div>
    </div>
  );
}
