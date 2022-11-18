import Header from "components/Header";
import { Button } from "primereact/button";
import ExamDataTable from "./ExamDataTable/inedx";

export default function EachPatient() {
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
