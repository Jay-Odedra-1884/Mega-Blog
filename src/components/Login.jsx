import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login as authLogin } from "../features/authSlice";
import { Logo, Input, Button } from "./index";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  async function login(data) {
    setError("");
    try {
      const session = authService.login(data);
      if (session) {
        const userData = authService.getCurrentUser();
        userData && dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError("Something went wrong");
      console.log(error);
    }
  }

  return (
    <div>
      <div>
        <div>
          <Logo></Logo>
        </div>
        <h2>Sign in to your account</h2>
        {error && <p className="text-red-600">{error}</p>}

        <form onSubmit={handleSubmit(login)}>
          <Input
            label="Email: "
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: true,
            })}
          />

          <Input
            label="Password: "
            type="password"
            placeholder="Enter your email"
            {...register("password", {
              required: true,
            })}
          />
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
