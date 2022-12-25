import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "utils/api";

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
  token: null,
  setToken: anonymous,
});

export default function useAuth() {
  const {
    loading,
    setLoading,
    isLogin,
    setLogin,
    clearInfo,
    user,
    setUser,
    token,
    setToken,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  function logout() {
    setLoading(true);
    api("logout", "POST").then((res) => {
      clearInfo();
      navigate("/login");
    });
  }

  function login(username, password) {
    setLoading(true);
    return api("login", "POST", {
      personal_id: username,
      password,
    })
      .then(({ user, token }) => {
        if(!user) throw new Error("登入失敗")
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        setUser(user);
        setToken(token);
        setLoading(false);
        setLogin(true);
        switch (user.roles[0].id) {
          case 1:
            navigate("/doctor");
            break;
          case 2:
            navigate("/patient");
            break;
          default:
            alert("發生嚴重錯誤");
        }
      })
      .catch((e) => {
        alert(e);
      });
  }

  return { loading, isLogin, login, logout, user };
}
