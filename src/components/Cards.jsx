import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Cards({ item }) {
  const navigate = useNavigate();

  if (!item) return null; // ✅ Prevent crash if item is undefined

  const BASE_URL = import.meta.env.VITE_BASE_URL || "https://bookstore-app-final.onrender.com";

  const goToDetails = () => {
    if (item?._id) navigate(`/book/${item._id}`);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    try {
      const user = JSON.parse(localStorage.getItem("Users"));
      if (!user) {
        toast.error("Please log in first!");
        return;
      }

      const userId = user._id;

      const response = await fetch(`${BASE_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, bookId: item._id, quantity: 1 }),
      });

      if (!response.ok) throw new Error("Failed to add to cart");

      toast.success("Book added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Something went wrong while adding to cart.");
    }
  };

  const getStockColor = () => {
    if ((item?.stock ?? 0) > 15) return "bg-green-500";
    if ((item?.stock ?? 0) > 5) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div onClick={goToDetails} className="mt-4 my-3 p-3">
      <div className="card w-full bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border flex flex-col">
        <figure className="h-60 flex items-center justify-center overflow-hidden">
          <img
            src={item?.image || "https://via.placeholder.com/150"}
            alt={item?.title || "Book"}
            className="object-contain h-full w-full"
          />
        </figure>
        <div className="card-body flex flex-col justify-between">
          <h2 className="card-title flex justify-between items-start">
            {item?.title || "Untitled"}
            <div className="badge badge-secondary">{item?.category || "N/A"}</div>
          </h2>
          {item?.sold && (
            <div className="absolute top-2 left-2 px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full shadow-md">
              Item Sold: {item.sold}
            </div>
          )}

          <p className="text-sm text-gray-600 dark:text-gray-300">by {item?.author || "Unknown"}</p>
          <div className="mt-3">
            <div className="flex justify-between items-center mb-1 text-sm">
              <span>Stock</span>
              <span>{item?.stock ?? 0}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
              <div
                className={`${getStockColor()} h-2 rounded-full`}
                style={{ width: `${Math.min(((item?.stock ?? 0) / 20) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
          <div className="card-actions justify-between mt-4">
            <div className="badge badge-outline">${item?.price ?? 0}</div>
            <div
              onClick={handleAddToCart}
              className={`cursor-pointer px-3 py-1 rounded-full border-[2px] duration-200 ${
                (item?.stock ?? 0) > 0
                  ? "hover:bg-pink-500 hover:text-white"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              {(item?.stock ?? 0) > 0 ? "Add to Cart" : "Out of Stock"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
