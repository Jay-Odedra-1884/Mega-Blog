import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login as authLogin } from "../features/authSlice";
import { Logo, Input, Button } from "./index";
import { Link } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  async function Signup() {
    setError("");
    try {
      const user = authService.createAccount(data);
      if (user) {
        const userData = authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <div>
        <div>
          <Logo></Logo>
        </div>
        <h2>Create a new account</h2>
        <p>
          Do you have and account
          <Link to="/login">Login</Link>
        </p>
        {error && <p className="text-red-600">{error}</p>}
        <form onSubmit={handleSubmit(SignUp)}>
          <Input
            label="Name: "
            type="text"
            placeholder="Enter your name"
            {...register("name", {
              required: true,
            })}
          ></Input>
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
          <Button type="submit">signup</Button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
