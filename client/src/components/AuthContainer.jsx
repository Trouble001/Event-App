import React from 'react'

const AuthContainer = ({children}) => {
  return (
    <div className="w-full md:w-10/12 lg:w-6/12 xl:w-5/12 backdrop-blur-md bg-white/20 border border-white/30 shadow-xl rounded-2xl py-8 flex items-center justify-center flex-col">
        {children}
    </div>
  )
}

export default AuthContainer;
