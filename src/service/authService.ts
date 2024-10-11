import api from './api'
import { User } from '../types/General'

type LoginResponse = User & {
  accessToken: string
  refreshToken: string
}

export async function login(
  username: string,
  password: string,
  expiresInMins = 60
): Promise<User | undefined> {
  try {
    const response = await api.post<LoginResponse>('/auth/login', {
      username,
      password,
      expiresInMins,
    })

    const { accessToken, refreshToken, ...user } = response.data

    // save tokens in local storage for this project
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)

    return user
  } catch (error) {
    console.error('Login failed:', error)
    throw error
  }
}

export async function logout(): Promise<void> {
  try {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  } catch (error) {
    console.error('Logout failed:', error)
    throw error
  }
}

export async function getCurrentUser(): Promise<User | undefined> {
  try {
    const response = await api.get<User>('/auth/me')
    return response.data
  } catch (error) {
    console.error('Fetching current user failed:', error)
    throw error
  }
}
