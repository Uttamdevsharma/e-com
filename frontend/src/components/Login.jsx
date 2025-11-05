import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginUserMutation } from "../redux/features/auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/features/auth/authSlice";
import toast from "react-hot-toast";

const Login = () => {
 
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data).unwrap();
      const {token,user} = response;
      toast.success("Login Successfull")
      dispatch((setUser({user})))
      navigate("/");
    } catch (error) {
      const errmsg = error?.data?.message  || "Something went wrong!"
      toast.error(errmsg)
    }
  };

  return (
    <>
      <section className="h-screen flex items-center justify-center">
        <div className="shadow bg-white p-8 max-w-sm mx-auto ">
          <h2 className="font-semibold text-2xl pt-5">Please Login!</h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            action=""
            className="pt-5 space-y-5 max-w-sm mx-auto"
          >
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="your email"
              className="w-full bg-gray-200 focus:outline-none px-5 py-3"
            />
            {errors.email && (
              <p className="text-red-400">This field is required</p>
            )}

            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="your password"
              className="w-full bg-gray-200 focus:outline-none px-5 py-3"
            />
            {errors.password && (
              <p className="text-red-400">This field is required</p>
            )}

            {message && <p className="text-red-500 font-semibold">{message}</p>}

            <button type="submit" disabled={isLoading} className="w-full bg-red-500 text-white flex justify-center items-center py-2 hover:bg-red-600">
              {isLoading ? "Login..." : "Login"}
            </button>
          </form>
          <div className="text-center mt-2">
            Don't have an account?
            <Link
              to="/register"
              className="underline text-red-500 cursor-pointer "
            >
              Register{" "}
            </Link>
            here.
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
