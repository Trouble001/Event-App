import { useEffect, useState } from "react";
import ModalContainer from "../components/ModalContainer";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "../components/LoadingButton";
import { editProfile } from "../features/auth/authSlice";


const EditProfileModal = ({ isOpen, onClose, initialData }) => {

  const [formData, setFormData] = useState({
    full_name: "",
    gender: "",
  });

  const dispatch = useDispatch();
  const editStatus = useSelector((state) => state.auth.status.edit);

  const resetForm = () => {
    setFormData({
        full_name: "",
        gender: "",
    });
  };

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        full_name: initialData.full_name || "",
        gender: initialData.gender || "",
    });
    }
  }, [isOpen, initialData]);


  if (!isOpen) return null;

//   Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name] : value,
    });
  };

  const handleSubmit = async (e) => {
   e.preventDefault();
   console.log(formData);
   
  try {
    await dispatch(editProfile(formData)).unwrap();
    resetForm();
    onClose();
    } catch (error) {
        console.log("Error: ", error);
    }
  };


  return (
    <ModalContainer>
      <h2 className="text-xl font-bold mb-4 text-white text-center">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="">
          <Input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className='w-full glass placeholder-white/70 text-white outline-none focus:ring-2 focus:ring-white/30 appearance-none mb-4 px-4 py-2 flex items-center'
          >
          <option className="text-black" value="">Select Gender</option>
          <option className="text-black" value="male">Male</option>
          <option className="text-black" value="female">Female</option>
          <option className="text-black" value="other">Other</option>
          </select>

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
            variant="primary"
            disabled={editStatus === "loading"}
            className="mb-0" type="submit"
            >
              {editStatus === "loading" ? <LoadingButton /> : "Save"}
            </Button>
          </div>
          
        </form>
    </ModalContainer>
  );
};

export default EditProfileModal;