import { createContext, useContext } from "react"
import { useNavigate } from "react-router-dom";

const anonymous = () => null

export const AuthContext = createContext({
    loading: true, setLoading: anonymous,
    isLogin: false, setLogin: anonymous,
    user: { token: "", name: "", avatar: "" }, setUser: anonymous,
    clearInfo: anonymous
})

export default function useAuth() {
    const { loading, setLoad, isLogin, setLogin, clearInfo, user, setUser } = useContext(AuthContext)
    const navigate = useNavigate()

    function logout() {
        clearInfo();
        navigate("/login")
    }

    function login(username, password) {
        setLoad(true)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                switch (username) {
                    case "doctor":
                        setLogin(true)
                        setUser({
                            name: "王醫師",
                            avatar: "https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?w=2000",
                            token: password
                        })
                        setLoad(false)
                        break
                    case "patient":
                        setLogin(true)
                        setUser({
                            name: "王小明",
                            avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                            token: password
                        })
                        setLoad(false)
                        break
                    default:
                        reject("error")
                }
            }, 2000)
        })
    }

    return { loading, isLogin, login, logout, user }
}