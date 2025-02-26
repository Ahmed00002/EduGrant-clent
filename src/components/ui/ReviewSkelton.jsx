import { Skeleton } from "./skeleton";

const ReviewSkelton = () => {
  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col justify-between border space-y-4">
        {/* University Info Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>

        {/* Reviewer Info Skeleton */}
        <div className="flex items-center gap-3 border-t pt-3">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>

        {/* Rating Skeleton */}
        <div className="mt-3 flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-5 w-5 rounded" />
          ))}
        </div>
        <Skeleton className="h-4 w-3/4 mt-2" />

        {/* Delete Button Skeleton */}
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>
    </>
  );
};

export default ReviewSkelton;
