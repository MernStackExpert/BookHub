"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FaGoogle, FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuth } from "@/Provider/AuthProvider";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loginWithGoogle, login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectPath = searchParams.get("redirect") || "/";

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Succesfull",
        showConfirmButton: false,
        timer: 1500,
      });
      router.replace(redirectPath);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await login(email, password);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Succesfull",
        showConfirmButton: false,
        timer: 1500,
      });
      router.replace(redirectPath);
    } catch (error) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-teal-900/20 rounded-full blur-3xl mix-blend-screen"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-900/20 rounded-full blur-3xl mix-blend-screen"></div>

      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-amber-500 transition-colors z-20"
      >
        <FaArrowLeft /> Back to Home
      </Link>

      <div className="w-full max-w-5xl h-full md:h-[600px] grid grid-cols-1 md:grid-cols-2 bg-slate-900/50 backdrop-blur-lg border border-slate-800 rounded-2xl shadow-2xl overflow-hidden m-4">
        <div
          className="hidden md:flex flex-col justify-between p-10 bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white font-serif">
              Welcome to <br /> <span className="text-amber-500">BookHub</span>
            </h2>
          </div>

          <div className="relative z-10">
            <p className="text-slate-300 italic text-lg">
              Reading is essential for those who seek to rise above the
              ordinary.
            </p>
            <p className="text-slate-400 text-sm mt-2">- Jim Rohn</p>
          </div>
        </div>

        <div className="flex flex-col justify-center p-8 md:p-12 w-full">
          <div className="mb-8 text-center md:text-left">
            <h3 className="text-3xl font-bold text-white">Sign In</h3>
            <p className="text-slate-400 mt-2">Access your digital library</p>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full border-slate-700 text-white hover:bg-slate-800 hover:border-slate-600 normal-case flex items-center gap-3 mb-6"
          >
            <FaGoogle className="text-amber-500" />
            Continue with Google
          </button>

          <div className="divider divider-start text-slate-600 text-xs mb-6">
            OR LOGIN WITH EMAIL
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-control">
              <label className="label text-xs text-slate-400 font-semibold">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="input input-bordered bg-slate-950/50 border-slate-700 focus:border-amber-500 text-white w-full"
                required
              />
            </div>

            <div className="form-control relative">
              <div className="flex justify-between items-center mb-1">
                <label className="label text-xs text-slate-400 font-semibold">
                  PASSWORD
                </label>
                <Link
                  href="#"
                  className="text-xs text-amber-500 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="input input-bordered bg-slate-950/50 border-slate-700 focus:border-amber-500 text-white w-full pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[34px] text-slate-500 hover:text-white transition-colors"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              className="btn bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white border-none w-full mt-2 shadow-lg shadow-amber-900/20"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-8">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-amber-500 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
