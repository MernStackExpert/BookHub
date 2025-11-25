"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCloudUploadAlt, FaStar, FaEdit } from "react-icons/fa";
import useAxios from "@/hooks/useAxios";
import PrivateRoute from "@/PrivateRoute/PrivateRoute";
import Swal from "sweetalert2";

export default function UpdateBook() {
  const { id } = useParams();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const axiosBase = useAxios();

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const res = await axiosBase.get(`/books/${id}`);
        const book = res.data;

        setCurrentImage(book.image);

        setValue("title", book.title);
        setValue("category", book.category);
        setValue("price", book.price);
        setValue("rating", book.rating);
        setValue(
          "description",
          book.description || book.full_desc || book.short_desc
        );
        setValue("authorName", book.authorName);
        setValue("authorEmail", book.authorEmail);

        setLoading(false);
      } catch (error) {
        toast.error("Failed to load book data");
        setLoading(false);
      }
    };

    if (id) fetchBookData();
  }, [id, axiosBase, setValue]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    let imgURL = currentImage;

    try {
      if (data.image && data.image[0]) {
        const imageFile = data.image[0];
        const image_hosting_key = "271869a6b9ececa3a8f8f741c63e00f5";
        const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

        const formData = new FormData();
        formData.append("image", imageFile);

        const res = await axios.post(image_hosting_api, formData, {
          headers: { "content-type": "multipart/form-data" },
        });

        imgURL = res.data.data.display_url;
      }

      const updatedBookData = {
        title: data.title,
        category: data.category,
        price: parseFloat(data.price),
        rating: parseFloat(data.rating),
        description: data.description,
        image: imgURL,
      };

      const dbResponse = await axiosBase.patch(`/books/${id}`, updatedBookData);

      if (dbResponse.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Book Updated Successfully!✅",
          showConfirmButton: false,
          timer: 1500,
        });

        router.push("/managebooks");
      } else {
        toast.success("No changes made.");
      }
    } catch (error) {
      toast.error("Failed to update book.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-amber-500"></span>
      </div>
    );
  }

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 mt-10">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Update <span className="text-amber-500">Book</span>
          </h2>
          <p className="mt-2 text-lg text-slate-400">
            Edit details for this masterpiece
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label text-slate-300 font-medium">
                  Book Title
                </label>
                <input
                  type="text"
                  {...register("title", { required: true })}
                  className="input input-bordered bg-slate-800 border-slate-700 text-white focus:border-amber-500 w-full"
                />
                {errors.title && (
                  <span className="text-red-500 text-xs">
                    Title is required
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label text-slate-300 font-medium">
                  Category
                </label>
                <select
                  {...register("category", { required: true })}
                  className="select select-bordered bg-slate-800 border-slate-700 text-white focus:border-amber-500 w-full"
                >
                  <option value="Fiction">Fiction</option>
                  <option value="Non-Fiction">Non-Fiction</option>
                  <option value="Sci-Fi">Sci-Fi & Fantasy</option>
                  <option value="Mystery">Mystery & Thriller</option>
                  <option value="Self-Help">Self-Help</option>
                  <option value="Programming">Programming</option>
                  <option value="History">History</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label text-slate-300 font-medium">
                  Author Name
                </label>
                <input
                  type="text"
                  {...register("authorName")}
                  readOnly
                  className="input input-bordered bg-slate-800/50 border-slate-700 text-slate-500 cursor-not-allowed w-full"
                />
              </div>

              <div className="form-control">
                <label className="label text-slate-300 font-medium">
                  Author Email
                </label>
                <input
                  type="email"
                  {...register("authorEmail")}
                  readOnly
                  className="input input-bordered bg-slate-800/50 border-slate-700 text-slate-500 cursor-not-allowed w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label text-slate-300 font-medium">
                  Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("price", { required: true })}
                  className="input input-bordered bg-slate-800 border-slate-700 text-white w-full"
                />
              </div>

              <div className="form-control">
                <label className="label text-slate-300 font-medium flex items-center gap-2">
                  Rating <FaStar className="text-amber-400 text-xs" />
                </label>
                <select
                  {...register("rating", { required: true })}
                  className="select select-bordered bg-slate-800 border-slate-700 text-white w-full"
                >
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Good</option>
                  <option value="3">3 - Average</option>
                  <option value="2">2 - Fair</option>
                  <option value="1">1 - Poor</option>
                </select>
              </div>
            </div>

            <div className="form-control">
              <label className="label text-slate-300 font-medium">
                Book Cover
              </label>

              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="avatar">
                  <div className="w-24 h-32 rounded-lg ring ring-slate-700">
                    <img src={currentImage} alt="Current Cover" />
                  </div>
                </div>

                <div className="relative border-2 border-dashed border-slate-700 rounded-lg p-6 bg-slate-800/30 hover:bg-slate-800/50 transition-all text-center cursor-pointer flex-1 w-full">
                  <input
                    type="file"
                    accept="image/*"
                    {...register("image")}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="flex flex-col items-center gap-2">
                    <FaCloudUploadAlt className="text-3xl text-slate-400" />
                    <p className="text-sm text-slate-400 font-medium">
                      Change Cover Photo
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-control">
              <label className="label text-slate-300 font-medium">
                Description
              </label>
              <textarea
                rows="4"
                {...register("description", { required: true })}
                className="textarea textarea-bordered bg-slate-800 border-slate-700 text-white w-full h-32"
              ></textarea>
            </div>

            <div className="pt-4 flex gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="btn btn-outline border-slate-600 text-slate-300 hover:bg-slate-800 flex-1"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="btn flex-1 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white border-none shadow-lg text-lg font-bold"
              >
                {submitting ? (
                  <span className="loading loading-dots loading-md"></span>
                ) : (
                  <>
                    <FaEdit /> Update Book
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </PrivateRoute>
  );
}
