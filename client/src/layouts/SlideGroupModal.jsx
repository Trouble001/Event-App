import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { createSlideGroup } from "../features/slide/slideSlice";
// import { useNavigate } from "react-router-dom";


const SlideGroupModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "", slug: "", description: "",
  });
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(createSlideGroup(formData)).unwrap();
      setFormData({ name: "", slug: "", description: "" });
      onClose();
      // navigate("/slide-groups");
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
          <div className="flex flex-row items-center justify-between mb-0">
            <Button
              type="button"
              onClick={onClose}
              className="bg-white/30 mb-0 mr-2"
            >
              Cancel
            </Button>
            <Button className="mb-0" type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SlideGroupModal;