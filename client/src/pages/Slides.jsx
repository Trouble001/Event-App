import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSlideGroups, fetchSlidesByGroup } from "../features/slide/slideSlice";
import { useParams } from "react-router-dom";
import SlideShow from "../components/SlideShow";
import LoadingButton from "../components/LoadingButton";

const Slides = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const slideStatus = useSelector((state) => state.slide.status.slideLoading);
  const { slides, groups } = useSelector((state) => state.slide);
  
  useEffect(() => {
    dispatch(fetchSlidesByGroup({ slug })).unwrap();
    dispatch(fetchSlideGroups()).unwrap();
  }, [dispatch, slug]);

  const selectedGroup = useMemo(() => {
      return groups.find((g) => g.slug === slug);
    }, [groups, slug]);

  return (
    <div className="w-full h-screen fixed">
      {slideStatus === "loading" ? (
      <div className="w-full h-screen fixed flex items-center justify-center md:pl-23"><LoadingButton /></div>
    ) : (
      <div>
      {slides?.length === 0 ? (
        <div className="text-md text-center text-white pt-20">No Slides Found</div>
      ) : (
        <div
          className="w-full h-screen fixed z-10"
          style={{ 
            backgroundImage: selectedGroup?.image ? `url(${selectedGroup?.image})` : "none",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
        }}
      >
          <SlideShow slides={slides} />
        </div>
      )}
      </div>
    )}
    </div>
  );
};

export default Slides;