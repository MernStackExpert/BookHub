"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaCloudUploadAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuth } from "@/Provider/AuthProvider";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageTab, setImageTab] = useState("upload");
  const { loginWithGoogle, register } = useAuth();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      toast.success("Welcome to BookHub!");
      router.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const imageFile = form.image?.files?.[0];
    const imageURL = form.imageURL?.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!passwordRegex.test(password)) {
      toast.error("Password must contain 1 uppercase, 1 lowercase, 1 number and 6+ chars.");
      setLoading(false);
      return;
    }

    let photoURL = "";

    if (imageTab === "upload") {
      if (!imageFile) {
        toast.error("Please upload a profile picture.");
        setLoading(false);
        return;
      }

      const api = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_image_hosting_key}`;
      const formData = new FormData();
      formData.append("image", imageFile);
      const res = await axios.post(api, formData, {
        headers: { "content-type": "multipart/form-data" },
      });
      photoURL = res.data.data.display_url;
    }

    if (imageTab === "url") {
      if (!imageURL) {
        toast.error("Please enter a valid image URL.");
        setLoading(false);
        return;
      }
      photoURL = imageURL;
    }

    try {
      await register(email, password, name, photoURL);
      toast.success("Registration Successful!");
      form.reset();
      router.push("/");
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white relative overflow-hidden py-10">
      <div className="absolute top-0 left-0 w-96 h-96 bg-teal-900/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-900/20 rounded-full blur-3xl"></div>

      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-amber-500 transition-colors"
      >
        <FaArrowLeft /> Back to Home
      </Link>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-slate-900/50 backdrop-blur-lg border border-slate-800 rounded-2xl shadow-2xl overflow-hidden m-4">
        <div
          className="hidden md:flex flex-col justify-between p-10 bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1000&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold font-serif">
              Join the <br /> <span className="text-amber-500">Community</span>
            </h2>
          </div>
          <div className="relative z-10">
            <p className="text-slate-300 italic text-lg">
              Books are a uniquely portable magic.
            </p>
            <p className="text-slate-400 text-sm mt-2">- Stephen King</p>
          </div>
        </div>

        <div className="flex flex-col justify-center p-8 md:p-12 w-full">
          <div className="mb-6 text-center md:text-left">
            <h3 className="text-3xl font-bold">Create Account</h3>
            <p className="text-slate-400 mt-2">Start your reading journey today</p>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full border-slate-700 text-white hover:bg-slate-800 flex items-center gap-3 mb-6"
          >
            <FaGoogle className="text-amber-500" /> Sign up with Google
          </button>

          <div className="divider divider-start text-slate-600 text-xs mb-6">OR REGISTER WITH EMAIL</div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="form-control">
              <label className="label text-xs text-slate-400 font-semibold">FULL NAME</label>
              <input
                type="text"
                name="name"
                className="input input-bordered bg-slate-950/50 border-slate-700 text-white w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="label text-xs text-slate-400 font-semibold">PROFILE PICTURE</label>

              <div className="bg-slate-900/40 border border-slate-700 rounded-xl p-4">
                <div className="tabs tabs-boxed w-full bg-slate-800/50 border border-slate-700">
                  <a
                    className={`tab flex-1 text-slate-300 ${
                      imageTab === "upload" ? "tab-active bg-amber-600 text-white" : ""
                    }`}
                    onClick={() => setImageTab("upload")}
                  >
                    Upload
                  </a>

                  <a
                    className={`tab flex-1 text-slate-300 ${
                      imageTab === "url" ? "tab-active bg-amber-600 text-white" : ""
                    }`}
                    onClick={() => setImageTab("url")}
                  >
                    URL
                  </a>
                </div>

                {imageTab === "upload" && (
                  <div className="mt-4 relative">
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      className="file-input file-input-bordered bg-slate-950/50 border-slate-700 text-slate-300 w-full pl-10"
                    />
                    <FaCloudUploadAlt className="absolute left-3 top-3 text-slate-500" />
                  </div>
                )}

                {imageTab === "url" && (
                  <div className="mt-4">
                    <input
                      type="text"
                      name="imageURL"
                      placeholder="https://example.com/photo.jpg"
                      className="input input-bordered bg-slate-950/50 border-slate-700 text-white w-full"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="form-control">
              <label className="label text-xs text-slate-400 font-semibold">EMAIL ADDRESS</label>
              <input
                type="email"
                name="email"
                className="input input-bordered bg-slate-950/50 border-slate-700 text-white w-full"
                required
              />
            </div>

            <div className="form-control relative">
              <label className="label text-xs text-slate-400 font-semibold">PASSWORD</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="input input-bordered bg-slate-950/50 border-slate-700 text-white w-full pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[36px] text-slate-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white border-none w-full mt-4 shadow-lg"
            >
              {loading ? <span className="loading loading-spinner"></span> : "Create Account"}
            </button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-amber-500 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
