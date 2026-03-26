import React, { useEffect, useMemo } from "react";

const ImageInput = ({ name, onChange, image, isEdit, initialImage }) => {

  const preview = useMemo(() => {
    if (image instanceof File) return URL.createObjectURL(image);
    if (image) return image;

    if (initialImage instanceof File) return URL.createObjectURL(initialImage);
    if (initialImage) return initialImage;

    return null;
  }, [image, initialImage]);

  useEffect(() => {
    return () => {
      if (image instanceof File) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [image, preview]);

  const inputId = `fileInput-${name}`;

  return (
    <div>
      <label className="block text-white mb-2 text-sm">
        {isEdit ? "Edit Image" : "Add Image"}
      </label>

      <div
        className="w-full h-36 relative flex flex-col items-center justify-center border-2 border-dashed glass cursor-pointer hover:border-cyan-400 transition mb-4"
        onClick={() => document.getElementById(inputId).click()}
      >
        <input
          id={inputId}
          type="file"
          name={name}
          accept="image/*"
          onChange={onChange}
          className="hidden"
        />

        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="w-full h-full object-cover rounded-3xl"
          />
        ) : (
          <p className="text-white/70 text-sm">
            Click to add image here
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageInput;