import React from 'react'

const AppLayout = ({children}) => {
  return (
    <div className='w-full overflow-y-scroll no-scrollbar overflow-hidden min-h-screen md:pl-23 pl-3 pr-3 py-3'>
      {children}
    </div>
  )
}

export default AppLayout;