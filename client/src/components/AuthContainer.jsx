import React from 'react'

const AuthContainer = ({children}) => {
  return (
    <div className="glass w-full md:w-10/12 lg:w-6/12 xl:w-5/12 py-8 flex items-center justify-center flex-col">
        {children}
    </div>
  )
}

export default AuthContainer;
