import { AuthContext } from 'hooks/useAuth'
import { useState } from 'react'

export default function AuthHost({ children }) {
  const [loading, setLoading] = useState(true)
  const [isLogin, setLogin] = useState(false)
  const [user, setUser] = useState({})

  function clearInfo() {
    setLoading(false)
    setLogin(false)
    setUser(true)
  }

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
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
