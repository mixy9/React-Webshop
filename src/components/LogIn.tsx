import React, { ChangeEvent, useState, FocusEvent } from 'react'
import { useAuth } from '../contextApi/AuthContext'
import { useModal } from '../contextApi/ModalContext'
import UiButton from './ui/UiButton'
import { useSnackbar } from '../contextApi/SnackBarContext'
import { AxiosError } from 'axios'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [usernameError, setUsernameError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const { login } = useAuth()
  const { closeModal } = useModal()
  const { showSnackbar } = useSnackbar()

  // triggers when an element loses focus
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.name === 'username' && !username) {
      setUsernameError('Username is required')
    }

    if (e.target.name === 'password' && !password) {
      setPasswordError('Password is required')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username.length || !password.length) {
      if (!username) setUsernameError('Username is required')
      if (!password) setPasswordError('Password is required')
      return
    }

    try {
      await login(username, password)
      closeModal()
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>
      setError(axiosError.response?.data?.message || 'Login failed')
      showSnackbar('Log In failed', 'danger')
    }
  }

  return (
    <div className="px-12 py-10">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img src="/logo.svg" alt="logo" className="mx-auto h-6 w-auto" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form method="POST" className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-left leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
                onBlur={handleBlur}
                required
                autoComplete="username"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
              />
              {usernameError && !username.length && (
                <p className="text-red-600 text-sm mt-1">{usernameError}</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-left leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-cyan-600 hover:text-cyan-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                onBlur={handleBlur}
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
              />
              {passwordError && !password.length && (
                <p className="text-red-600 text-sm mt-1">{passwordError}</p>
              )}
            </div>
          </div>

          <div className="mx-auto w-100">
            <UiButton type="submit" width="full">
              Sign In
            </UiButton>
          </div>
        </form>

        {error && (
          <p className="text-red-600 text-sm mt-4 text-center">{error}</p>
        )}

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <a
            href="#"
            className="font-semibold leading-6 text-cyan-600 hover:text-cyan-500"
          >
            Start a 14 day free trial
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
