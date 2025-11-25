"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCloudUploadAlt, FaStar } from "react-icons/fa";
import { useAuth } from "@/Provider/AuthProvider";
import useAxios from "@/hooks/useAxios";
import PrivateRoute from "@/PrivateRoute/PrivateRoute";

export default function AddBooks() {
  const { user } = useAuth();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const axiosBase = useAxios();

  const onSubmit = async (data) => {
    setLoading(true);
    const imageFile = data.image[0];

    if (!imageFile) {
      toast.error("Please upload a book cover!");
      setLoading(false);
      return;
    }

    try {
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_image_hosting_key}`;
      
      const formData = new FormData();
      formData.append("image", imageFile);

      const res = await axios.post(image_hosting_api, formData, {
        headers: { "content-type": "multipart/form-data" },
      });
      
      const imgURL = res.data.data.display_url;

      // 2. Prepare Data for Database
      const bookData = {
        title: data.title,
        authorName: user?.displayName || data.authorName,
        authorEmail: user?.email || data.authorEmail,
        category: data.category,
        price: parseFloat(data.price),
        rating: parseFloat(data.rating),
        description: data.description,
        image: imgURL,
        createdAt: new Date(),
      };

      // 3. Send to Backend
      const dbResponse = await axiosBase.post("/books", bookData);
      
      if(dbResponse.data.insertedId || dbResponse.status === 200 || dbResponse.status === 201) {
          toast.success("Book Added Successfully!");
          reset();
      }

    } catch (error) {
      console.error(error);
      toast.error("Failed to add book. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-10 mt-10">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Add a New <span className="text-amber-500">Book</span>
          </h2>
          <p className="mt-2 text-lg text-slate-400">
            Share a new masterpiece with the community
          </p>
        </div>

        {/* Form Card */}
        <div className="max-w-4xl mx-auto bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl p-8">
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Row 1: Title & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label text-slate-300 font-medium">Book Title</label>
                <input
                  type="text"
                  placeholder="e.g. The Alchemist"
                  {...register("title", { required: true })}
                  className="input input-bordered bg-slate-800 border-slate-700 text-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 w-full placeholder-slate-500"
                />
                {errors.title && <span className="text-red-500 text-xs mt-1">Title is required</span>}
              </div>

              <div className="form-control">
                <label className="label text-slate-300 font-medium">Category</label>
                <select 
                    {...register("category", { required: true })}
                    className="select select-bordered bg-slate-800 border-slate-700 text-white focus:border-amber-500 w-full"
                    defaultValue=""
                >
                    <option disabled value="">Select Category</option>
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

            {/* Row 2: Author Info (Read Only) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label text-slate-300 font-medium">Author Name</label>
                <input
                  type="text"
                  defaultValue={user?.displayName}
                  {...register("authorName")}
                  readOnly
                  className="input input-bordered bg-slate-800/50 border-slate-700 text-slate-400 cursor-not-allowed w-full"
                />
              </div>

              <div className="form-control">
                <label className="label text-slate-300 font-medium">Author Email</label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  {...register("authorEmail")}
                  readOnly
                  className="input input-bordered bg-slate-800/50 border-slate-700 text-slate-400 cursor-not-allowed w-full"
                />
              </div>
            </div>

            {/* Row 3: Price & Rating */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label text-slate-300 font-medium">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="20.00"
                  {...register("price", { required: true, min: 0 })}
                  className="input input-bordered bg-slate-800 border-slate-700 text-white focus:border-amber-500 w-full placeholder-slate-500"
                />
              </div>

              <div className="form-control">
                <label className="label text-slate-300 font-medium flex items-center gap-2">
                    Rating <FaStar className="text-amber-400 text-xs"/>
                </label>
                <select 
                    {...register("rating", { required: true })}
                    className="select select-bordered bg-slate-800 border-slate-700 text-white focus:border-amber-500 w-full"
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

            {/* Row 4: Image Upload */}
            <div className="form-control">
              <label className="label text-slate-300 font-medium">Book Cover Image</label>
              <div className="relative border-2 border-dashed border-slate-700 rounded-lg p-8 bg-slate-800/30 hover:bg-slate-800/50 hover:border-amber-500 transition-all text-center cursor-pointer group">
                 <input 
                    type="file" 
                    accept="image/*"
                    {...register("image", { required: true })}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                 />
                 <div className="flex flex-col items-center justify-center gap-3">
                    <div className="p-3 bg-slate-800 rounded-full group-hover:bg-amber-500/20 transition-colors">
                        <FaCloudUploadAlt className="text-4xl text-slate-400 group-hover:text-amber-500 transition-colors" />
                    </div>
                    <p className="text-sm text-slate-400 font-medium group-hover:text-slate-200">
                        Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-slate-500">SVG, PNG, JPG or GIF (MAX. 2MB)</p>
                 </div>
              </div>
              {errors.image && <span className="text-red-500 text-xs mt-1">Cover image is required</span>}
            </div>

            {/* Row 5: Description */}
            <div className="form-control">
              <label className="label text-slate-300 font-medium">Description</label>
              <textarea
                rows="4"
                placeholder="Write a short summary about the book content..."
                {...register("description", { required: true })}
                className="textarea textarea-bordered bg-slate-800 border-slate-700 text-white focus:border-amber-500 w-full h-32 placeholder-slate-500"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="btn w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white border-none shadow-lg shadow-amber-900/20 text-lg font-bold"
              >
                {loading ? <span className="loading loading-dots loading-md"></span> : "Add Book to Collection"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </PrivateRoute>
  );
}