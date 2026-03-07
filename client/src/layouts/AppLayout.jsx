import React from 'react'

const AppLayout = ({children}) => {
  return (
    <div className='w-full h-screen md:pl-20 py-4'>
        {children}
    </div>
  )
}

export default AppLayout;