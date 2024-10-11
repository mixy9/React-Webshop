import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../contextApi/AuthContext'

const UserInfoDropdown = () => {
  const { user, logout } = useAuth()

  return (
    user && (
      <Menu
        as="div"
        className="relative inline-block text-left h-6 w-6 text-gray-500 hover:text-cyan-600"
      >
        <MenuButton>
          <UserCircleIcon
            aria-hidden="true"
            className="h-6 w-6 text-gray-500 hover:text-cyan-600 mx-4"
          />
        </MenuButton>

        <MenuItems className="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-4 px-4">
            <div className="flex items-center">
              <img
                src={user.image}
                alt="User avatar"
                className="h-10 w-10 rounded-full"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
            </div>
            <div className="mt-4">
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={logout}
                    className={`block w-full text-left px-4 py-2 text-sm font-medium rounded-md ${
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    }`}
                  >
                    Log out
                  </button>
                )}
              </MenuItem>
            </div>
          </div>
        </MenuItems>
      </Menu>
    )
  )
}

export default UserInfoDropdown
