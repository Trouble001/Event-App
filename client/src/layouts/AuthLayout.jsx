import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className='w-full h-screen fixed md:pl-23 pl-3 pr-3 pt-16 md:pt-0 bg-transparent flex flex-col items-center justify-start md:justify-center-safe'>
      {children}
    </div>
  )
}

export default AuthLayout;