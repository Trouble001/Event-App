import React from 'react';
import { twMerge } from "tailwind-merge";


const LiquidGlass = ({ className, children }) => {
  return (
    <div className={twMerge(
      "bg-linear-to-tr from-transparent via-black/5 to-transparent backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl ring-1 ring-white/10",
      className
    )}>
      {children}
    </div>
  )
}

export default LiquidGlass;