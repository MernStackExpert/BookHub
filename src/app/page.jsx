"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaStar, FaBookOpen } from "react-icons/fa";
import useAxios from "@/hooks/useAxios";
import { useAuth } from "@/Provider/AuthProvider";
import { motion } from "framer-motion";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosBase = useAxios();
  const { user } = useAuth();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axiosBase.get("/books");
        const latestBooks = res.data.reverse().slice(0, 9);
        setBooks(latestBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [axiosBase]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-amber-500 selection:text-white">
      <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1920&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/80 to-slate-950"></div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md mb-4"
          >
            <span className="text-amber-400 text-sm font-semibold tracking-wide uppercase">
              Welcome to BookHub
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white leading-tight drop-shadow-lg"
          >
            Discover Your Next <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Great Adventure
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Explore our curated collection of bestsellers, classics, and hidden
            gems. Join our community of readers today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="pt-6 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/allbooks">
              <button className="btn btn-lg bg-amber-600 hover:bg-amber-700 text-white border-none rounded-full px-8 shadow-lg shadow-amber-900/40 transition-transform hover:scale-105">
                Explore Books
              </button>
            </Link>
            {user ? (
              <Link href="/addbooks">
                <button className="btn btn-lg btn-outline text-white border-slate-500 hover:bg-slate-800 hover:border-slate-400 rounded-full px-8">
                  Add Book
                </button>
              </Link>
            ) : (
              <Link href="/register">
                <button className="btn btn-lg btn-outline text-white border-slate-500 hover:bg-slate-800 hover:border-slate-400 rounded-full px-8">
                  Join Community
                </button>
              </Link>
            )}
          </motion.div>
        </motion.div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-teal-600/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-600/20 blur-3xl rounded-full"></div>
      </section>

      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4 border-b border-slate-800 pb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Fresh <span className="text-teal-400">Arrivals</span>
            </h2>
            <p className="text-slate-400">
              Check out the latest additions to our library.
            </p>
          </div>
          <Link
            href="/allbooks"
            className="hidden md:flex items-center gap-2 text-amber-500 hover:text-amber-400 font-medium transition-colors group"
          >
            View All Books{" "}
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-96 bg-slate-900 rounded-2xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {books.map((book) => (
              <motion.div
                key={book._id}
                variants={item}
                className="group relative bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-900/20 transition-all duration-500"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
                  <span className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-sm text-teal-400 text-xs font-bold px-3 py-1 rounded-full border border-teal-500/30">
                    {book.category}
                  </span>
                </div>
                <div className="p-6 relative">
                  <div className="flex items-center gap-1 mb-2 text-amber-400 text-sm">
                    <FaStar />
                    <span className="text-slate-300 ml-1">{book.rating || 4.5}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-500 transition-colors line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">by {book.authorName}</p>
                  <div className="flex items-center justify-between mt-4 border-t border-slate-800 pt-4">
                    <span className="text-2xl font-bold text-white">${book.price}</span>
                    <Link href={`/allbooks/${book._id}`}>
                      <button className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors">
                        <FaBookOpen className="text-amber-500" /> Details
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        <div className="mt-12 text-center md:hidden">
          <Link href="/allbooks">
            <button className="btn btn-outline w-full border-amber-600 text-amber-500 hover:bg-amber-600 hover:text-white">
              View All Collection
            </button>
          </Link>
        </div>
      </section>

      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            Trending <span className="text-amber-500">Categories</span>
          </h2>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
          >
            {["Fantasy", "History", "Sci-Fi", "Mystery", "Self-Help", "Programming"].map((cat, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl text-center cursor-pointer hover:border-amber-500/40 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-amber-900/30 backdrop-blur-md"
              >
                <p className="text-lg font-semibold text-white">{cat}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Why Readers <span className="text-teal-400">Love BookHub</span>
          </h2>
          <p className="text-slate-400 mb-16 max-w-2xl mx-auto">
            We bring knowledge, stories, and imagination to your
            fingertips—curated with care and crafted for dreamers.
          </p>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
          >
            <motion.div
              variants={item}
              className="bg-slate-900/40 p-8 rounded-2xl border border-slate-800 hover:border-teal-400/40 transition shadow-xl hover:shadow-teal-900/30"
            >
              <div className="text-teal-400 text-4xl mb-4">📚</div>
              <h3 className="text-xl text-white font-semibold mb-2">Massive Collection</h3>
              <p className="text-slate-400 text-sm">
                Thousands of books across all genres available at your
                fingertips.
              </p>
            </motion.div>

            <motion.div
              variants={item}
              className="bg-slate-900/40 p-8 rounded-2xl border border-slate-800 hover:border-amber-400/40 transition shadow-xl hover:shadow-amber-900/30"
            >
              <div className="text-amber-400 text-4xl mb-4">⚡</div>
              <h3 className="text-xl text-white font-semibold mb-2">Fast & Smooth</h3>
              <p className="text-slate-400 text-sm">
                Lightning-fast search, quick browsing, and seamless reading
                experience.
              </p>
            </motion.div>

            <motion.div
              variants={item}
              className="bg-slate-900/40 p-8 rounded-2xl border border-slate-800 hover:border-rose-400/40 transition shadow-xl hover:shadow-rose-900/30"
            >
              <div className="text-rose-400 text-4xl mb-4">🎨</div>
              <h3 className="text-xl text-white font-semibold mb-2">Beautiful UI</h3>
              <p className="text-slate-400 text-sm">
                Modern, aesthetic and distraction-free reading layout designed
                for comfort.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-slate-400 mb-8">
            Subscribe to get the latest book updates and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered bg-slate-950 border-slate-700 text-white w-full focus:border-amber-500"
            />
            <button className="btn bg-teal-600 hover:bg-teal-700 text-white border-none">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
