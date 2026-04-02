const Slide = ({ slide, active }) => {

  return (
    <div
      className={`absolute top-0 w-full md:pb-0 md:pl-22 pl-2 bg-black/20 pr-2 h-full flex items-center justify-center transition-all duration-700 ${active ? "flex" : "hidden"}`}
      >
      <div className="relative text-center glass p-8">
        <h2 className="text-2xl md:text-3xl text-white font-bold mb-4">{slide.title}</h2>
        <h2 className="text-md md:text-xl text-white/90 mb-2">{slide.subtitle}</h2>
        <p className="text-sm md:text-md text-white/70">{slide.text}</p>
      </div>
    </div>
  );
};

export default Slide;