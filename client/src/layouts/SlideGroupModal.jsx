import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { createSlideGroup, fetchSlideGroups } from "../features/slide/slideSlice";
import LoadingButton from "../components/LoadingButton";
import ImageInput from "../components/ImageInput";
// import { useNavigate } from "react-router-dom";


const SlideGroupModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "", slug: "", description: "", image: null,
  });

  const dispatch = useDispatch();
  const createStatus = useSelector((state) => state.slide.status.create);

  // const navigate = useNavigate();

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("name", formData.name);
    data.append("slug", formData.slug);
    data.append("description", formData.description);

    if (formData.image instanceof File) {
      data.append("image", formData.image);
    }

    for (let pair of data.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      await dispatch(createSlideGroup(data)).unwrap();
      await dispatch(fetchSlideGroups()).unwrap();
      setFormData({ name: "", slug: "", description: "", image: null });
      onClose();
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="w-auto h-full absolute bg-black/40 md:pl-23 inset-0 bg-red/60 mx-auto top-0 flex items-center justify-center z-50">
      <div className="glass w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4 text-white">Add Slide Group</h2>
        <form onSubmit={handleSubmit} className="">
          <Input
            type="text"
            name="name"
            placeholder="Group Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="slug"
            placeholder="Slug"
            value={formData.slug}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <ImageInput name="image" onChange={handleChange} image={formData?.image} />
          {/* <input
            type="file"
            name="image"
            onChange={handleChange}
          /> */}
          <div className="flex flex-row items-center justify-between mb-0">
            <Button
              type="button"
              onClick={onClose}
              className="bg-white/30 mb-0 mr-2"
            >
              Cancel
            </Button>
            <Button
              className="mb-0" type="submit"
              disabled={createStatus === 'loading'}
              >
              {createStatus === 'loading' ? (<LoadingButton />) : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SlideGroupModal;