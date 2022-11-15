import Header from "./Header";
import Table from "./Table";
import DialogDemo from "./Dialog";


export default function Doctor() {
  require("./index.css");
  return (
    <div>
      <Header title={"主頁"}/>
      <DialogDemo title={"dialogtest"}/>
      <Table title={"tabletest"}/>
    </div>
  );
}
