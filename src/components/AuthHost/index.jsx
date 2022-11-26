import { AuthContext } from 'hooks/useAuth'
import { useEffect, useState } from 'react'

export default function AuthHost({ children }) {
  const [loading, setLoading] = useState(true)
  const [isLogin, setLogin] = useState(false)
  const [user, setUser] = useState({})
  const [token, setToken] = useState(null)

  function clearInfo() {
    setLoading(false)
    setLogin(false)
    setUser(true)
    setToken(null)
    localStorage.clear()
  }

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (token && loading) {
      fetch("http://140.123.242.78/api/user-info", {
        credentials: "include",
        headers: {
          accept: "application/json",
          "content-type": "application/json;charset=UTF-8",
          "Authorization": "Bearer " + token,
        },
        method: "GET",
      }).then((res) => {
        if (res.status === 200) {
          return res.json()
        } else {
          throw new Error("授權資訊錯誤!")
        }
      }).then((json) => {
        setLoading(false);
        setLogin(true);
        setUser(json);
        setToken(token)
        setLogin(true);
        localStorage.setItem("user", JSON.stringify(user))
      }).catch((e) => {
        clearInfo()
        alert(e)
        setLoading(false);
      });
    } else {
      setLoading(false);
      setLogin(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        isLogin,
        setLogin,
        user,
        setUser,
        clearInfo,
        token,
        setToken
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
