import React from 'react'
import AppLayout from '../layouts/AppLayout'

const Setting = () => {
  return (
    <AppLayout>
      <div className="
      relative
      h-screen
    bg-white/10
      backdrop-blur-xl
      backdrop-saturate-150
      border border-white/20
      rounded-2xl
      shadow-[0_8px_32px_rgba(0,0,0,0.3)]
      overflow-hidden
    ">
    <div className="
      absolute inset-0
      bg-linear-to-br
      from-transparent
      via-white/10
      to-transparent
      pointer-events-none
    " />
  
      Settings
    </div>
    </AppLayout>
  )
}

export default Setting
