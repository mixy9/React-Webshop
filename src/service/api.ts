import axios from 'axios'

// Creating an Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = localStorage.getItem('refreshToken')
      if (refreshToken) {
        try {
          const { data } = await axios.post(
            `${process.env.REACT_APP_URL}/auth/refresh`,
            { token: refreshToken }
          )
          localStorage.setItem('accessToken', data.accessToken)
          originalRequest.headers['Authorization'] =
            `Bearer ${data.accessToken}`
          return api(originalRequest)
        } catch (e) {
          console.error('Token refresh failed', e)
        }
      }
    }
    return Promise.reject(error)
  }
)

export default api
