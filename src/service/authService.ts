import api from './api'

export async function login(username: string, password: string) {
  try {
    const { data } = await api.post('/auth/login', { username, password })
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)
    return data
  } catch (error) {
    console.error('Login failed', error)
    throw error
  }
}

export async function getCurrentUser() {
  try {
    const { data } = await api.get('/users')
    return data
  } catch (error) {
    console.error('Fetching current user failed', error)
    throw error
  }
}

export function logout() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}
