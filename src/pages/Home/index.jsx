import { Button } from 'primereact/button';
import Header from "../Doctor/List/Header";

export default function Home() {
  return (
    <div>
      <Header title={"主頁[DEV]"}/>
      <Button label="Success" className="p-button-raised p-button-success" />
    </div>
  );
}
