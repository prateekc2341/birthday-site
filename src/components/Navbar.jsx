import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-8 py-4 backdrop-blur-md bg-white/60 shadow-sm sticky top-0 z-50">
      <h1 className="font-semibold text-xl text-pink-600">For You ❤️</h1>

      <div className="space-x-8 text-gray-700 font-medium">
        <Link to="/" className="hover:text-pink-600 transition">Home</Link>
        <Link to="/memories" className="hover:text-pink-600 transition">Memories</Link>
        <Link to="/message" className="hover:text-pink-600 transition">Message</Link>
      </div>
    </div>
  );
}
