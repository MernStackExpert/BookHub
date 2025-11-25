"use client";
import { FaBook, FaShippingFast, FaGift, FaHeadset, FaStar, FaTags } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Service() {
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

  const services = [
    {
      icon: <FaBook size={28} className="text-white" />,
      title: "Curated Book Collections",
      desc: "Explore our hand-picked selection of books across genres. We curate only the best reads so that you find exactly what you love.",
      color: "bg-teal-500",
      borderColor: "hover:border-teal-400",
    },
    {
      icon: <FaShippingFast size={28} className="text-white" />,
      title: "Fast Delivery",
      desc: "Receive your books quickly and safely with our premium shipping services. Track your order anytime.",
      color: "bg-purple-500",
      borderColor: "hover:border-purple-400",
    },
    {
      icon: <FaGift size={28} className="text-white" />,
      title: "Gift & Personalized Packs",
      desc: "Send books as gifts with our beautifully wrapped and personalized packages. Perfect for friends and family.",
      color: "bg-amber-500",
      borderColor: "hover:border-amber-400",
    },
    {
      icon: <FaHeadset size={28} className="text-white" />,
      title: "24/7 Customer Support",
      desc: "Our team is always ready to help you with orders, recommendations, or any book-related inquiries, anytime.",
      color: "bg-indigo-500",
      borderColor: "hover:border-indigo-400",
    },
    {
      icon: <FaStar size={28} className="text-white" />,
      title: "Top Rated Books",
      desc: "We provide access to the highest rated books in every category, ensuring you enjoy quality reads every time.",
      color: "bg-teal-500",
      borderColor: "hover:border-teal-400",
    },
    {
      icon: <FaTags size={28} className="text-white" />,
      title: "Special Discounts",
      desc: "Enjoy exclusive offers and discounts on your favorite books. Save more while reading more.",
      color: "bg-purple-500",
      borderColor: "hover:border-purple-400",
    },
  ];

  return (
    <section className="relative w-full py-24 bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-slate-200">
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-10 left-20 w-72 h-72 bg-indigo-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={container} className="text-center mb-20">
          <motion.h2 variants={item} className="text-4xl md:text-5xl font-bold text-white">Our Services</motion.h2>
          <motion.p variants={item} className="text-slate-300 mt-4 max-w-3xl mx-auto text-lg leading-relaxed">
            At BookHub, we offer a wide range of services to make your reading journey enjoyable, convenient, and memorable. From exclusive book collections to fast delivery and personalized support — we've got you covered.
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={container} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, idx) => (
            <motion.div key={idx} variants={item} className={`p-8 bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700 ${service.borderColor} transition shadow-lg hover:shadow-2xl`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`${service.color} p-4 rounded-full flex items-center justify-center`}>{service.icon}</div>
                <h3 className="text-2xl font-bold">{service.title}</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
