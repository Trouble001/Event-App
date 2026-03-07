import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile, fetchMe } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import AppLayout from "../layouts/AppLayout";
import Input from '../components/Input';
import Button from '../components/Button';


const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Ensure user is not null
  const { user, loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    gender: user?.gender || '',
  });

  useEffect(() => {
    if (!user) {
        dispatch(fetchMe());
    }
  }, [dispatch, user]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await dispatch(editProfile(formData)).unwrap();
    navigate('/profile');
  };

  return (
    <AppLayout>
        <div className="w-full h-screen flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-6/12 px-4 py-4 border border-gray-200 rounded shadow">
        <h2 className="text-2xl mb-4">Edit Profile</h2>
            <Input
                type="text"
                name="full_name"
                value={formData.full_name || ''} // Handle potential undefined
                onChange={handleChange}
                placeholder="Full Name"
            />
            
            <select
                name="gender"
                value={formData.gender || ''}
                onChange={handleChange}
                className='w-full outline text-base outline-gray-200 rounded-md bg-gray-50 mb-4 px-2 py-2 flex items-center justify-center'
            >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            <Button type="submit" disabled={!formData.full_name || !formData.gender}>
                {loading ? "Updating..." : "Update Profile"}
            </Button>
        </form>
        </div>
    </AppLayout>
  );
};

export default EditProfile;
