"use client";
import { useAuth } from "@/Provider/AuthProvider";
import { useRouter, usePathname } from "next/navigation"; 
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {

      router.push(`/login?redirect=${pathname}`);
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <span className="loading loading-spinner loading-lg text-amber-500"></span>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return null;
};

export default PrivateRoute;