"use client";
import React from "react";
import { FaUserFriends, FaQuoteLeft, FaGlobeAsia, FaRegClock, FaLeaf } from "react-icons/fa";
import { motion } from "framer-motion";

export default function About() {
  const container = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2 }
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative w-full py-24 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-200">
      <div className="absolute inset-0 -z-10 opacity-25">
        <div className="absolute top-10 left-20 w-72 h-72 bg-teal-500 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-10 right-20 w-72 h-72 bg-purple-600 rounded-full blur-[150px]"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-amber-500 rounded-full blur-[200px] -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
            className="w-full lg:w-1/2 relative"
          >
            <motion.div variants={item} className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
              <img
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop"
                alt="BookHub Library"
                className="w-full h-[420px] object-cover"
              />
            </motion.div>

            <motion.div variants={item} className="absolute -bottom-12 -right-6 bg-slate-800/70 backdrop-blur-xl border border-slate-700 shadow-xl rounded-xl p-5 hidden md:block">
              <div className="flex items-start gap-3">
                <div className="bg-teal-200 text-teal-600 p-2 rounded-full">
                  <FaQuoteLeft size={20} />
                </div>
                <div>
                  <p className="text-slate-100 font-semibold text-sm leading-snug">
                    Books are the mirrors of the soul. They allow us to explore worlds beyond imagination.
                  </p>
                  <p className="text-slate-400 text-xs mt-1">— Virginia Woolf</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={item} className="absolute -top-10 -left-10 opacity-30">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <defs>
                  <pattern
                    id="dotPattern"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="3" cy="3" r="3" fill="#34d399" />
                  </pattern>
                </defs>
                <rect width="120" height="120" fill="url(#dotPattern)" />
              </svg>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
            className="w-full lg:w-1/2 space-y-7"
          >
            <motion.span variants={item} className="px-4 py-2 text-sm font-bold rounded-full border border-teal-400 text-teal-300 w-fit">
              About BookHub
            </motion.span>

            <motion.h2 variants={item} className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
              Your Gateway To A World Of
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-amber-400">
                {" "}Endless Stories
              </span>
            </motion.h2>

            <motion.p variants={item} className="text-lg text-slate-300 leading-relaxed">
              BookHub is more than just an online bookstore — it s a sanctuary for dreamers, thinkers, and storytellers. Founded in 2024, our mission is to transform the way people read and connect with knowledge. Whether you’re chasing fantasy worlds, expanding your skills, or diving into timeless classics, BookHub is your ultimate companion.
            </motion.p>

            <motion.p variants={item} className="text-slate-400 leading-relaxed">
              We believe in building a global reading culture that inspires, educates, and entertains. Every book we present is handpicked to deliver inspiration, comfort, and curiosity.
            </motion.p>

            <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex items-center gap-4 p-4 bg-slate-800/40 rounded-xl border border-slate-700 hover:border-teal-500 transition-all duration-200">
                <FaGlobeAsia size={32} className="text-teal-400" />
                <div>
                  <h4 className="font-semibold text-white text-lg">Global Reach</h4>
                  <p className="text-slate-400 text-sm">Readers from 30+ countries</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-800/40 rounded-xl border border-slate-700 hover:border-amber-500 transition-all duration-200">
                <FaRegClock size={32} className="text-amber-400" />
                <div>
                  <h4 className="font-semibold text-white text-lg">Fast Delivery</h4>
                  <p className="text-slate-400 text-sm">Quick & reliable order process</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-800/40 rounded-xl border border-slate-700 hover:border-purple-500 transition-all duration-200">
                <FaLeaf size={32} className="text-purple-400" />
                <div>
                  <h4 className="font-semibold text-white text-lg">Eco-Friendly</h4>
                  <p className="text-slate-400 text-sm">Sustainable packaging</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-800/40 rounded-xl border border-slate-700 hover:border-teal-400 transition-all duration-200">
                <FaUserFriends size={32} className="text-teal-300" />
                <div>
                  <h4 className="font-semibold text-white text-lg">Reader Community</h4>
                  <p className="text-slate-400 text-sm">5k+ active members</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={item} className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <h3 className="text-4xl font-extrabold text-teal-400">12k+</h3>
                <p className="text-slate-400 text-sm">Books Sold</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-extrabold text-amber-400">7k+</h3>
                <p className="text-slate-400 text-sm">Happy Readers</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-extrabold text-purple-400">4.9</h3>
                <p className="text-slate-400 text-sm">User Rating</p>
              </div>
            </motion.div>

            <motion.button
              variants={item}
              className="btn btn-primary bg-gradient-to-r from-teal-500 to-amber-500 border-none text-white mt-8 px-10 py-3 text-lg rounded-xl hover:opacity-90 transition"
            >
              Discover Our Books
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
