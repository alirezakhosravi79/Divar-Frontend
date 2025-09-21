
const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-full py-10">
      {/* دایره‌ی چرخان */}
      <div className="w-12 h-12 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
