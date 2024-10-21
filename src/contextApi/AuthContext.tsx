import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
  FC,
} from 'react'
import { getCurrentUser, login, logout } from '../service/authService'
import { User } from '../types/General'

type AuthContextType = {
  user: User | null
  login: (
    username: User['username'],
    password: User['password']
  ) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser || null)
      } catch (error) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const handleLogin = async (username: string, password: string) => {
    try {
      const loggedInUser = await login(username, password)
      setUser(loggedInUser || null)
    } catch (error) {
      setUser(null)
      throw error
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      setUser(null)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login: handleLogin, logout: handleLogout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthProvider
