import { useState, useEffect } from "react";
import Slide from "./Slide";
import AppLayout from "../layouts/AppLayout";

const SlideShow = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!slides.length) return;
    const duration = slides[current].duration || 6000;
    const timer = setTimeout(() => {
      if (current < slides.length - 1) {
        setCurrent(current + 1);
      }
    }, duration);
    return () => clearTimeout(timer);
  }, [current, slides]);
  return (
    <AppLayout>
        <div className="w-full bg-green-400 relative">
      {slides.map((slide, index) => (
        <Slide
          key={slide.id}
          slide={slide}
          active={index === current}
        />
      ))}
    </div>
    </AppLayout>
  );
};

export default SlideShow;