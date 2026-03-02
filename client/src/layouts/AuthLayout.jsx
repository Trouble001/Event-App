import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className='w-full h-screen bg-gray-100 flex items-center justify-center'>
        {children}
    </div>
  )
}

export default AuthLayout;