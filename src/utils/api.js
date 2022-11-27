export default function api(target, method, body) {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    fetch(`http://${process.env.REACT_APP_API}/api/${target}`, {
      credentials: "include",
      headers: {
        accept: "application/json",
        "content-type": "application/json;charset=UTF-8",
        Authorization: "Bearer " + token,
      },
      method,
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 401) {
          throw new Error("授權資訊錯誤");
        } else if (res.status === 404) {
          throw new Error("資料不存在");
        } else {
          throw new Error("錯誤");
        }
      })
      .then((json) => {
        resolve(json);
      })
      .catch((e) => {
        reject(e);
      });
  });
}
