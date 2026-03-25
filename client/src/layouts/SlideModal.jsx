import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
// import { createSlideGroup } from "../features/slide/slideSlice";
import LoadingButton from "../components/LoadingButton";
import { createSlide, fetchSlidesByGroup } from "../features/slide/slideSlice";
// import { createSlide } from "../features/slide/slideSlice";
// import { useNavigate } from "react-router-dom";


const SlideModal = ({ isOpen, onClose, groupId, groupName }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");


  if (!isOpen) return null;

  const handleSubmit = async (e) => {
   e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", text);
    formData.append("group", groupId);

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
        await dispatch(createSlide(formData)).unwrap();
        await dispatch(fetchSlidesByGroup({ groupId })).unwrap();
        setTitle(""),
        setText("");
        onClose();
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Input
            type="text"
            name="text"
            placeholder="Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
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