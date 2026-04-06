import { useEffect, useState } from "react";
import ModalContainer from "../components/ModalContainer";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { createSlideGroup, fetchSlideGroups, updateSlideGroup } from "../features/slide/slideSlice";
import LoadingButton from "../components/LoadingButton";
import ImageInput from "../components/ImageInput";
import TextBox from "../components/TextBox";
// import { useNavigate } from "react-router-dom";


const SlideGroupModal = ({ isOpen, onClose, isEdit = false, initialData = null  }) => {
  const [formData, setFormData] = useState({
    name: "", slug: "", description: "", image: null,
  });
  const dispatch = useDispatch();
  const createStatus = useSelector((state) => state.slide.status.create);
  const updateStatus = useSelector((state) => state.slide.status.update);

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      image: null,
    });
  };

  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        name: initialData.name || "",
        slug: initialData.slug || "",
        description: initialData.description || "",
        image: null, // file can't be pre-filled
      });
    } else {
      resetForm();
    }
  }, [isEdit, initialData]);


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

    try {
      if (isEdit) {
        await dispatch(updateSlideGroup({ id: initialData.id, data })).unwrap();
      } else {
        await dispatch(createSlideGroup(data)).unwrap();
      }
      resetForm();
      onClose();
      await dispatch(fetchSlideGroups()).unwrap();
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <ModalContainer>
      <h2 className="text-xl font-bold mb-4 text-white text-center">{isEdit ? "Update" : "Create"} Slide Group</h2>
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
          <TextBox
            type="text"
            name="description"
            placeholder="Write description about group..."
            value={formData.description}
            onChange={handleChange}
            required
          />
          <ImageInput
            name="image"
            onChange={handleChange}
            image={formData?.image}
            isEdit={isEdit}
            initialImage={initialData?.image_url}
          />
         
          <div className="flex flex-row items-center justify-between mb-0">
            <Button
              type="button"
              onClick={() => {
                onClose(), resetForm()
              }}
              variant="secondary"
              className="mb-0 mr-2"
            >
              Cancel
            </Button>
            <Button
              className="mb-0" variant="primary" type="submit"
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

export default SlideGroupModal;