import React, { Dispatch, SetStateAction, FC } from 'react'
import { Transition } from '@headlessui/react'
import { SnackbarType } from '../../contextApi/SnackBarContext'
import {
  InformationCircleIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'

type UiSnackbarProps = {
  message: string
  type: SnackbarType
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const UiSnackbar: FC<UiSnackbarProps> = ({
  message,
  type = 'success',
  isOpen,
}: UiSnackbarProps) => {
  const typeStyles: Record<SnackbarType, string> = {
    success: 'text-green-700',
    danger: 'text-red-700',
    warning: 'text-yellow-700',
    info: 'text-blue-700',
  }

  return (
    <div className="fixed bottom-4 right-4 max-w-sm w-full z-50">
      <Transition
        show={isOpen}
        enter="transition ease-out duration-300 absolute top-0 right-0"
        enterFrom="opacity-0 translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-2"
      >
        <div
          className={`flex items-center p-4 rounded-lg shadow-md bg-white ${typeStyles[type]}`}
        >
          <div className="flex-1 flex gap-2 items-center">
            {type === 'success' && (
              <CheckBadgeIcon aria-hidden="true" className="h-6 w-6" />
            )}
            {type === 'danger' && (
              <XCircleIcon aria-hidden="true" className="h-6 w-6" />
            )}
            {type === 'warning' && (
              <InformationCircleIcon aria-hidden="true" className="h-6 w-6" />
            )}
            {type === 'info' && (
              <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6" />
            )}
            <p className="text-sm font-medium">{message}</p>
          </div>
        </div>
      </Transition>
    </div>
  )
}

export default UiSnackbar
