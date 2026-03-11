import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSlides } from "../features/admin/adminSlice";
import SlideShow from "../components/SlideShow";

const Vastu = () => {

  const dispatch = useDispatch();

  const { slides, adminLoading, adminError } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(fetchSlides("vastu"));
  }, [dispatch]);

  useEffect(() => {
    console.log("Slides:", slides);
  })

  if (adminLoading) return <p className="text-center mt-20">Loading...</p>;

  if (adminError) return <p className="text-center mt-20">{adminError}</p>;

  return <SlideShow slides={slides} />;
};

export default Vastu;