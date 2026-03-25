import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSlideGroups } from "../features/slide/slideSlice";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import IconButton from "../components/IconButton";
import { PlusIcon, ArrowLeftIcon, PencilIcon } from '@heroicons/react/24/solid';
import SlideGroupModal from "../layouts/SlideGroupModal";
import LoadingButton from "../components/LoadingButton";

const SlideGroups = () => {
  const dispatch = useDispatch();
  const { groups } = useSelector((state) => state.slide);
  const slideGroupStatus = useSelector((state) => state.slide.status.slideGroupLoading);

  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSlideGroups());
  }, [dispatch]);

  /* ✅ OPEN CREATE */
  const handleCreate = () => {
    setIsEdit(false);
    setSelectedGroup(null);
    setOpenModal(true);
  };

  /* ✅ OPEN EDIT */
  const handleEdit = (group) => {
    setIsEdit(true);
    setSelectedGroup(group);
    setOpenModal(true);
  };

  return (
    <AppLayout>
      <div className="glass w-full p-4">
        
        <div className="w-full flex items-center justify-between">
          <IconButton onClick={() => navigate("/dashboard")}>
            <ArrowLeftIcon className="size-6" />
          </IconButton>

          <h1 className="text-2xl font-bold text-white">
            Slide Groups
          </h1>

          <IconButton onClick={handleCreate}>
            <PlusIcon className="size-6" />
            <h4 className="font-normal text-sm">Add Group</h4>
          </IconButton>
        </div>

        {slideGroupStatus === "loading" ? (
          <div className="w-full flex items-center justify-center mt-8">
            <LoadingButton />
          </div>
        ) : (
          <div>
            {groups?.filter(Boolean).map((group) => (
              <div
                key={group.id}
                className="flex items-center justify-between border border-white/30 rounded-3xl px-4 py-2 mt-4"
              >
                <Link
                  to={`/dashboard/slide-groups/slides/${group.slug}`}
                  className="text-white/80"
                >
                  {group.name}
                </Link>

                {/* EDIT BUTTON */}
                <button
                  onClick={() => handleEdit(group)}
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  <PencilIcon className="size-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <SlideGroupModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        isEdit={isEdit}
        initialData={selectedGroup}
      />
    </AppLayout>
  );
};

export default SlideGroups;