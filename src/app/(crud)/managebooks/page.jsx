"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaTrashAlt, FaEdit, FaEye, FaBook } from "react-icons/fa";
import toast from "react-hot-toast";
import useAxios from "@/hooks/useAxios";
import PrivateRoute from "@/PrivateRoute/PrivateRoute";
import { useAuth } from "@/Provider/AuthProvider";
import Swal from "sweetalert2";

export default function ManageBooks() {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosBase = useAxios();

  useEffect(() => {
    const fetchBooks = async () => {
      if (!user?.email) return;

      try {
        const res = await axiosBase.get("/books");
        const myBooks = res.data.filter(
          (book) => book.authorEmail === user.email
        );
        setBooks(myBooks);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [axiosBase, user?.email]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosBase.delete(`/books/${id}`);
          if (res.data.deletedCount > 0) {
            const remainingBooks = books.filter((book) => book._id !== id);
            setBooks(remainingBooks);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        } catch (error) {
          toast.error("Failed to delete book");
        }
      }
    });
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Manage <span className="text-amber-500">My Books</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              My Uploaded Books: {books.length}
            </p>
          </div>
          <Link href="/addbooks">
            <button className="btn bg-teal-600 hover:bg-teal-700 text-white border-none gap-2 shadow-lg shadow-teal-900/20">
              <FaBook /> Add New Book
            </button>
          </Link>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-slate-900 text-slate-300 uppercase text-xs font-semibold tracking-wider">
                <tr>
                  <th className="py-4 pl-6">#</th>
                  <th>Book Info</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="text-slate-300 divide-y divide-slate-800">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-20">
                      <span className="loading loading-spinner loading-lg text-amber-500"></span>
                    </td>
                  </tr>
                ) : books.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-10 text-slate-500"
                    >
                      You haven&apos;t added any books yet.
                    </td>
                  </tr>
                ) : (
                  books.map((book, index) => (
                    <tr
                      key={book._id}
                      className="hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="pl-6 font-mono text-slate-500">
                        {index + 1}
                      </td>

                      <td>
                        <div className="flex items-center gap-4">
                          <div className="avatar ">
                            <div className="mask rounded-sm w-12 h-16 bg-slate-800">
                              <img
                                src={book.image}
                                alt={book.title}
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <div>
                            <div
                              className="font-bold text-white truncate max-w-[200px]"
                              title={book.title}
                            >
                              {book.title}
                            </div>
                            <div className="text-xs opacity-60 bg-slate-800 px-2 py-0.5 rounded inline-block mt-1">
                              ⭐ {book.rating || "N/A"}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="badge badge-ghost badge-sm border-slate-600 font-semibold text-black">
                          {book.category}
                        </span>
                      </td>

                      <td className="font-bold text-amber-500">
                        ${book.price}
                      </td>

                      <td>
                        <div className="flex items-center justify-center gap-2">
                          <Link href={`/allbooks/${book._id}`}>
                            <button
                              className="btn btn-square btn-sm btn-ghost text-slate-400 hover:text-blue-400 tooltip"
                              data-tip="View Details"
                            >
                              <FaEye />
                            </button>
                          </Link>

                          <Link 
                          href={`/updatebooks/${book._id}`}
                            className="btn btn-square btn-sm btn-ghost text-slate-400 hover:text-amber-400 tooltip"
                            data-tip="Edit"
                          >
                            <FaEdit />
                          </Link>

                          <button
                            onClick={() => handleDelete(book._id)}
                            className="btn btn-square btn-sm btn-ghost text-slate-400 hover:text-red-500 hover:bg-red-500/10 tooltip"
                            data-tip="Delete"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
