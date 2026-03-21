import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSlidesByGroup } from "../features/slide/slideSlice";
import { useParams } from "react-router-dom";
import SlideShow from "../components/SlideShow";

const Slides = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { slides } = useSelector((state) => state.slide);
  
  useEffect(() => {
    dispatch(fetchSlidesByGroup({ slug })).unwrap();
  }, [dispatch, slug]);

  return <SlideShow slides={slides} />;
};

export default Slides;