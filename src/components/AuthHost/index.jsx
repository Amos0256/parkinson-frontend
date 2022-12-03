import { AuthContext } from 'hooks/useAuth'
import { useEffect, useState } from 'react'
import api from 'utils/api'

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
    setLoading(true)
    const token = localStorage.getItem('token')
    if (token && loading) {
      api('user-info', 'GET')
        .then((json) => {
          setLoading(false)
          setLogin(true)
          setUser(json)
          setToken(token)
          setLogin(true)
          localStorage.setItem('user', JSON.stringify(user))
        })
        .catch((e) => {
          clearInfo()
          alert(e)
          setLoading(false)
          setLogin(false)
        })
    } else {
      setLoading(false)
      setLogin(false)
    }
  }, [])

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
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
