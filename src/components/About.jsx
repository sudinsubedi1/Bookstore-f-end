import React from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
      <section className="w-full max-w-3xl bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-10">
          <header className="mb-6">
            <h1 className="text-3xl font-semibold text-gray-800">About BookVerse</h1>
            <p className="mt-2 text-sm text-gray-500">
              Your online destination for both free and paid books — curated for readers, learners and creators.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-lg font-medium text-gray-700 mb-2">What we offer</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                A clean, easy-to-use bookstore with a wide variety of genres. Browse free resources or buy premium titles —
                all in one place with fast search and secure checkout.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-700 mb-2">Our promise</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                We prioritise quality, transparent pricing, and a smooth reading experience. Whether you want to learn,
                relax, or research — we help you find the right book.
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Bookstore
            </div>

            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-white text-sm font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-label="Dive to Book Collection"
            >
              Dive to Book Collection
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
