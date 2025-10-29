import React from "react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();

  return (
    <div className="relative flex justify-center items-center min-h-screen px-4 bg-gray-100 dark:bg-slate-900">
      {/* Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 px-4 py-2 rounded-md border  border-gray-400 text-cyan-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors duration-200 text-sm font-medium"
      >
        ← Back to Home
      </button>

      {/* Contact Form */}
      <div className="max-w-lg w-full bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-cyan-800 dark:text-white">
          Contact Us
        </h2>

        <form className="space-y-5">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Message
            </label>
            <textarea
              placeholder="Write your message..."
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
