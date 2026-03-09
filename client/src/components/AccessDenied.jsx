import React from 'react'
import AppLayout from '../layouts/AppLayout'

const AccessDenied = () => {
  return (
    <AppLayout>
      <div className='h-full flex flex-col items-center justify-center'>
        <h1 className='text-3xl font-semibold text-rose-500'>Access <span className='text-gray-900'>Denied</span></h1>
        <p className='text-gray-700'>You don't have permission to perform this action.</p>
      </div>
    </AppLayout>
  )
}

export default AccessDenied
