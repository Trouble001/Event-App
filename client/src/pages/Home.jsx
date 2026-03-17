import React from 'react'
import AppLayout from '../layouts/AppLayout';
import EventCard from '../components/EventCard';
import LiquidGlass from '../components/LiquidGlass';

const Home = () => {
  return (
    <AppLayout>
        <div className='w-full h-screen grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 p-2'>
          <LiquidGlass />
        </div>
    </AppLayout>
  )
}

export default Home;
