const Slide = ({ slide, active }) => {

  return (
    <div className={`absolute top-0 left-0 w-full h-full flex items-center justify-center text-center transition-all duration-700 ${
        active ? "opacity-100 scale-100" : "opacity-0 scale-110"
      }`}>

      <img
        src={slide.image}
        alt={slide.title}
        className="absolute w-full h-full object-cover brightness-[0.35]"
      />

      <div className="backdrop-blur-md bg-white/20 border border-white/30 shadow-xl rounded-2xl p-10 text-white max-w-10/12">

        <h2 className="text-4xl font-bold text-cyan-500 mb-4">
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="text-xl text-cyan-200 mb-2">{slide.subtitle}</p>
        )}
        <p className="text-2xl text-cyan-100">{slide.text}</p>
      </div>
    </div>
  );
};

export default Slide;