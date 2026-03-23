import React, { useEffect } from 'react'
import AppLayout from "../layouts/AppLayout";
import { useDispatch, useSelector } from 'react-redux';
import { fetchSlideGroups } from '../features/slide/slideSlice';
import { Link } from 'react-router-dom';

const Home = () => {
  const { groups } = useSelector((state) => state.slide);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchSlideGroups()).unwrap();
    }, [dispatch]);

  return (
    <AppLayout>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
            {groups.map((group) => (
                <Link
                key={group.id}
                to={`/slides/${group.slug}`}
                className="w-full h-20 flex items-center justify-center text-xl font-medium text-white/80 hover:text-cyan-500 border border-white/30 shadow-xl rounded-3xl"
                >{group.name}</Link>
            ))}
        </div>
    </AppLayout>
  )
}

export default Home