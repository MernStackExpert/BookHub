"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaArrowLeft,
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaShareAlt,
  FaTag,
} from "react-icons/fa";
import toast from "react-hot-toast";
import useAxios from "@/hooks/useAxios";
import Swal from "sweetalert2";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosBase = useAxios();
  const router = useRouter();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await axiosBase.get(`/books/${id}`);
        setBook(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load book details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBookDetails();
  }, [id, axiosBase]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-amber-500"></span>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <h2 className="text-3xl font-bold mb-4">Book Not Found</h2>
        <button onClick={() => router.back()} className="btn btn-warning">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-amber-500 transition-colors"
        >
          <FaArrowLeft /> Back to Library
        </button>
      </div>

      <div className="max-w-7xl mx-auto bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative bg-slate-900 p-8 flex items-center justify-center h-full min-h-[400px] lg:min-h-[600px]">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-transparent"></div>

            <div className="relative z-10 w-64 md:w-80 lg:w-96 aspect-[2/3] shadow-2xl rounded-r-lg transform transition-transform hover:scale-105 duration-500">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-r-4 border-slate-700"
              />
            </div>

            <div className="absolute top-6 right-6 flex flex-col gap-4 z-20">
              <button className="p-3 bg-slate-800/80 backdrop-blur rounded-full text-slate-400 hover:text-red-500 hover:bg-slate-700 transition-all shadow-lg border border-slate-700">
                <FaHeart size={20} />
              </button>
              <button className="p-3 bg-slate-800/80 backdrop-blur rounded-full text-slate-400 hover:text-blue-500 hover:bg-slate-700 transition-all shadow-lg border border-slate-700">
                <FaShareAlt size={20} />
              </button>
            </div>
          </div>

          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <span className="badge badge-lg bg-teal-500/10 text-teal-400 border-teal-500/20 px-4 py-3 rounded-full font-medium flex gap-2 items-center">
                <FaTag size={12} /> {book.category}
              </span>
              <span className="flex items-center gap-1 text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 font-bold text-sm">
                <FaStar /> {book.rating || 4.5}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-2">
              {book.title}
            </h1>

            <p className="text-xl text-slate-400 font-medium mb-8">
              by <span className="text-amber-500">{book.authorName}</span>
            </p>

            <div className="flex items-end gap-4 mb-8 border-b border-slate-800 pb-8">
              <span className="text-5xl font-bold text-white">
                ${book.price}
              </span>
              {book.oldPrice && (
                <span className="text-xl text-slate-500 line-through mb-2">
                  ${book.oldPrice}
                </span>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Description
                </h3>
                <p className="text-slate-400 leading-relaxed text-lg">
                  {book.description ||
                    book.full_desc ||
                    book.short_desc ||
                    "No description available for this book."}
                </p>
              </div>

              {book.authorEmail && (
                <div className="text-sm text-slate-500 mt-2">
                  Author Contact: {book.authorEmail}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => {
                    Swal.fire({
                      title: "Good job!",
                      text: "Buy Successfull ✅",
                      icon: "success",
                    });
                  }}
                  className="btn btn-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white border-none shadow-lg shadow-amber-900/20 flex-1 gap-3"
                >
                  <FaShoppingCart /> Buy Now
                </button>
                <button
                  onClick={() => {
                    Swal.fire({
                      title: "Good job!",
                      text: "Book Add To WishList",
                      icon: "success",
                    });
                  }}
                  className="btn btn-lg btn-outline border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white flex-1"
                >
                  Add to Wishlist
                </button>
              </div>

              <p className="text-xs text-slate-500 text-center sm:text-left mt-4">
                *Digital delivery available immediately after purchase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
