import React from 'react'

const AuthContainer = ({children}) => {
  return (
    <div className="glass w-full max-w-lg py-8 flex items-center justify-center flex-col">
        {children}
    </div>
  )
}

export default AuthContainer;
