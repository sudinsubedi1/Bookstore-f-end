import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const BookDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // Base URL from environment variable
  const BASE_URL = import.meta.env.VITE_BASE_URL || "https://bookstore-app-final.onrender.com/";

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`${BASE_URL}/book/${id}`);
        if (!response.ok) throw new Error("Failed to fetch book");
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load book details");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, BASE_URL]);

  const handleBack = () => {
    if (location.state?.from === "home") {
      navigate("/");
    }
  };

  const getStockColor = () => {
    if (book.stock > 15) return "bg-green-500";
    if (book.stock > 5) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (loading) return <p className="text-center py-10">Loading book...</p>;
  if (!book) return <p className="text-center py-10">Book not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-[#2C5364] via-[#203A43] to-[#0F2027]">
      <button
        onClick={handleBack}
        className="mb-4 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
      >
        &larr; Back
      </button>

      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure className="lg:w-1/3 p-4">
          <img
            src={book.image || "https://via.placeholder.com/200"}
            alt={book.title}
            className="rounded-lg w-full h-auto object-cover"
          />
        </figure>

        <div className="card-body lg:w-2/3 flex flex-col justify-between">
          <div>
            <h2 className="card-title text-3xl font-bold">{book.title}</h2>
            <p className="text-lg text-gray-500 mt-1">by {book.author}</p>
            <div className="badge badge-outline mt-2">{book.category}</div>
            <p className="mt-4 text-gray-700">{book.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-2xl font-bold text-green-600">${book.price}</span>
              <div className="badge badge-outline mt-2">{book.rating}</div>

              <div className="flex flex-col items-end">
                <span className="text-sm text-gray-500 dark:text-gray-300 mb-1">Stock</span>
                <div className="w-24 h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <div
                    className={`${getStockColor()} h-full`}
                    style={{ width: `${Math.min((book.stock / 20) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
