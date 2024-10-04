import React from 'react'
import { Link } from 'react-router-dom'

export default function Homepage() {
  return (
    <div className="mx-auto max-w-2xl flex flex-col items-center justify-center h-screen min-h-screen m-auto">
      <div className="hidden sm:mb-8 sm:flex sm:justify-center">
        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
          Nullam vulputate est vel risus dictum semper id ac nulla
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Lorem ipsum dolor sit amet
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
          cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat
          aliqua.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-cyan-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-600
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
          >
            Log In
          </Link>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Products <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  )
}