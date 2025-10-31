import React, { useEffect, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import axios from "axios";

import Cards from "./Cards";

function Freebook() {
  const [book, setBook] = useState([]);

  // ✅ Use environment variable for backend
  const BASE_URL = import.meta.env.VITE_BASE_URL || "https://bookstore-app-final.onrender.com/";

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/book`);

        // Filter free books
        const data = res.data.filter((data) => data.category === "Free");
        console.log(data);
        setBook(data);
      } catch (error) {
        console.log(error); 
      }
    };
    getBook();
  }, [BASE_URL]);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="max-w-screen-10xl cursor-pointer container mx-auto md:px-20 px-4">
        <div>
          <h1 className="font-bold text-cyan-400 text-3xl pb-2">Free Offered Courses</h1>
          <p className="font-semibold"> 
            You can enjoy free books from this section. (If you want premium books then you can go to the Course section)
          </p>
        </div>
        <br />
        <br />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {book.map((item) => (
            <Cards item={item} key={item._id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Freebook;
