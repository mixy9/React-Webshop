import React, { FC } from 'react'

const LoadingSpinner: FC = () => (
  <div className="h-screen w-screen flex justify-center items-center">
    <img
      src="/logo.svg"
      alt="Logo"
      width={200}
      height={200}
      className="animate-pulse duration-800"
    />
  </div>
)

export default LoadingSpinner
