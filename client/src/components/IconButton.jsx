import React from 'react'
import { twMerge } from 'tailwind-merge'

const IconButton = ({ onClick, children, className = "" }) => {
  return (
    <button
        onClick={onClick}
        className={twMerge(
          "text-white/80 border border-white/30 rounded-3xl px-3 py-1.5 gap-2 text-center flex items-center justify-center cursor-pointer",
        className
      )}
    >{children}</button>
  )
}

export default IconButton;