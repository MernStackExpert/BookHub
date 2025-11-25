"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaSearch, FaFilter, FaStar, FaBookOpen } from "react-icons/fa";
import useAxios from "@/hooks/useAxios";
import { motion } from "framer-motion";

export default function AllBooks() {
  const [books, setBooks] = useState([]);
  const [displayBooks, setDisplayBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const axiosBase = useAxios();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axiosBase.get("/books");
        setBooks(res.data);
        setDisplayBooks(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [axiosBase]);

  useEffect(() => {
    let result = books;
    if (category !== "All") result = result.filter((book) => book.category === category);
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter((book) => {
        const title = book.title ? book.title.toLowerCase() : "";
        const author = book.authorName ? book.authorName.toLowerCase() : "";
        return title.includes(lowerSearch) || author.includes(lowerSearch);
      });
    }
    setDisplayBooks(result);
  }, [searchTerm, category, books]);

  const container = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pb-20">
      <div className="bg-slate-900 border-b border-slate-800 pt-24 pb-12 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Explore Our <span className="text-amber-500">Library</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-slate-400 max-w-2xl mx-auto"
        >
          Browse through our extensive collection of books. Filter by category or search for your favorite titles.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-slate-800/80 backdrop-blur-md p-4 rounded-xl shadow-xl border border-slate-700 flex flex-col md:flex-row gap-4 justify-between items-center"
        >
          <div className="relative w-full md:w-1/2">
            <FaSearch className="absolute left-4 top-3.5 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search by book title or author..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full pl-10 bg-slate-900 border-slate-700 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 placeholder-slate-500"
            />
          </div>

          <div className="relative w-full md:w-1/4">
            <div className="absolute left-3 top-3.5 text-amber-500 pointer-events-none">
              <FaFilter />
            </div>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select select-bordered w-full pl-10 bg-slate-900 border-slate-700 text-white focus:border-amber-500"
            >
              <option value="All">All Categories</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Sci-Fi">Sci-Fi & Fantasy</option>
              <option value="Mystery">Mystery & Thriller</option>
              <option value="Self-Help">Self-Help</option>
              <option value="Programming">Programming</option>
              <option value="History">History</option>
            </select>
          </div>
        </motion.div>

        <div className="mt-12">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-80 bg-slate-900 rounded-xl animate-pulse"></div>
              ))}
            </div>
          ) : displayBooks.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {displayBooks.map((book) => (
                <motion.div 
                  key={book._id} 
                  variants={item}
                  className="card bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <figure className="relative h-60 w-full overflow-hidden">
                    <img 
                      src={book.image} 
                      alt={book.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur px-2 py-1 rounded text-xs text-teal-400 font-bold border border-teal-500/30">
                      {book.category}
                    </div>
                  </figure>

                  <div className="card-body p-5">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-1 text-amber-400 text-xs font-medium mb-2">
                           <FaStar /> {book.rating || "4.5"}
                        </div>
                        <div className="badge badge-ghost badge-sm text-slate-900 font-semibold border-slate-700">
                           ${book.price}
                        </div>
                    </div>

                    <h2 className="card-title text-white text-lg leading-tight group-hover:text-amber-500 transition-colors line-clamp-1">
                      {book.title}
                    </h2>
                    <p className="text-slate-400 text-sm truncate">by {book.authorName}</p>
                    
                    <div className="card-actions justify-end mt-4">
                      <Link href={`/allbooks/${book._id}`} className="w-full">
                        <button className="btn btn-sm btn-outline w-full border-slate-600 text-slate-300 hover:bg-amber-600 hover:border-amber-600 hover:text-white transition-all gap-2">
                          <FaBookOpen /> View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white">No Books Found</h3>
              <p className="text-slate-400 mt-2">
                We couldn’t find any books matching {searchTerm} in {category} category.
              </p>
              <button 
                onClick={() => {setSearchTerm(""); setCategory("All");}} 
                className="btn btn-link text-amber-500 mt-4"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
