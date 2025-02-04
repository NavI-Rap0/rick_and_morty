const CharacterCardSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-200 rounded-lg shadow-md p-4 flex flex-col items-center w-64 h-[300px] animate-pulse">
      <div className="rounded-full bg-gray-300 h-32 w-32 mb-4"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="flex items-center mt-2 w-2/3">
        <span className="inline-block w-3 h-3 rounded-full bg-gray-300 mr-2"></span>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
      </div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mt-4"></div>
    </div>
  );
};

export default CharacterCardSkeleton;

  