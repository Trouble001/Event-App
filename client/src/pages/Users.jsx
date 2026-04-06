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
import Input from '../components/Input';

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { user } = useSelector((state) => state.auth);
  const { users, pagination } = useSelector((state) => state.admin);
  const usersStatus = useSelector((state) => state.admin.status.users);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch(fetchUsers({ page, search })).unwrap();
    }, 500);
    return () => clearInterval(delayDebounce);
  }, [search, page, dispatch]);

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
        <div className='w-full mt-4'>
          <Input
            className=""
            placeholder='Search user by name, email or phone number'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }} 
          />
        </div>
        {usersStatus === "loading" ? (
          <div className="w-full flex items-center justify-center mt-0"><LoadingButton /></div>
        ) : (
          <div className="rounded-xl overflow-hidden border border-white/20 shadow-lg">
            <table className='w-full h-auto text-xs text-left'>
            <thead className='text-white'>
              <tr className='text-xs'>
                <th className='pl-2 py-2 border-r border-white/20 hidden lg:table-cell'>#</th>
                <th className='pl-2 py-2 border-r border-white/20'>NAME</th>
                <th className='pl-2 py-2 border-r border-white/20 hidden lg:table-cell'>GENDER</th>
                <th className='pl-2 py-2 border-r border-white/20'>PHONE</th>
                <th className='pl-2 py-2 border-r border-white/20'>EMAIL</th>
                <th className='pl-2 py-2 border-r border-white/20 hidden lg:table-cell'>ACTIVE</th>
                <th className='pl-2 py-2 border-r border-white/20 hidden lg:table-cell'>STAFF</th>
                <th className='pl-2 py-2 border-r border-white/20 hidden lg:table-cell'>ADMIN</th>
                <th className='pl-2 py-2'>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {users?.length > 0 ? (
                users.map((user, index) => (
                <tr key={user.id} className='border-t border-white/20 hover:bg-white/10 cursor-pointer transition duration-200 text-white/90 text-left'>
                  <td className='pl-2 py-2 border-r border-white/20 hidden lg:table-cell'>{index + 1}</td>
                  <td className='pl-2 py-2 border-r border-white/20'>{user.full_name}</td>
                  <td className='pl-2 py-2 border-r border-white/20 hidden lg:table-cell'>{user.gender}</td>
                  <td className='pl-2 py-2 border-r border-white/20'>{user.phone_number}</td>
                  <td className='pl-2 py-2 border-r border-white/20'>{user.email}</td>

                  <td className='pl-2 py-2 border-r border-white/20 hidden lg:table-cell'>{user.is_active ? (<CheckIcon className="size-5 text-teal-400" />) : (<XMarkIcon className="size-5 text-rose-400" />)}</td>
                  <td className='pl-2 py-2 border-r border-white/20 hidden lg:table-cell'>{user.is_staff ? (<CheckIcon className="size-5 text-teal-400" />) : (<XMarkIcon className="size-5 text-rose-400" />)}</td>
                  <td className='pl-2 py-2 border-r border-white/20 hidden lg:table-cell'>{user.is_superuser ? (<CheckIcon className="size-5 text-teal-400" />) : (<XMarkIcon className="size-5 text-rose-400" />)}</td>
                  <td className='pl-2 py-2'>
                    <button className='cursor-pointer' onClick={() => handleEdit(user)}>Edit</button>
                  </td>
                </tr>
              ))
              ) : (
                <tr>
                  <td colSpan="9" className='border-t border-white/20 py-2 text-center text-md text-white'>
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        )}

        <div className="w-full flex mt-4 items-center justify-between">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="glass px-3 py-1 text-white text-sm disabled:opacity-60"
          >
            Prev
          </button>

          <span className="text-white/80 text-sm">
            Page {page} of {pagination.total_pages}
          </span>

          <button
            disabled={page === pagination.total_pages}
            onClick={() => setPage(page + 1)}
            className="glass px-3 py-1 text-white text-sm disabled:opacity-60"
          >
            Next
          </button>
        </div>
        
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
