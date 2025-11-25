import Link from "next/link";
import { FaBookDead, FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
      
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-900/20 rounded-full blur-3xl mix-blend-screen animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-900/20 rounded-full blur-3xl mix-blend-screen animate-pulse"></div>

      <div className="relative z-10 max-w-lg">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <FaBookDead className="text-8xl text-slate-700 animate-bounce" />
        </div>

        {/* 404 Text */}
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-600 select-none">
          404
        </h1>

        {/* Message */}
        <h2 className="text-3xl font-bold text-white mt-4 mb-2">
          Lost in the <span className="text-amber-500">Library?</span>
        </h2>
        
        <p className="text-slate-400 text-lg mb-8">
          The page you are looking for might have been moved, deleted, or possibly never existed.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <button className="btn bg-amber-600 hover:bg-amber-700 text-white border-none px-8 shadow-lg shadow-amber-900/30 gap-2">
              <FaArrowLeft /> Back to Home
            </button>
          </Link>
          
          <Link href="/allbooks">
            <button className="btn btn-outline border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-8">
              Browse Books
            </button>
          </Link>
        </div>
      </div>

      {/* Footer Text */}
      <div className="absolute bottom-8 text-slate-600 text-sm">
        Error Code: 404_PAGE_NOT_FOUND
      </div>
    </div>
  );
}