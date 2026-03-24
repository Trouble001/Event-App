import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSlidesByGroup } from "../features/slide/slideSlice";
import { useParams } from "react-router-dom";
import SlideShow from "../components/SlideShow";
import LoadingButton from "../components/LoadingButton";

const Slides = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const slideStatus = useSelector((state) => state.slide.status.slideLoading);
  const { slides, groups } = useSelector((state) => state.slide);
  
  useEffect(() => {
    console.log("Calling API with:", { slug });
    dispatch(fetchSlidesByGroup({ slug })).unwrap();
  }, [dispatch, slug]);

  const selectedGroup = useMemo(() => {
      return groups.find((g) => g.slug === slug);
    }, [groups, slug]);

  return (
    <div>
      {slideStatus === "loading" ? (
      <div className="w-full h-screen flex items-center justify-center md:pl-23"><LoadingButton /></div>
    ) : (
      <div>
      {slides?.length === 0 ? (
        <div className="text-md text-center text-white pt-20">No Slides Found</div>
      ) : (
        <div
          className="w-full h-full"
          style={{ 
            backgroundImage: `url(${selectedGroup?.image})`,
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