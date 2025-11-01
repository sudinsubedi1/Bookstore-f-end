import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaMinus, FaTrash, FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const BASE_URL =
    import.meta.env.VITE_BASE_URL || "https://bookstore-app-final.onrender.com";

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("Users"));
        if (!user) {
          console.error("User not found in localStorage");
          setLoading(false);
          return;
        }

        const response = await fetch(`${BASE_URL}/cart/${user._id}`);
        if (!response.ok) throw new Error("Failed to fetch cart");

        const data = await response.json();
        setCart(data);
      } catch (error) {
        console.error("Error fetching cart:", error);
        toast.error("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [BASE_URL]);

  const handleIncrease = async (bookId) => {
    try {
      const user = JSON.parse(localStorage.getItem("Users"));
      if (!user || !user._id) return toast.error("User not found");

      const response = await fetch(
        `${BASE_URL}/cart/increase/${bookId}?userId=${user._id}`,
        { method: "PUT" }
      );
      if (!response.ok) throw new Error("Failed to increase quantity");

      const data = await response.json();
      setCart(data);
      toast.success("Quantity increased");
    } catch {
      toast.error("Failed to increase quantity");
    }
  };

  const handleDecrease = async (bookId) => {
    try {
      const user = JSON.parse(localStorage.getItem("Users"));
      if (!user || !user._id) return toast.error("User not found");

      const response = await fetch(
        `${BASE_URL}/cart/decrease/${bookId}?userId=${user._id}`,
        { method: "PUT" }
      );
      if (!response.ok) throw new Error("Failed to decrease quantity");

      const data = await response.json();
      setCart(data);
      toast.success("Quantity decreased");
    } catch {
      toast.error("Failed to decrease quantity");
    }
  };

  const handleRemove = async (bookId) => {
    try {
      const user = JSON.parse(localStorage.getItem("Users"));
      if (!user || !user._id) return toast.error("User not found");

      const response = await fetch(
        `${BASE_URL}/cart/remove/${bookId}?userId=${user._id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to remove item");

      const data = await response.json();
      setCart(data);
      toast.success("Item removed from cart");
    } catch {
      toast.error("Failed to remove item");
    }
  };

  if (loading)
    return (
      <p className="text-center py-10 text-gray-600">Loading cart, please wait...</p>
    );

  if (!cart || cart.items.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <FaShoppingCart size={80} className="text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven’t added any items to your cart yet.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
      </div>
    );

  const totalPrice = cart.items.reduce(
    (total, item) => total + item.bookId.price * item.quantity,
    0
  );

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      {/* Back Button */}
      <button
        className="btn btn-outline mb-6"
        onClick={() => navigate("/")}
      >
        ← Back to Home
      </button>

      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">
        Shopping Cart
      </h1>

      {/* Responsive layout */}
      <div className="hidden md:block overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {cart.items.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 flex items-center gap-4">
                  <img
                    src={item.bookId.image}
                    alt={item.bookId.title}
                    className="w-20 h-20 rounded object-cover"
                  />
                  <span className="font-medium">{item.bookId.title}</span>
                </td>
                <td className="px-6 py-4">${item.bookId.price.toFixed(2)}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => handleDecrease(item.bookId._id)}
                    >
                      <FaMinus />
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => handleIncrease(item.bookId._id)}
                    >
                      <FaPlus />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  ${(item.bookId.price * item.quantity).toFixed(2)}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleRemove(item.bookId._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view cards */}
      <div className="md:hidden space-y-4">
        {cart.items.map((item) => (
          <div
            key={item._id}
            className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <img
              src={item.bookId.image}
              alt={item.bookId.title}
              className="w-full sm:w-24 h-40 sm:h-24 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{item.bookId.title}</h3>
              <p className="text-gray-500">${item.bookId.price.toFixed(2)}</p>

              <div className="flex items-center gap-3 mt-2">
                <button
                  className="btn btn-xs btn-outline"
                  onClick={() => handleDecrease(item.bookId._id)}
                >
                  <FaMinus />
                </button>
                <span>{item.quantity}</span>
                <button
                  className="btn btn-xs btn-outline"
                  onClick={() => handleIncrease(item.bookId._id)}
                >
                  <FaPlus />
                </button>
              </div>

              <div className="flex justify-between items-center mt-3">
                <p className="font-semibold">
                  Total: ${(item.bookId.price * item.quantity).toFixed(2)}
                </p>
                <button
                  className="btn btn-xs btn-error"
                  onClick={() => handleRemove(item.bookId._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Section */}
      <div className="flex justify-end mt-6">
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md w-full sm:w-2/3 md:w-1/3 text-right">
          <p className="text-lg font-semibold">
            Subtotal: ${totalPrice.toFixed(2)}
          </p>
          <p className="text-gray-500 dark:text-gray-300 mt-1">
            Taxes and shipping calculated at checkout
          </p>
          <button className="btn btn-primary mt-4 w-full">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
