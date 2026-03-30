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
        <div className='w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {groups.map((group) => (
                <Link
                key={group.id}
                to={`/slides/${group.slug}`}
                className="w-full h-36 glass flex items-center justify-center text-white/80 hover:text-cyan-500 hover:shadow-2xl border border-white/30 shadow rounded-3xl transition"
                // style={{ 
                //   backgroundImage: `url(${group?.image})`,
                //   backgroundRepeat: "no-repeat",
                //   backgroundSize: "cover",
                //   backgroundPosition: "center",
                //   backgroundAttachment: "fixed",
                // }}
                >
                <h4 className='glass px-6 py-2 bg-black/30 text-base'>{group.name}</h4>
                </Link>
            ))}
        </div>
    </AppLayout>
  )
}

export default Home