import { useEffect, useState } from "react";
import ModalContainer from "../components/ModalContainer";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "../components/LoadingButton";
import { createSlide, fetchSlidesByGroup, updateSlide } from "../features/slide/slideSlice";

const SlideModal = ({ isOpen, onClose, groupId, groupName, isEdit = false, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: "", subtitle: "", text: "",
  });
  const dispatch = useDispatch();
  const createStatus = useSelector((state) => state.slide.status.create);
  const updateStatus = useSelector((state) => state.slide.status.update);

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      text: "",
    });
  };

  useEffect(() => {
      if (isEdit && initialData) {
        setFormData({
          title: initialData.title || "",
          subtitle: initialData.subtitle || "",
          text: initialData.text || "",
        });
      } else {
        resetForm();
      }
    }, [isEdit, initialData]);

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
        if (isEdit) {
          await dispatch(updateSlide({ id: initialData.id, data })).unwrap();
        } else {
          await dispatch(createSlide(data)).unwrap();
        }
        resetForm();
        onClose();
        await dispatch(fetchSlidesByGroup({ groupId })).unwrap();
    } catch (error) {
        console.log("Error: ", error);
    }
  }

  return (
    <ModalContainer>
      <h2 className="text-xl font-bold mb-4 text-white text-center">{isEdit ? 'Update' : 'Create'} Slide to ({groupName})</h2>
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
            variant="secondary"
            className="mb-0 mr-2"
          >
            Cancel
          </Button>
          <Button
            className="mb-0" type="submit"
            variant="primary"
            disabled={createStatus === 'loading' || updateStatus === "loading"}
            >
            {createStatus  === "loading" || updateStatus === "loading" ? (
              <LoadingButton />
            ) : isEdit ? (
              "Update"
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
    </ModalContainer>
  );
};

export default SlideModal;