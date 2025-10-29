import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Login from "./Login";

function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post("http://localhost:4001/user/signup", userInfo);
      if (res.data) {
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        toast.success("ID created! Please login to proceed.", { duration: 5000 });

        setTimeout(() => {
          document.getElementById("signup_login_modal")?.showModal();
        }, 500);
      }
    } catch (err) {
      if (err.response) {
        toast.error("Error: " + err.response.data.message, { duration: 5000 });
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-[600px]">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </Link>

            <h3 className="font-bold text-lg mb-6">Signup</h3>

            <div className="mb-5">
              <label className="block mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter your fullname"
                className="w-full px-3 py-2 border rounded-md outline-none"
                {...register("fullname", { required: true })}
              />
              {errors.fullname && (
                <span className="text-sm text-red-500">This field is required</span>
              )}
            </div>

            <div className="mb-5">
              <label className="block mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-md outline-none"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-sm text-red-500">This field is required</span>
              )}
            </div>

            <div className="mb-5">
              <label className="block mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded-md outline-none"
                {...register("password", { required: true, minLength: 8 })}
              />
              {errors.password && errors.password.type === "required" && (
                <span className="text-sm text-red-500">This field is required</span>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <span className="text-sm text-red-500">
                  Password must be at least 8 characters
                </span>
              )}
            </div>

            <div className="flex justify-between items-center mt-6">
              <button className="bg-pink-500 text-white rounded-md px-5 py-2 hover:bg-pink-700 duration-200">
                Signup
              </button>

              <div>
                <span className="text-lg">Have account? </span>
                <button
                  type="button"
                  className="underline text-blue-500 cursor-pointer"
                  onClick={() => document.getElementById("signup_login_modal")?.showModal()}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Login modal for signup page */}
      <Login modalId="signup_login_modal" />
    </div>
  );
}

export default Signup;
