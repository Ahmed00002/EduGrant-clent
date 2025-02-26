import { Skeleton } from "../ui/skeleton";

const ScholarshipCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 flex gap-4 w-full">
      {/* Image Skeleton */}
      <Skeleton className="w-16 h-16 rounded-md" />

      {/* Content Skeleton */}
      <div className="flex flex-col gap-2 w-full">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/3" />

        {/* Rating */}
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="h-4 w-6" />
        </div>

        {/* Info Section */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-3/4" />

        {/* Stipend & Button */}
        <div className="flex justify-between items-center mt-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCardSkeleton;
