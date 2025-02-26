import SetPageTitle from "@/components/shared/SetPageTitle";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-7xl font-bold text-Primary">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mt-4">
        Oops! Page not found
      </h2>
      <p className="text-gray-600 mt-2">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      <img
        src="https://i.imgur.com/qIufhof.png"
        alt="Not Found"
        className="w-64 h-auto mt-6 animate-bounce"
      />

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-Primary text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
      <SetPageTitle title={"Not Found"} />
    </div>
  );
};

export default NotFound;
