import React from 'react'

const ImageInput = ({ name, onChange, image }) => {

  const getImagePreview = (image) => {
    if (!image) return null;

    if (image instanceof File) {
      return URL.createObjectURL(image);
    }
    return image;
  }

  return (
    <div>
      <label className='block text-white mb-2 text-sm'>Add Image</label>
      <div className='w-full h-36 relative flex flex-col items-center justify-center border-2 border-dashed glass cursor-pointer hover:border-cyan-400 transition mb-4'
            onClick={() => document.getElementById("fileInput").click()}
      >
        <input
          id='fileInput'
          type='file'
          name={name}
          accept='image/*'
          onChange={onChange}
          className='hidden'
        />

        {getImagePreview(image) ? (
          <img
            src={getImagePreview(image)}
            alt='preview'
            className='w-full h-full object-cover rounded-3xl'
          />
        ) : (
          <>
          <p className='text-white/70 text-sm'>Click to add image here</p>
          </>
        )}
      </div>
    </div>
  )
}

export default ImageInput;
