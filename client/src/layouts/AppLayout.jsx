import React from 'react'

const AppLayout = ({children}) => {
  return (
    <div className='w-full fixed h-screen md:pl-22 pl-2 pr-2 py-2'>
      {children}
    </div>
  )
}

export default AppLayout;