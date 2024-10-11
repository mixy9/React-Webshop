import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  FC,
} from 'react'
import UiSnackbar from '../components/ui/UiSnackBar'

export type SnackbarType = 'success' | 'danger' | 'warning' | 'info'

interface SnackbarContextProps {
  isOpen: boolean
  message: string
  type: SnackbarType
  showSnackbar: (message: string, type?: SnackbarType) => void
  closeSnackbar: () => void
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(
  undefined
)

export const SnackbarProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [type, setType] = useState<SnackbarType>('success')

  const showSnackbar = (
    msg: string,
    snackbarType: SnackbarType = 'success'
  ) => {
    setMessage(msg)
    setType(snackbarType)
    setIsOpen(true)

    // Auto close the snackbar after 3 seconds
    setTimeout(() => {
      setIsOpen(false)
    }, 3000)
  }

  const closeSnackbar = () => {
    setIsOpen(false)
  }

  return (
    <SnackbarContext.Provider
      value={{ isOpen, message, type, showSnackbar, closeSnackbar }}
    >
      {children}
      {isOpen && (
        <UiSnackbar
          message={message}
          type={type}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </SnackbarContext.Provider>
  )
}

export const useSnackbar = (): SnackbarContextProps => {
  const context = useContext(SnackbarContext)
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider')
  }
  return context
}
