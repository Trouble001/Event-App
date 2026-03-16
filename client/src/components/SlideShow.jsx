import { useState, useEffect, useRef } from "react";
import Slide from "./Slide";
import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid';
import IconButton from "./IconButton";

const SlideShow = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const elapsedRef = useRef(0);
  const startRef = useRef(null);

  useEffect(() => {
    if (!slides.length || paused) return;

    const duration = slides[current].duration || 6000;

    startRef.current = Date.now() - elapsedRef.current;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      elapsedRef.current = elapsed;
      const percent = (elapsed / duration) * 100;
      setProgress(percent);
      if (elapsed >= duration) {
        elapsedRef.current = 0;
        setProgress(0);

        setCurrent((prev) =>
          prev === slides.length - 1 ? 0 : prev + 1
        );
      }
    }, 50);
    return () => clearInterval(interval);
  }, [current, slides, paused]);


  const togglePause = () => {
    if (!paused) {
      // store elapsed when pausing
      elapsedRef.current = Date.now() - startRef.current;
    }
    setPaused(!paused);
  };
  return (
    <div className="relative w-full h-screen overflow-hidden"
      onClick={togglePause}>

      {slides.map((slide, index) => (
        <Slide
          key={slide.id}
          slide={slide}
          active={index === current}
        />
      ))}

      {/* Progress bar */}
      <div className="absolute bottom-11 md:bottom-0 left-0 w-full h-2 bg-black/40 backdrop-blur-md">
        <div
          className="h-full bg-white/60 backdrop-blur-md rounded-2xl"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Pause / Resume */}
      <div className="absolute w-full bottom-14 flex items-center justify-center md:pl-20 z-10">
        <IconButton
          onClick={togglePause}
        >
          {paused ? (<PlayIcon className="size-8" />) : (<PauseIcon className="size-8" />)}
        </IconButton>
      </div>

    </div>
  );
};

export default SlideShow;