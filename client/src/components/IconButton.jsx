import React from 'react'

const IconButton = ({ onClick, children }) => {
  return (
    <button
        onClick={onClick}
        className="backdrop-blur-md shadow-2xl text-white p-2 text-center rounded-full font-bold flex items-center justify-center"
    >{children}</button>
  )
}

export default IconButton;