import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className='w-full h-screen fixed md:pl-22 pl-2 pr-2 pt-16 md:pt-0 bg-gray-100 flex flex-col items-center justify-start md:justify-center-safe'>
      {children}
    </div>
  )
}

export default AuthLayout;