import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSlideGroups } from "../features/slide/slideSlice";
import { Link } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import IconButton from "../components/IconButton";
import { PlusIcon } from '@heroicons/react/24/solid';
import SlideGroupModal from "../layouts/SlideGroupModal";

const SlideGroups = () => {
  const dispatch = useDispatch();
  const { groups } = useSelector((state) => state.slide);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(fetchSlideGroups());
  }, [dispatch]);

  return (
    <AppLayout>
      <div className="w-full backdrop-blur-md bg-white/20 border border-white/30 shadow-xl rounded-2xl p-4">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white mb-2">Slide Groups</h1>
          <button
            className="border border-white/30 shadow-xl rounded-2xl mb-2 flex items-center justify-center px-3 py-1.5 gap-2 cursor-pointer"
            onClick={() => setOpenModal(true)}>
            <PlusIcon className="size-6 text-white/80" />
            <h4 className="text-white/80 font-normal text-sm">Add Group</h4>
          </button>
        </div>
        {groups.map((group) => (
          <Link
            key={group.id}
            to={`/slides/${group.slug}`}
            className="w-full text-white/80 block border border-white/30 shadow-xl rounded-2xl px-4 py-2"
          >{group.name}
          </Link>
        ))}
    </div>
    <SlideGroupModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </AppLayout>
  );
};

export default SlideGroups;