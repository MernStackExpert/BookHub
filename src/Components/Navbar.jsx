"use client";

import { useAuth } from "@/Provider/AuthProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Navbar() {
  const { user, logout , loading } = useAuth();
    const pathname = usePathname();

  const links = (
    <>
      <li>
        <Link
          href="/"
          className={`px-2 py-1 border-b-2 transition ${
            pathname === "/" ? "border-amber-500 text-amber-400" : "border-transparent hover:border-gray-500 text-white"
          }`}
        >
          Home
        </Link>
      </li>

      {user && (
        <li>
          <Link
            href="/allbooks"
            className={`px-2 py-1 border-b-2 transition ${
              pathname === "/allbooks" ? "border-amber-500 text-amber-400" : "border-transparent hover:border-gray-500 text-white"
            }`}
          >
            All Books
          </Link>
        </li>
      )}

      <li>
        <Link
          href="/about"
          className={`px-2 py-1 border-b-2 transition ${
            pathname === "/about" ? "border-amber-500 text-amber-400" : "border-transparent hover:border-gray-500 text-white"
          }`}
        >
          About
        </Link>
      </li>

      <li>
        <Link
          href="/service"
          className={`px-2 py-1 border-b-2 transition ${
            pathname === "/service" ? "border-amber-500 text-amber-400" : "border-transparent hover:border-gray-500 text-white"
          }`}
        >
          Service
        </Link>
      </li>

      <li>
        <Link
          href="/contact"
          className={`px-2 py-1 border-b-2 transition ${
            pathname === "/contact" ? "border-amber-500 text-amber-400" : "border-transparent hover:border-gray-500 text-white"
          }`}
        >
          Contact
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar sticky top-0 z-50 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-200 backdrop-blur-xl shadow-lg border-b border-white/10">
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h12M4 18h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content mt-3 w-52 p-3 rounded-xl bg-gradient-to-br from-[#1a1c2b] via-[#171926] to-[#10121a] text-white shadow-xl space-y-3 border border-white/10"
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <span className="text-2xl font-bold tracking-wide bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          BookHub
        </span>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4 font-semibold">
          {links}
        </ul>
      </div>

      {/* Right Side */}
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User photo"
                  src={user?.photoURL || "/default-avatar.png"}
                />
              </div>
            </div>

            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-black rounded-box z-20 mt-3 w-52 p-2 shadow"
            >
              <li>
                <div className="flex flex-col items-center justify-center border-b border-gray-300 mb-1 pb-1">
                  <h1>{user.displayName}</h1>
                  <h1>{user.email}</h1>
                </div>
              </li>

              <li>
                <Link href={"/addbooks"}> Add Book </Link>
              </li>
              <li>
                <Link href={"/managebooks"}> Manage Book </Link>
              </li>

              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            href="/login"
            className="font-semibold btn bg-gray-800 text-white"
          >
            {
              loading ?<span className="loading loading-infinity loading-md"></span> : 'Login'
            }
          </Link>
        )}
      </div>
    </div>
  );
}
