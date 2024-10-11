import React, { FC, Fragment } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react'
import { useModal } from '../../contextApi/ModalContext'
import { XMarkIcon } from '@heroicons/react/24/outline'

type Props = {
  title?: string | null
  position?: 'center' | 'right' | 'left'
}

const positionClasses = {
  center:
    'flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0',
  right: 'absolute inset-y-0 right-0 flex max-w-full pl-10 max-h-screen',
  left: 'absolute inset-y-0 left-0 flex max-w-full pr-10 max-h-screen',
}

const UiModal: FC<Props> = ({ title, position = 'center' }: Props) => {
  const { isOpen, modalContent, closeModal } = useModal()

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-20 overflow-y-auto">
          <div className={positionClasses[position]}>
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-out duration-500"
              enterFrom={
                position === 'center'
                  ? 'opacity-0 scale-95'
                  : position === 'right'
                    ? 'translate-x-full'
                    : '-translate-x-full'
              }
              enterTo="opacity-100 scale-100 translate-x-0"
              leave="transform transition ease-in duration-500"
              leaveFrom="opacity-100 scale-100 translate-x-0"
              leaveTo={
                position === 'center'
                  ? 'opacity-0 scale-95'
                  : position === 'right'
                    ? 'translate-x-full'
                    : '-translate-x-full'
              }
            >
              <DialogPanel
                className={`relative bg-white text-left shadow-xl transition-all ${
                  position === 'center'
                    ? 'rounded-lg max-w-lg sm:my-8 lg:max-w-4xl'
                    : 'w-screen max-w-md'
                }`}
              >
                <div className="relative bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-xl">
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
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default UiModal
