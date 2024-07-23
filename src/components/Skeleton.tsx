const SkeletonCard = () => {
  return (
    <div className="relative w-36 h-60 flex-shrink-0 mx-2 bg-gray-200 rounded-lg animate-pulse">
      <div className="flex justify-center">
        <div className="w-2/3 h-24 bg-gray-300 rounded-full" />
      </div>
      <div className="absolute bottom-0 bg-gray-300 w-full h-24 rounded-t-lg p-2">
        <div className="h-4 bg-gray-400 rounded mb-2"></div>
        <div className="flex justify-between items-center">
          <div className="w-1/2 h-4 bg-gray-400 rounded"></div>
          <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
