import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from 'react'
import {
  login as loginService,
  logout as logoutService,
  getCurrentUser,
} from '../service/authService'
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

type Props = {
  children: ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: FC<Props> = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('accessToken')
      if (token) {
        try {
          const userData = await getCurrentUser()
          setUser(userData)
        } catch (error) {
          console.log('User fetching failed after page refresh')
        }
      }
      setLoading(false)
    }

    checkUser()
  }, [])

  const login = async (
    username: User['username'],
    password: User['password']
  ) => {
    setLoading(true)
    try {
      await loginService(username, password)
      const userData = await getCurrentUser()
      setUser(userData)
    } catch (error) {
      console.error('Login failed', error)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    logoutService()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
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