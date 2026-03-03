const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="h-12 w-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default Loader;