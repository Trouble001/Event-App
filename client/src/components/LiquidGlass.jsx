import React from 'react';
import { twMerge } from "tailwind-merge";


const LiquidGlass = ({ className, children }) => {
  return (
    <div className={twMerge(
      "bg-linear-to-tr from-transparent via-cyan-900 to-transparent backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl ring-1 ring-white/10",
      className
    )}>
      {children}
    </div>
  )
}

export default LiquidGlass;