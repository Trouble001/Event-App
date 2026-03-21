import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSlideGroups, fetchSlidesByGroup } from "../features/slide/slideSlice";
import { useNavigate, useParams } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import IconButton from "../components/IconButton";
import { PlusIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import SlideModal from "../layouts/SlideModal";

const SlidesDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  
  const { slides, groups } = useSelector((state) => state.slide);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(fetchSlideGroups()).unwrap();
  }, [dispatch]);

  const selectedGroup = useMemo(() => {
    return groups.find((g) => g.slug === slug);
  }, [groups, slug]);

  const groupId = selectedGroup?.id;

  useEffect(() => {
  if (groupId) {
    dispatch(fetchSlidesByGroup({ groupId })).unwrap();
  }
}, [dispatch, groupId]);

  if (!selectedGroup) return <p>Loading...</p>;

  return (
    <AppLayout>
        <div className="glass w-full p-4">
            <div className="w-full flex items-center justify-between">
                <IconButton onClick={() => navigate("/dashboard/slide-groups")}><ArrowLeftIcon className="size-6" /></IconButton>
                <h1 className="text-2xl font-bold text-white">Slide Groups</h1>
                <IconButton className="" onClick={() => setOpenModal(true)}>
                    <PlusIcon className="size-6" />
                    <h4 className="font-normal text-sm">Add Slide</h4>
                </IconButton>
            </div>
            <div className="w-full grid grid-cols-4 gap-2 mt-4">
                {slides.map((slide) => (
                    <div key={slide.id} className="w-full text-white/80 block border border-white/30 shadow-xl rounded-3xl px-4 py-2">
                        <h1>{slide.title}</h1>
                        <h1>{slide.text}</h1>
                    </div>
                ))}
            </div>
        </div>
        <SlideModal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            groupId={groupId}
        />
    </AppLayout>
  );
};

export default SlidesDetail;