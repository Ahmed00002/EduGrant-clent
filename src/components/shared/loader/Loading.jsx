import { ScaleLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center backdrop-blur-sm z-50 space-y-4">
      <ScaleLoader />
      <p className="tex-md font-medium">Loading</p>
    </div>
  );
};

export default Loading;
