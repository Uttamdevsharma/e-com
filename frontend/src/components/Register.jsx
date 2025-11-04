import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRegisterUserMutation } from "../redux/features/auth/authApi";
import toast from "react-hot-toast";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await registerUser(data).unwrap();
      toast.success("Registration completed, please login");
      navigate("/login");
    } catch (error) {
      const errMsg = error?.data?.message || "Something went wrong";
      toast.error(errMsg);
    }
  };

  return (
    <>
      <section className="h-screen flex items-center justify-center">
        <div className="shadow bg-white p-8 max-w-sm mx-auto">
          <h2 className="font-semibold text-2xl pt-5">Please Register!</h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="pt-5 space-y-5 max-w-sm mx-auto"
          >
            <input
              type="text"
              {...register("username", { required: true })}
              placeholder="Your username"
              className="w-full bg-gray-200 focus:outline-none px-5 py-3"
            />
            {errors.username && (
              <p className="text-red-400">This username is required</p>
            )}

            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Your email"
              className="w-full bg-gray-200 focus:outline-none px-5 py-3"
            />
            {errors.email && (
              <p className="text-red-400">This email is required</p>
            )}

            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Your password"
              className="w-full bg-gray-200 focus:outline-none px-5 py-3"
            />
            {errors.password && (
              <p className="text-red-400">This password is required</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-500 text-white flex justify-center items-center py-2 hover:bg-red-600"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="text-center mt-2">
            Have an account?
            <Link to="/login" className="underline text-red-500 cursor-pointer">
              {" "}
              Login{" "}
            </Link>
            here.
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
