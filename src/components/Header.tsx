import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useModal } from '../contextApi/ModalContext'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import Login from './LogIn'
import { useAuth } from '../contextApi/AuthContext'
import UiButton from './ui/UiButton'
import UserInfoDropdown from './UserInfoDropdown'
import CartQuickView from './cart/CartQuickView'

const navigation = [
  { name: 'Products', route: '/products' },
  { name: 'Shopping Cart', route: '#' },
  { name: 'User Profile', route: '#' },
]

export default function Header() {
  const { openModal } = useModal()
  const location = useLocation()

  const { user } = useAuth()

  const isHomepage = location.pathname === '/'

  function openLoginModal() {
    openModal(<Login />, '', 'center')
  }

  function openCartPreview() {
    openModal(<CartQuickView />, 'Cart', 'right')
  }

  return (
    <header className="sticky top-0 z-20 hover:bg-opacity-100 bg-white bg-opacity-80 transition-all">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8 border-b border-gray-200"
      >
        <div className={`${isHomepage ? 'flex flex-1' : 'flex'}`}>
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              src={isHomepage ? '/logo.svg' : '/logo-icon.svg'}
              alt="logo"
              className="h-8 w-auto"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.route}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end divide-x">
          {user ? (
            <>
              <button type="button" onClick={openCartPreview}>
                <ShoppingCartIcon
                  aria-hidden="true"
                  className="h-6 w-6 text-gray-500 hover:text-cyan-600 mx-4"
                />
              </button>
              <UserInfoDropdown />
            </>
          ) : (
            <UiButton clickEvent={openLoginModal}>Log In</UiButton>
          )}
        </div>
      </nav>
    </header>
  )
}
