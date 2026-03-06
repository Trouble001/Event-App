import React from 'react'

const AppLayout = ({children}) => {
  return (
    <div className='w-full h-screen py-4 px-4 md:pl-24'>
        {children}
    </div>
  )
}

export default AppLayout;