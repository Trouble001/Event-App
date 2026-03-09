import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../features/admin/adminSlice';
import AppLayout from '../layouts/AppLayout';
import AccessDenied from '../components/AccessDenied';

const Dasboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { users, loading } = useSelector((state) => state.admin);

useEffect(() => {
  dispatch(fetchUsers());
}, [dispatch]);

useEffect(() => {
  console.log(user);
}, [user]);

if (loading) return <p>Loading...</p>;


if (!user?.is_staff && !user?.is_superuser) return <AccessDenied />;

  return (
    <AppLayout>
      <h1>Dashboard</h1>
      <table className='w-full text-sm border border-gray-200 text-left'>
        <thead className='text-gray-800'>
          <tr className=''>
            <th className='pl-2 py-2 border-r border-gray-200'>ID</th>
            <th className='pl-2 py-2 border-r border-gray-200'>NAME</th>
            <th className='pl-2 py-2 border-r border-gray-200 hidden lg:block'>GENDER</th>
            <th className='pl-2 py-2 border-r border-gray-200'>PHONE</th>
            <th className='pl-2 py-2 border-r border-gray-200 hidden lg:block'>EMAIL</th>
            <th className='pl-2 py-2 border-r border-gray-200'>ACTIVE</th>
            <th className='pl-2 py-2 border-r border-gray-200'>STAFF</th>
            <th className='pl-2 py-2 border-r border-gray-200'>ADMIN</th>
            <th className='pl-2 py-2'>ACTION</th>

          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className='border border-gray-200 text-gray-800'>
              <td className='pl-2 py-2 border-r border-gray-200'>{user.id}</td>
              <td className='pl-2 py-2 border-r border-gray-200'>{user.full_name}</td>
              <td className='pl-2 py-2 border-r border-gray-200 hidden lg:block'>{user.gender}</td>
              <td className='pl-2 py-2 border-r border-gray-200'>{user.phone_number}</td>
              <td className='pl-2 py-2 border-r border-gray-200 hidden lg:block'>{user.email}</td>
              <td className='pl-2 py-2 border-r border-gray-200'>{user.is_active ? "Active": "Inactive"}</td>
              <td className='pl-2 py-2 border-r border-gray-200'>{user.is_staff ? "Yes" : "No"}</td>
              <td className='pl-2 py-2 border-r border-gray-200'>{user.is_superuser ? "Yes" : "No"}</td>
              <td className='pl-2 py-2'>
                <button className='cursor-pointer' onClick={() => navigate(`/users/${user.id}`)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AppLayout>
  )
}

export default Dasboard;
