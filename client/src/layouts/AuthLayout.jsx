import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className='w-full h-screen md:pl-20 bg-gray-100 flex items-center justify-center'>
        {children}
    </div>
  )
}

export default AuthLayout;