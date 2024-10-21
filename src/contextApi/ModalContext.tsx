import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  FC,
} from 'react'
import UiModal from '../components/ui/UiModal'

type ModalContextProps = {
  isOpen: boolean
  modalContent: ReactNode | null
  modalTitle: string | null
  modalPosition: 'center' | 'right' | 'left'
  openModal: (
    content: ReactNode,
    title?: string,
    position?: 'center' | 'right' | 'left'
  ) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined)

const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string | null>(null)
  const [modalPosition, setModalPosition] = useState<
    'center' | 'right' | 'left'
  >('center')

  const openModal = (
    content: ReactNode,
    title = '',
    position: 'center' | 'right' | 'left' = 'center'
  ) => {
    setModalContent(content)
    setModalTitle(title)
    setModalPosition(position)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setModalContent(null)
    setModalTitle(null)
    setModalPosition('center')
  }

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        modalContent,
        modalTitle,
        modalPosition,
        openModal,
        closeModal,
      }}
    >
      {children}
      {isOpen && <UiModal title={modalTitle} position={modalPosition} />}
    </ModalContext.Provider>
  )
}

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

export default ModalProvider
