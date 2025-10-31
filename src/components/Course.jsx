import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function Course() {
  const [book, setBook] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("premium"); // default = premium
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState("");

  // ✅ Use environment variable for backend URL
  const BASE_URL = import.meta.env.VITE_BASE_URL || "https://bookstore-app-final.onrender.com";

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/book`);
        setBook(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // stop loading after fetch
      }
    };
    getBook();
  }, [BASE_URL]);

  const handlePremiumClick = () => {
    if (location.pathname === "/course") {
      setMessage("You are already in the Premium section!");
      setTimeout(() => setMessage(""), 3000);
    } else {
      navigate("/course");
    }
  };

  // ✅ Filter by search + category
  const filteredBooks = book.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      category === "all"
        ? true
        : category === "free"
        ? item.price === 0
        : item.price > 0;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 pt-28">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-bold">
            Unlock Your Full Potential with Our{" "}
            <span className="text-pink-500">Premium</span> Courses!
          </h1>

          <p className="mt-6 md:mt-12 max-w-3xl mx-auto text-left md:text-center">
            <strong>Why Choose Our Paid Books?</strong>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>
                <strong>Curated Collection:</strong> Only the best titles for
                readers who value quality.
              </li>
              <li>
                <strong>Expert Authors:</strong> Gain insights, ideas, and
                knowledge from renowned writers.
              </li>
              <li>
                <strong>Digital & Physical Options:</strong> Access your
                favorite books anytime, anywhere.
              </li>
              <li>
                <strong>Support Authors:</strong> Your purchase helps authors
                continue creating valuable content.
              </li>
              <li>
                <strong>Expand Your Library:</strong> Explore stories, knowledge,
                and ideas that enrich your life and spark creativity.
              </li>
            </ul>
          </p>

          {/* Filter Buttons */}
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => {
                setCategory("free");
                navigate("/");
              }}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
            >
              Free Books
            </button>
            <button
              onClick={() => {
                setCategory("premium");
                handlePremiumClick();
              }}
              className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition duration-300"
            >
              Premium Books
            </button>
          </div>

          {message && (
            <p className="mt-4 text-yellow-400 font-semibold">{message}</p>
          )}

          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
          >
            Back
          </button>
        </div>

        {/* 🔍 Search + Category Selector */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-10">
          <input
            type="text"
            placeholder="Search courses..."
            className="border p-2 rounded w-full md:w-1/2 text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="border p-2 rounded text-black"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="free">Free</option>
            <option value="premium">Premium</option>
          </select>
        </div>

        {/* Books Grid with small loader */}
        <div className="mt-12">
          {loading ? (
            <p className="text-center text-lg text-gray-500">
              Loading premium books, please wait...
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {filteredBooks.map((item) => (
                <Cards key={item._id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Course;
