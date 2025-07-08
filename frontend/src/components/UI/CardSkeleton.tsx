
export const CardSkeleton = () => {
  return (
    <div className="w-full bg-white rounded-xl shadow-md border border-gray-200 p-3">
      <div className="animate-pulse flex flex-col gap-4">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="flex gap-2">
            <div className="h-6 w-6 bg-gray-200 rounded-lg"></div>
            <div className="h-6 w-6 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
        {/* Tags Skeleton */}
        <div className="flex gap-2">
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>
          <div className="h-5 bg-gray-200 rounded w-1/5"></div>
        </div>
        {/* Content Skeleton */}
        <div className="h-32 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
};