const Spinner = ({
  text = "AUTHENTICATING",
  size = 80,
  color = "#2dd4bf",
  bg = "transparent",
}) => {
  const dotSize = size / 12;
  const lineWidth = size / 12;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div
      className="relative flex items-center justify-center rounded-full"
      style={{ width: size, height: size, backgroundColor: bg }}
    >
      {/* Text */}
      <div className="absolute flex items-center justify-center w-full h-full">
        <h1
          className="text-xs font-semibold px-2 py-0.5 border shadow animate-fade"
          style={{
            color,
            borderColor: color,
            backgroundColor: bg,
          }}
        >
          {text}
        </h1>
      </div>

      {/* Lines */}
      {[0, 22.5, 45, 67.5].map((deg, i) => (
        <div
          key={i}
          className={`absolute flex flex-col justify-between items-center animate-spin${i+1}`}
          style={{
            width: lineWidth,
            height: size,
          }}
        >
          <div
            className="rounded-full shadow"
            style={{
              width: dotSize,
              height: dotSize,
              backgroundColor: color,
            }}
          />
          <div
            className="rounded-full shadow"
            style={{
              width: dotSize,
              height: dotSize,
              backgroundColor: color,
            }}
          />
        </div>
      ))}
    </div>
    </div>
  );
};

export default Spinner;