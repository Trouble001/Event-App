import React from 'react'

const ModalContainer = ({ children }) => {
  return (
    <div className="w-auto h-full absolute backdrop-blur-md bg-black/10 md:pl-23 inset-0 mx-auto top-0 flex items-center justify-center z-50">
      <div className="glass w-full max-w-md p-6">
        {children}
      </div>
    </div>
  )
}

export default ModalContainer;
