import { FC, ReactNode } from 'react'

type UiButtonProps = {
  children: ReactNode
  width?: 'auto' | 'full'
  type?: 'button' | 'submit' | 'reset'
  isDisabled?: boolean
  clickEvent?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

// UI component developed for the purposes of this project
const UiButton: FC<UiButtonProps> = ({
  children,
  width = 'auto',
  type = 'button',
  isDisabled = false,
  clickEvent,
}: UiButtonProps) => (
  <button
    onClick={clickEvent}
    type={type}
    disabled={isDisabled}
    className={`text-md w-${width} rounded-md bg-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:pointer-events-none disabled:opacity-50`}
  >
    {children}
  </button>
)

export default UiButton
