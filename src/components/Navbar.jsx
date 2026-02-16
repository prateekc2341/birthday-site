import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const search = location.search;

  const isActive = (path) => {
    return location.pathname === path;
  };

  const withQuery = (path) => `${path}${search}`;

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-pink-100">

      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">

        {/* logo */}
        <div className="text-pink-600 font-semibold text-lg sm:text-xl">
          <span className="hidden sm:inline">For You ❤️</span>
          <span className="sm:hidden text-2xl">❤️</span>
        </div>

        {/* nav links */}
        <div className="flex gap-6 text-sm sm:text-base font-medium">

          <Link
            to={withQuery("/")}
            className={`transition ${
              isActive("/") 
                ? "text-pink-600 border-b-2 border-pink-500 pb-1"
                : "text-gray-700 hover:text-pink-600"
            }`}
          >
            Home
          </Link>

          <Link
            to={withQuery("/memories")}
            className={`transition ${
              isActive("/memories")
                ? "text-pink-600 border-b-2 border-pink-500 pb-1"
                : "text-gray-700 hover:text-pink-600"
            }`}
          >
            Memories
          </Link>

          <Link
            to={withQuery("/message")}
            className={`transition ${
              isActive("/message")
                ? "text-pink-600 border-b-2 border-pink-500 pb-1"
                : "text-gray-700 hover:text-pink-600"
            }`}
          >
            Message
          </Link>

        </div>
      </div>
    </div>
  );
}
