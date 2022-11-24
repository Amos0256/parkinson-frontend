import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const anonymous = () => null;

const def = {
  id: 1,
  name: "Doctor",
  email: "doctor@parkinson.com.tw",
  gender: "male",
  birthday: "2000-01-01",
  personal_id: "A123456789",
  phone: "0987654321",
  email_verified_at: null,
  two_factor_secret: null,
  two_factor_recovery_codes: null,
  doctor_id: null,
  created_at: "2022-11-12T10:20:36.000000Z",
  updated_at: "2022-11-12T10:20:36.000000Z",
  roles: [
    {
      id: 1,
      name: "doctor",
      guard_name: "web",
      created_at: "2022-11-22T01:33:27.000000Z",
      updated_at: "2022-11-22T01:33:27.000000Z",
      pivot: {
        model_id: 1,
        role_id: 1,
        model_type: "App\\Models\\User",
      },
    },
  ],
};

export const AuthContext = createContext({
  loading: true,
  setLoading: anonymous,
  isLogin: false,
  setLogin: anonymous,
  user: def,
  setUser: anonymous,
  clearInfo: anonymous,
});

export default function useAuth() {
  const { loading, setLoading, isLogin, setLogin, clearInfo, user, setUser } =
    useContext(AuthContext);
  const navigate = useNavigate();

  function logout() {
    setLoading(true);
    fetch("http://140.123.242.78/logout", {
      credentials: "include",
      headers: {
        accept: "application/json",
        authorization: "Bearer",
        "content-type": "application/json;charset=UTF-8",
        "x-csrf-token": "",
      },
      method: "POST",
    }).then((res) => {
      clearInfo();
      navigate("/login");
    });
  }

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setLoading(false);
      setLogin(true);
      setUser(JSON.parse(user));
    } else {
      setLoading(false);
      setLogin(true);
    }
  }, []);

  function login(username, password) {
    setLoading(true);
    return new Promise((resolve, reject) => {
      fetch("http://140.123.242.78/login", {
        credentials: "include",
        headers: {
          accept: "application/json",
          "content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          personal_id: username,
          password,
        }),
        method: "POST",
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw new Error(
              "帳號/密碼錯誤或重複登入(後者的話按一下忘記密碼，可登出)"
            );
          }
        })
        .then((body) => {
          console.log(body);
          localStorage.setItem("user", JSON.stringify(body))
          setUser(body);
          setLoading(false);
          setLogin(true);
          switch (body.roles[0].id) {
            case 1:
              alert("醫師[這只是提示/不是feature]");
              navigate("/doctor");
              break;
            case 2:
              alert("病患[這只是提示/不是feature]");
              navigate("/patient");
              break;
            default:
              alert("出事了");
          }
        })
        .catch((e) => {
          alert(e);
        });
    });
  }

  return { loading, isLogin, login, logout, user };
}
