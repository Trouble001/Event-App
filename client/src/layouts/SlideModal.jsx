import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import LoadingButton from "../components/LoadingButton";
import { createSlide, fetchSlidesByGroup } from "../features/slide/slideSlice";


const SlideModal = ({ isOpen, onClose, groupId, groupName, isEdit = false, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: "", subtitle: "", text: "",
  });
  const dispatch = useDispatch();

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      text: "",
    });
  };

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name] : value,
    });
  };

  const handleSubmit = async (e) => {
   e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("subtitle", formData.subtitle);
    data.append("text", formData.text);
    data.append("group", groupId);

    try {
        await dispatch(createSlide(data)).unwrap();
        resetForm();
        onClose();
        await dispatch(fetchSlidesByGroup({ groupId })).unwrap();
    } catch (error) {
        console.log("Error: ", error);
    }
  }

  return (
    <div className="w-auto h-full absolute bg-black/40 md:pl-23 inset-0 bg-red/60 mx-auto top-0 flex items-center justify-center z-50">
      <div className="glass w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4 text-white">Add Slide to ({groupName})</h2>
        <form onSubmit={handleSubmit} className="">
          <Input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="subtitle"
            placeholder="Sub Title"
            value={formData.subtitle}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="text"
            placeholder="Text"
            value={formData.text}
            onChange={handleChange}
            required
          />
        
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
              > Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SlideModal;