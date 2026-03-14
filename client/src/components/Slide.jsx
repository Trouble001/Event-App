const Slide = ({ slide, active }) => {

  return (
    <div className={`absolute w-full h-full flex items-center justify-center transition-opacity duration-700 ${active ? "opacity-100" : "opacity-0"}`}>
      <div className="relative text-center text-white bg-white/20 ">
        <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
        <p className="text-xl">{slide.text}</p>
      </div>
    </div>
  );
};

export default Slide;