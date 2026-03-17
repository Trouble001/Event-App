import React from 'react'

const Input = ({
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
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
        className='w-full glass placeholder-white/70 text-white outline-none focus:ring-2 focus:ring-white/30 mb-4 px-4 py-2 flex items-center'
    />
      {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
          >
            {rightIcon}
          </button>
        )}
    </div>
  )
}

export default Input;
