import { useEffect, useState } from "react";
import Slide from "./Slide";
import AppLayout from "../layouts/AppLayout";

const SlideShow = ({ slides }) => {

  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!started || paused || finished || !slides.length) return;
    const duration = slides[current].duration || 6000;

    let start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = (elapsed / duration) * 100;
      setProgress(percent);
      if (elapsed >= duration) {
        if (current === slides.length - 1) {
          setFinished(true);
          clearInterval(interval);
          return;
        }
        setCurrent((prev) => prev + 1);
        setProgress(0);
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [current, started, paused, finished, slides]);

  return (
    <AppLayout>
      <div className="w-full h-full">
      {/* Slides */}
      {slides.map((slide, index) => (
        <Slide
          key={slide.id}
          slide={slide}
          active={index === current}
        />
      ))}

      {/* Progress Bar */}
      {started && !finished && (
        <div className="fixed bottom-10 md:bottom-0 left-0 h-1.5 bg-gray-400" style={{ width: `${progress}%` }} />
      )}

      {/* Start Button */}
      {!started && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => setStarted(true)} className="bg-cyan-500 text-black px-10 py-4 rounded-full text-xl font-bold"
          >Start</button>

        </div>
      )}


      {/* Pause / Resume */}
      {started && !finished && (

        <div className="fixed top-6 right-6 flex gap-4">

          {!paused ? (

            <button
              onClick={() => setPaused(true)}
              className="bg-white text-black px-5 py-2 rounded"
            >
              Pause
            </button>

          ) : (

            <button
              onClick={() => setPaused(false)}
              className="bg-green-500 text-white px-5 py-2 rounded"
            >
              Resume
            </button>

          )}

        </div>

      )}


      {/* Replay Button */}
      {finished && (

        <div className="absolute inset-0 flex items-center justify-center">

          <button
            onClick={() => {
              setCurrent(0);
              setFinished(false);
              setProgress(0);
              setStarted(true);
            }}
            className="bg-yellow-400 text-black px-10 py-4 rounded-full text-xl font-bold"
          >
            Replay
          </button>

        </div>

      )}

    </div>
    </AppLayout>
  );
};

export default SlideShow;