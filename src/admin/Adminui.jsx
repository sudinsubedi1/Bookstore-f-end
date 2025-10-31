import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Adminui() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    description: "",
    category: "",
    image: "",
    stock: "",
    sold: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const token = localStorage.getItem("token");

  // ✅ Use deployed backend URL
  const BASE_URL = import.meta.env.VITE_BASE_URL || "https://bookstore-app-final.onrender.com";

  // Check if user is admin
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("Users"));
    if (userData?.role === "admin") {
      setIsAdmin(true);
      toast.success("Logged in as Admin");
    } else {
      toast.error("Access denied! Admin only.");
      navigate("/");
    }
  }, [navigate]);

  // Fetch books
  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/book`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  useEffect(() => {
    if (isAdmin) fetchBooks();
  }, [isAdmin]);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or update book
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${BASE_URL}/admin/update-book/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditingId(null);
      } else {
        await axios.post(`${BASE_URL}/admin/add-book`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setFormData({
        title: "",
        author: "",
        price: "",
        description: "",
        category: "",
        image: "",
        stock: "",
        sold: "",
      });

      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  // Edit book
  const handleEdit = (book) => {
    setFormData({
      title: book.title,
      author: book.author,
      price: book.price,
      description: book.description,
      category: book.category,
      image: book.image,
      stock: book.stock,
      sold: book.sold,
    });
    setEditingId(book._id);
  };

  // Delete book
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/admin/delete-book/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  // Logout function
  const logoutAdmin = async () => {
    try {
      if (token) {
        await axios.post(`${BASE_URL}/user/logout`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem("Users");
      localStorage.removeItem("token");
      toast.success("You have been logged out as Admin");
    }
  };

  const handleLeaveAdmin = () => {
    logoutAdmin();
    navigate("/");
  };

  // Auto logout on page leave/unmount
  useEffect(() => {
    return () => logoutAdmin();
  }, []);

  if (!isAdmin) return null;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Admin Panel - Manage Books</h2>

      <button
        className="bg-red-600 text-white px-4 py-2 rounded mb-6 hover:bg-red-700 transition"
        onClick={handleLeaveAdmin}
      >
        Leave as Admin
      </button>

      <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-2 gap-4">
        {[
          { name: "title", type: "text", placeholder: "Title" },
          { name: "author", type: "text", placeholder: "Author" },
          { name: "price", type: "number", placeholder: "Price" },
          { name: "description", type: "text", placeholder: "Description" },
          { name: "category", type: "text", placeholder: "Category" },
          { name: "image", type: "text", placeholder: "Image URL/Base64" },
          { name: "stock", type: "number", placeholder: "Stock" },
          { name: "sold", type: "number", placeholder: "Sold" },
        ].map((field) => (
          <input
            key={field.name}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name]}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        ))}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition col-span-2"
        >
          {editingId ? "Update Book" : "Add Book"}
        </button>
      </form>

      <div className="grid grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="border p-4 rounded shadow hover:shadow-lg transition"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-48 object-cover rounded mb-3"
            />
            <h3 className="font-bold text-lg">{book.title}</h3>
            <p className="text-sm">Author: {book.author}</p>
            <p className="text-sm">Category: {book.category}</p>
            <p className="text-sm">Price: ${book.price}</p>
            <p className="text-sm">Stock: {book.stock}</p>
            <p className="text-sm">Sold: {book.sold}</p>
            <p className="text-sm">{book.description}</p>
            <div className="mt-3 flex justify-between">
              <button
                className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500 transition"
                onClick={() => handleEdit(book)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                onClick={() => handleDelete(book._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Adminui;
