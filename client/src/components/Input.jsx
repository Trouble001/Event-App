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
        className='w-full outline text-base text-gray-800 outline-gray-200 rounded-md bg-gray-50 mb-4 px-4 py-2
         flex items-center'
    />
      {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
          >
            {rightIcon}
          </button>
        )}
    </div>
  )
}

export default Input;
