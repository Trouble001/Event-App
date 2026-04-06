import React from 'react'
import AppLayout from '../layouts/AppLayout'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import AccessDenied from '../components/AccessDenied';

const Dasboard = () => {
const { user } = useSelector((state) => state.auth);

if (!user?.is_staff && !user?.is_superuser) return <AccessDenied />;


  return (
    <AppLayout>
      <div className='w-full glass p-6'>
        <h1 className='text-2xl font-semibold text-white text-center'>Dashboard</h1>
        <div className='grid grid-cols-2 gap-4 mt-4'>
          <Link className="glass p-2 text-white/80 text-center hover:text-teal-500 transition" to="/dashboard/users">Users</Link>
          <Link className="glass p-2 text-white/80 text-center hover:text-teal-500 transition" to="/dashboard/slide-groups">Slide Groups</Link>
        </div>
      </div>
    </AppLayout>
  )
}

export default Dasboard