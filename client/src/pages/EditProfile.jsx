import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile, fetchMe } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
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

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        gender: user.gender || '',
      });
    }
  }, [user]);


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
        <form onSubmit={handleSubmit} className="w-6/12 glass p-6">
        <h2 className="text-2xl text-white mb-4 text-center">Edit Profile</h2>
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
                className='w-full glass placeholder-white/70 text-white outline-none focus:ring-2 focus:ring-white/30 appearance-none mb-4 px-4 py-2 flex items-center'
            >
                <option className="text-black" value="">Select Gender</option>
                <option className="text-black" value="male">Male</option>
                <option className="text-black" value="female">Female</option>
                <option className="text-black" value="other">Other</option>
            </select>
            <Button type="submit" disabled={!formData.full_name || !formData.gender}>
                {loading ? "Updating..." : "Update Profile"}
            </Button>
            <div className="w-full flex items-center justify-center text-white/80 hover:text-white text-md mt-0"><Link to="/profile">Cancel</Link></div>
        </form>
      </div>
    </AppLayout>
  );
};

export default EditProfile;
