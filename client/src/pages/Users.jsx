import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../features/admin/adminSlice';
import AppLayout from '../layouts/AppLayout';
import AccessDenied from '../components/AccessDenied';
import IconButton from '../components/IconButton';
import { PlusIcon, ArrowLeftIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import LoadingButton from '../components/LoadingButton';
import UserModal from '../layouts/UserModal';

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { users, loading } = useSelector((state) => state.admin);
  const usersStatus = useSelector((state) => state.admin.status.users);

  useEffect(() => {
    dispatch(fetchUsers()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  if (loading) return <p>Loading...</p>;

  const handleOpenUserModal = () => {
    setIsEdit(false);
    setSelectedUser(null);
    setOpenModal(true);
  };

     /* ✅ OPEN EDIT */
  const handleEdit = (user) => {
    setIsEdit(true);
    setSelectedUser(user);
    setOpenModal(true);
  };

  if (!user?.is_staff && !user?.is_superuser) return <AccessDenied />;

  return (
    <AppLayout>
      <div className='glass w-full p-4'>
        <div className="w-full flex items-center justify-between">
          <IconButton onClick={() => navigate("/dashboard")}><ArrowLeftIcon className="size-4 md:size-5 lg:size-6" /></IconButton>
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-white">All Users</h1>
          <IconButton className="" onClick={handleOpenUserModal}>
            <PlusIcon className="size-4 md:size-5 lg:size-6" />
            <h4 className="font-normal text-xs md:text-sm lg:text-md">Add User</h4>
          </IconButton>
        </div>
        {usersStatus === "loading" ? (
          <div className="w-full flex items-center justify-center mt-8"><LoadingButton /></div>
        ) : (
          <table className='w-full h-auto text-xs shadow-md border border-white/30 text-left mt-4'>
            <thead className='text-white'>
              <tr className='text-xs'>
                <th className='pl-2 py-2 border-r border-white/30 hidden lg:table-cell'>ID</th>
                <th className='pl-2 py-2 border-r border-white/30'>NAME</th>
                <th className='pl-2 py-2 border-r border-white/30 hidden lg:table-cell'>GENDER</th>
                <th className='pl-2 py-2 border-r border-white/30'>PHONE</th>
                <th className='pl-2 py-2 border-r border-white/30'>EMAIL</th>
                <th className='pl-2 py-2 border-r border-white/30 hidden lg:table-cell'>ACTIVE</th>
                <th className='pl-2 py-2 border-r border-white/30 hidden lg:table-cell'>STAFF</th>
                <th className='pl-2 py-2 border-r border-white/30 hidden lg:table-cell'>ADMIN</th>
                <th className='pl-2 py-2'>ACTION</th>

              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className='border border-white/30 text-white/90 text-left'>
                  <td className='pl-2 py-2 border-r border-white/30 hidden lg:table-cell'>{user.id}</td>
                  <td className='pl-2 py-2 border-r border-white/30'>{user.full_name}</td>
                  <td className='pl-2 py-2 border-r border-white/30 hidden lg:table-cell'>{user.gender}</td>
                  <td className='pl-2 py-2 border-r border-white/30'>{user.phone_number}</td>
                  <td className='pl-2 py-2 border-r border-white/30'>{user.email}</td>

                  <td className='pl-2 py-2 border-r border-white/30 hidden lg:table-cell'>{user.is_active ? (<CheckIcon className="size-5 text-teal-400" />) : (<XMarkIcon className="size-5 text-rose-400" />)}</td>
                  <td className='pl-2 py-2 border-r border-white/30 hidden lg:table-cell'>{user.is_staff ? (<CheckIcon className="size-5 text-teal-400" />) : (<XMarkIcon className="size-5 text-rose-400" />)}</td>
                  <td className='pl-2 py-2 border-r border-white/30 hidden lg:table-cell'>{user.is_superuser ? (<CheckIcon className="size-5 text-teal-400" />) : (<XMarkIcon className="size-5 text-rose-400" />)}</td>
                  <td className='pl-2 py-2'>
                    <button className='cursor-pointer' onClick={() => handleEdit(user)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
        )}  
      </div>

      <UserModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setIsOpen(false)
        }}
        isEdit={isEdit}
        initialData={selectedUser}
      />
    </AppLayout>
  )
}

export default Users;
