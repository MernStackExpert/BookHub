"use client";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Contact() {
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

  const contacts = [
    {
      icon: <FaEnvelope size={25} className="text-white" />,
      title: "Email Us",
      desc: "mdnirob30k@gmail.com",
      bg: "bg-teal-600",
      borderHover: "hover:border-teal-400",
    },
    {
      icon: <FaPhoneAlt size={25} className="text-white" />,
      title: "Call Us",
      desc: "+880 1908716502",
      bg: "bg-amber-500",
      borderHover: "hover:border-amber-400",
    },
    {
      icon: <FaMapMarkerAlt size={25} className="text-white" />,
      title: "Visit Us",
      desc: "Rajshahi, Bangladesh",
      bg: "bg-purple-500",
      borderHover: "hover:border-purple-400",
    },
  ];

  return (
    <section className="relative w-full py-20 bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-slate-200">
      <div className="absolute top-0 left-0 w-72 h-72 bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={container} className="container mx-auto px-6 relative z-10">
        <motion.div variants={item} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">Get in Touch</h2>
          <p className="text-slate-300 mt-4 text-lg max-w-2xl mx-auto">
            We’d love to hear from you! Whether you have questions about our books,
            services, or anything else — our team is ready to answer.
          </p>
        </motion.div>

        <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div variants={container} className="space-y-10">
            {contacts.map((c, idx) => (
              <motion.div key={idx} variants={item} className={`p-6 bg-slate-800/40 backdrop-blur-md rounded-xl border border-slate-700 ${c.borderHover} transition`}>
                <div className="flex items-center gap-4">
                  <div className={`${c.bg} p-4 rounded-full text-white flex items-center justify-center`}>{c.icon}</div>
                  <div>
                    <h4 className="text-xl font-semibold">{c.title}</h4>
                    <p className="text-slate-300">{c.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.form variants={item} className="space-y-6 bg-slate-800/30 backdrop-blur-xl p-10 rounded-2xl border border-slate-700 shadow-lg">
            <h3 className="text-3xl font-bold mb-4 text-white">Send a Message</h3>
            <div className="form-control flex-col flex space-y-2">
              <label className="label">
                <span className="label-text text-slate-300">Your Name</span>
              </label>
              <input type="text" placeholder="Enter your name" className="input input-bordered bg-slate-900/40 border-slate-700 text-white" />
            </div>
            <div className="form-control flex-col flex space-y-2">
              <label className="label">
                <span className="label-text text-slate-300">Email Address</span>
              </label>
              <input type="email" placeholder="Enter your email" className="input input-bordered bg-slate-900/40 border-slate-700 text-white" />
            </div>
            <div className="form-control flex-col flex space-y-2">
              <label className="label">
                <span className="label-text text-slate-300">Message</span>
              </label>
              <textarea className="textarea textarea-bordered h-32 bg-slate-900/40 border-slate-700 text-white" placeholder="Write your message..."></textarea>
            </div>
            <button className="btn bg-teal-600 hover:bg-teal-700 border-none text-white w-full text-lg">Send Message</button>
          </motion.form>
        </motion.div>
      </motion.div>
    </section>
  );
}
