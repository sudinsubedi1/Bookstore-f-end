import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

function Login({ modalId = "my_modal_3" }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [successPopup, setSuccessPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post("http://localhost:4001/user/login", userInfo);

      if (res.data) {
        // Save user in localStorage
        localStorage.setItem("Users", JSON.stringify(res.data.user));

        // Close login modal
        document.getElementById(modalId)?.close();

        // Show success popup
        setSuccessPopup(true);

        // Redirect after 2 seconds
        setTimeout(() => {
          const role = res.data.user.role?.trim();
          if (role === "admin") {
            window.location.href = "/adminui";
          } else {
            window.location.href = "/";
          }
        }, 2000);
      }
    } catch (err) {
      if (err.response) {
        console.log(err);
        setErrorMessage(err.response.data.message);
      }
    }
  };

  return (
    <div>
      {/* Login Modal */}
      <dialog id={modalId} className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById(modalId)?.close()}
            >
              ✕
            </Link>

            <h3 className="font-bold text-lg">Login</h3>

            <div className="mt-4 space-y-2">
              <span>Email</span>
              <br />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("email", { required: true })}
              />
              <br />
              {errors.email && (
                <span className="text-sm text-red-500">This field is required</span>
              )}
            </div>

            <div className="mt-4 space-y-2">
              <span>Password</span>
              <br />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("password", { required: true })}
              />
              <br />
              {errors.password && (
                <span className="text-sm text-red-500">This field is required</span>
              )}
            </div>

            {errorMessage && (
              <p className="text-red-500 mt-2">{errorMessage}</p>
            )}

            <div className="flex justify-around mt-6">
              <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                Login
              </button>
              <p>
                Not registered?{" "}
                <Link to="/signup" className="underline text-blue-500 cursor-pointer">
                  Signup
                </Link>
              </p>
            </div>
          </form>
        </div>
      </dialog>

      {/* Success Popup */}
      {successPopup && (
        <dialog open className="modal">
          <div className="modal-box text-center">
            <h3 className="font-bold text-lg text-green-600">
              Logged in Successfully!
            </h3>
            <p className="mt-2">Redirecting shortly...</p>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default Login;
