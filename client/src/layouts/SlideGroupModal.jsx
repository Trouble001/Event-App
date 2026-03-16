import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { createSlideGroup } from "../features/slide/slideSlice";


const SlideGroupModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "", slug: "", description: "",
  });
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createSlideGroup(formData)).unwrap();
    setFormData({ name: "", slug: "", description: "" });
    console.log(formData);
    onClose();
  }


  return (
    <div className="w-auto h-full absolute md:pl-23 inset-0 mx-auto top-0 flex items-center justify-center z-50">
      <div className="backdrop-blur-md bg-white/20 border border-white/30 shadow-xl rounded-2xl w-full max-w-md p-4">
        <h2 className="text-xl font-bold mb-4 text-white">Add Slide Group</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              onClick={onClose}
              className="bg-white/30"
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SlideGroupModal;