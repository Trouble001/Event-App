import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSlideGroups } from "../features/slide/slideSlice";
import { Link } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import IconButton from "../components/IconButton";
import { PlusIcon } from '@heroicons/react/24/solid';
import SlideGroupModal from "../layouts/SlideGroupModal";
import LoadingButton from "../components/LoadingButton";

const SlideGroups = () => {
  const dispatch = useDispatch();
  const { groups } = useSelector((state) => state.slide);
  const slideGroupStatus = useSelector((state) => state.slide.status.slideGroupLoading);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(fetchSlideGroups()).unwrap();
  }, [dispatch]);

  return (
    <AppLayout>
      <div className="glass w-full p-4">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Slide Groups</h1>
          <button
            className="border border-white/30 shadow-xl rounded-3xl flex items-center justify-center px-3 py-1.5 gap-2 cursor-pointer"
            onClick={() => setOpenModal(true)}>
            <PlusIcon className="size-6 text-white/80" />
            <h4 className="text-white/80 font-normal text-sm">Add Group</h4>
          </button>
        </div>
        {slideGroupStatus === "loading" ? (<LoadingButton />) : (
          <div>
            {groups.map((group) => (
              <Link
                key={group.id}
                to={`/slides/${group.slug}`}
                className="w-full text-white/80 block border border-white/30 shadow-xl rounded-3xl px-4 py-2 mt-4"
              >{group.name}</Link>
            ))}
          </div>
        )}
    </div>
    <SlideGroupModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </AppLayout>
  );
};

export default SlideGroups;