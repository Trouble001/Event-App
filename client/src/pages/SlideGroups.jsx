import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSlideGroups } from "../features/slide/slideSlice";
import { Link } from "react-router-dom";

const SlideGroups = () => {

  const dispatch = useDispatch();

  const { groups } = useSelector((state) => state.slide);

  useEffect(() => {
    dispatch(fetchSlideGroups());
  }, [dispatch]);

  useEffect(() => {
    console.log("Groups:", groups);
  }, [groups]);

  return (
    <div className="p-10 bg-white">
      <h1 className="text-3xl font-bold mb-6">
        Slide Groups
      </h1>
      {groups.map((group) => (

        <Link
          key={group.id}
          to={`/slides/${group.slug}`}
          className="block border p-4 mb-4"
        >

          {group.name}

        </Link>

      ))}

    </div>

  );
};

export default SlideGroups;