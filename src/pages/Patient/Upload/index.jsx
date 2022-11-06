import { useState } from "react";

export default function Upload() {
  const [count, setCount] = useState(0);
  if (count < 10) return <div onClick={() => setCount(count + 1)}>{count}</div>;
  else return <div>oops</div>;
}
