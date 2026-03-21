import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSlideGroups } from "../features/slide/slideSlice";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import IconButton from "../components/IconButton";
import { PlusIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import SlideGroupModal from "../layouts/SlideGroupModal";
import LoadingButton from "../components/LoadingButton";

const SlideGroups = () => {
  const dispatch = useDispatch();
  const { groups } = useSelector((state) => state.slide);
  const slideGroupStatus = useSelector((state) => state.slide.status.slideGroupLoading);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSlideGroups()).unwrap();
  }, [dispatch]);

  return (
    <AppLayout>
      <div className="glass w-full p-4">
        <div className="w-full flex items-center justify-between">
          <IconButton onClick={() => navigate("/dashboard")}><ArrowLeftIcon className="size-6" /></IconButton>
          <h1 className="text-2xl font-bold text-white">Slide Groups</h1>
          <IconButton
            className=""
            onClick={() => setOpenModal(true)}>
            <PlusIcon className="size-6" />
            <h4 className="font-normal text-sm">Add Group</h4>
          </IconButton>
        </div>
        {slideGroupStatus === "loading" ? (
          <div className="w-full flex items-center justify-center mt-8"><LoadingButton /></div>
        ) : (
          <div>
            {groups.map((group) => (
              <Link
                key={group.id}
                to={`/dashboard/slide-groups/slides/${group.slug}`}
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