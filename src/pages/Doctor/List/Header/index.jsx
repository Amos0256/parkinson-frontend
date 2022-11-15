import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { SplitButton } from 'primereact/splitbutton';
import { Toolbar } from 'primereact/toolbar';

export default function Header({ title }) {
  require("../index.css");
  const info = [
    {
      label:'個人資料',
      icon:'pi pi-fw pi-file-edit'
    },
    {
      label:'登出',
      icon:'pi pi-fw pi-power-off'
    }
  ];
const start = <img alt="logo" src={require("./parkinson.png")} height="40"></img>;
const end = <SplitButton label="醫師姓名" icon="pi pi-user" model={info} style={{ color: 'rgb(82, 79, 79)' }} className="p-button-text p-button-info mr-2 mb-2"></SplitButton>
    return (
        <div>
            <div className="card">
            <Toolbar left={start} right={end} style={{ padding: '0.5rem' }}/>
            </div>
        </div>
    );
}
