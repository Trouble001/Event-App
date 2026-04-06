import React from 'react'

const TextBox = ({
    type,
    name,
    value,
    onChange,
    placeholder,
    rightIcon,
    onRightIconClick,
    ...rest
}) => {
  return (
    <div className='w-full relative'>
      <textarea
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
        className='w-full glass placeholder-white/70 text-white outline-none focus:ring-2 focus:ring-white/30 mb-4 px-4 py-2 flex items-center'
        ></textarea>
      
    </div>
  )
}

export default TextBox