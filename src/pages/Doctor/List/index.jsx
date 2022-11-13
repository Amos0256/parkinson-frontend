import Header from "./Header";
import Table from "./Table";
import DialogDemo from "./Dialog";
import "./index.css"

export default function Doctor() {
  return (
    <div>
      <Header title={"主頁"}/>
      <DialogDemo title={"dialogtest"}/>
      <Table title={"tabletest"}/>
    </div>
  );
}
