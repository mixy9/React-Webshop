import React, { FC } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { useModal } from '../../ModalContext'
import { XMarkIcon } from '@heroicons/react/24/outline'

type Props = {
  title?: string | null
  position?: 'center' | 'right' | 'left'
}

const positionClasses = {
  center:
    'flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0',
  right: 'absolute inset-y-0 right-0 flex max-w-full pl-10',
  left: 'absolute inset-y-0 left-0 flex max-w-full pr-10',
}

const UiModal: FC<Props> = ({ title, position = 'center' }: Props) => {
  const { isOpen, modalContent, closeModal } = useModal()

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-30">
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out" />

      <div className="fixed inset-0 z-20 overflow-y-auto">
        <div className={positionClasses[position]}>
          <DialogPanel
            className={`relative transform overflow-hidden bg-white text-left shadow-xl transition-all ${
              position === 'center'
                ? 'rounded-lg max-w-lg sm:my-8 lg:max-w-4xl'
                : 'w-screen max-w-md'
            }`}
          >
            <div className="relative bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-6 sm:right-6"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  {title && (
                    <DialogTitle
                      as="h2"
                      className="text-2xl font-bold text-gray-900 sm:pr-12"
                    >
                      {title}
                    </DialogTitle>
                  )}
                  <div className="mt-2">{modalContent}</div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default UiModal
