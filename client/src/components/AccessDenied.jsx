import React from 'react'
import AppLayout from '../layouts/AppLayout'

const AccessDenied = () => {
  return (
    <AppLayout>
      <div className='w-full mx-auto max-w-lg glass flex flex-col items-center justify-center p-6'>
        <h1 className='text-3xl font-semibold text-rose-400'>Access <span className='text-white'>Denied</span></h1>
        <p className='text-white/80'>You don't have permission to perform this action.</p>
      </div>
    </AppLayout>
  )
}

export default AccessDenied
