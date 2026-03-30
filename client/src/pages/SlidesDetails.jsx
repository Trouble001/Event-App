import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSlide, fetchSlideGroups, fetchSlidesByGroup } from "../features/slide/slideSlice";
import { useNavigate, useParams } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import IconButton from "../components/IconButton";
import { PlusIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import SlideModal from "../layouts/SlideModal";
import LoadingButton from "../components/LoadingButton";
import AccessDenied from "../components/AccessDenied";

const SlidesDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { slides, groups } = useSelector((state) => state.slide);
  const slideStatus = useSelector((state) => state.slide.status.slideLoading);

  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(null);

  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(fetchSlideGroups()).unwrap();
  }, [dispatch]);

  const selectedGroup = useMemo(() => {
    return groups.find((g) => g.slug === slug);
  }, [groups, slug]);

  const groupId = selectedGroup?.id;
  const groupName = selectedGroup?.name;

  useEffect(() => {
  if (groupId) {
    dispatch(fetchSlidesByGroup({ groupId })).unwrap();
  }
}, [dispatch, groupId]);

   /* ✅ OPEN CREATE */
  const handleCreate = () => {
    setIsEdit(false);
    setSelectedSlide(null);
    setOpenModal(true);
  };

    /* ✅ OPEN EDIT */
  const handleEdit = (slide) => {
    setIsEdit(true);
    setSelectedSlide(slide);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this slide?");
    if (!confirmDelete) return;
    try {
      await dispatch(deleteSlide(id)).unwrap()
    } catch (error) {
      console.log("Error:", error);
    }
  }

  if (!user?.is_staff && !user?.is_superuser) return <AccessDenied />;

  return (
    <AppLayout>
        <div className="glass w-full p-4">
            <div className="w-full flex items-center justify-between">
                <IconButton onClick={() => navigate("/dashboard/slide-groups")}><ArrowLeftIcon className="size-4 md:size-5 lg:size-6" /></IconButton>
                <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-white">{selectedGroup ? `${selectedGroup.name}` : "Slides"}</h1>
                <IconButton className="" onClick={handleCreate}>
                    <PlusIcon className="size-4 md:size-5 lg:size-6" />
                    <h4 className="font-normal text-xs md:text-sm lg:text-md">Add Slide</h4>
                </IconButton>
            </div>
            {slideStatus === "loading" ? (
              <div className="w-full flex items-center justify-center mt-8"><LoadingButton /></div>
            ) : (
              <div>
                {slides.length === 0 ? (<div className="text-md text-center text-white mt-8">No Slides Found</div>) : (
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
                    {slides?.map((slide, index) => (
                      <div key={index} className="w-full text-white/80 flex flex-col items-start justify-between border border-white/30 shadow-xl rounded-3xl px-4 py-2">
                        <h1 className="text-white text-lg">{slide?.title}</h1>
                        <h1 className="text-white/90">{slide?.subtitle}</h1>
                        <h1 className="text-white/70 text-sm">{slide?.text}</h1>
                        <div className="bottom-0 mt-2">
                          <button
                            onClick={() => handleEdit(slide)}
                            className="text-cyan-400 hover:text-cyan-500 cursor-pointer pr-2 border-r-2 border-white/30"
                          > Edit
                          </button>
                          <button
                            onClick={() => handleDelete(slide.id)}
                            className="text-rose-400 hover:text-rose-500 cursor-pointer px-2"
                          > Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
        </div>
        <SlideModal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            groupId={groupId}
            groupName={groupName}
            isEdit={isEdit}
            initialData={selectedSlide}
        />
    </AppLayout>
  );
};

export default SlidesDetail;