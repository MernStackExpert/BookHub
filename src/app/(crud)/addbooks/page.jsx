"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCloudUploadAlt, FaStar } from "react-icons/fa";
import { useAuth } from "@/Provider/AuthProvider";
import useAxios from "@/hooks/useAxios";
import PrivateRoute from "@/PrivateRoute/PrivateRoute";
import Swal from "sweetalert2";

export default function AddBooks() {
  const { user } = useAuth();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [imageTab, setImageTab] = useState("upload");
  const axiosBase = useAxios();

  const onSubmit = async (data) => {
    setLoading(true);

    let imgURL = "";
    const imageFile = data.image?.[0];
    const imageURL = data.imageURL;

    try {
      if (imageTab === "upload") {
        if (!imageFile) {
          toast.error("Please upload a book cover!");
          setLoading(false);
          return;
        }

        const uploadUrl = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_image_hosting_key}`;
        const formData = new FormData();
        formData.append("image", imageFile);

        const res = await axios.post(uploadUrl, formData, {
          headers: { "content-type": "multipart/form-data" },
        });

        imgURL = res.data.data.display_url;
      }

      if (imageTab === "url") {
        if (!imageURL) {
          toast.error("Enter an image URL!");
          setLoading(false);
          return;
        }
        imgURL = imageURL;
      }

      const bookData = {
        title: data.title,
        authorName: user?.displayName,
        authorEmail: user?.email,
        category: data.category,
        price: parseFloat(data.price),
        rating: parseFloat(data.rating),
        description: data.description,
        image: imgURL,
        createdAt: new Date(),
      };

      const dbResponse = await axiosBase.post("/books", bookData);

      if (dbResponse.data.insertedId || dbResponse.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Book Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
    } catch (error) {
      toast.error("Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 mt-10">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Add a New <span className="text-amber-500">Book</span>
          </h2>
          <p className="mt-2 text-lg text-slate-400">Share a new masterpiece with the community</p>
        </div>

        <div className="max-w-4xl mx-auto bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label text-slate-300 font-medium">Book Title</label>
                <input
                  type="text"
                  placeholder="e.g. The Alchemist"
                  {...register("title", { required: true })}
                  className="input input-bordered bg-slate-800 border-slate-700 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 w-full"
                />
                {errors.title && <span className="text-red-500 text-xs">Title is required</span>}
              </div>

              <div className="form-control">
                <label className="label text-slate-300 font-medium">Category</label>
                <select
                  {...register("category", { required: true })}
                  className="select select-bordered bg-slate-800 border-slate-700 text-white w-full"
                  defaultValue=""
                >
                  <option disabled value="">Select Category</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Non-Fiction">Non-Fiction</option>
                  <option value="Sci-Fi">Sci-Fi & Fantasy</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Self-Help">Self-Help</option>
                  <option value="Programming">Programming</option>
                  <option value="History">History</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label text-slate-300 font-medium">Author Name</label>
                <input
                  type="text"
                  defaultValue={user?.displayName}
                  readOnly
                  className="input input-bordered bg-slate-800/50 border-slate-700 text-slate-400 cursor-not-allowed w-full"
                />
              </div>

              <div className="form-control">
                <label className="label text-slate-300 font-medium">Author Email</label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  readOnly
                  className="input input-bordered bg-slate-800/50 border-slate-700 text-slate-400 cursor-not-allowed w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label text-slate-300 font-medium">Price ($)</label>
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
                  defaultValue="5"
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
              <label className="label text-slate-300 font-medium">Book Cover</label>

              <div className="tabs tabs-boxed w-full bg-slate-800/50 border border-slate-700">
                <a
                  className={`tab flex-1 ${imageTab === "upload" ? "tab-active bg-amber-600 text-white" : "text-slate-300"}`}
                  onClick={() => setImageTab("upload")}
                >
                  Upload
                </a>
                <a
                  className={`tab flex-1 ${imageTab === "url" ? "tab-active bg-amber-600 text-white" : "text-slate-300"}`}
                  onClick={() => setImageTab("url")}
                >
                  URL
                </a>
              </div>

              {imageTab === "upload" && (
                <div className="relative border-2 border-dashed border-slate-700 rounded-lg p-8 mt-4 bg-slate-800/30 text-center cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    {...register("image")}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center gap-3">
                    <FaCloudUploadAlt className="text-4xl text-slate-400" />
                    <p className="text-sm text-slate-400">Click to upload</p>
                  </div>
                </div>
              )}

              {imageTab === "url" && (
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  {...register("imageURL")}
                  className="input input-bordered bg-slate-800 border-slate-700 text-white w-full mt-4"
                />
              )}
            </div>

            <div className="form-control">
              <label className="label text-slate-300 font-medium">Description</label>
              <textarea
                rows="4"
                {...register("description", { required: true })}
                className="textarea textarea-bordered bg-slate-800 border-slate-700 text-white w-full h-32"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white text-lg font-bold"
            >
              {loading ? <span className="loading loading-dots loading-md"></span> : "Add Book to Collection"}
            </button>
          </form>
        </div>
      </div>
    </PrivateRoute>
  );
}
