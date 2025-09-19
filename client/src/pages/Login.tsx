import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { loginSchema } from "../validation/login";
import type { LoginInput } from "../validation/login";
import { login } from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsed: LoginInput = loginSchema.parse({ email, password });

      const res = await login(parsed); 

      dispatch(setUser({ token: res.access_token, email }));
localStorage.setItem("token", res.access_token);
console.log("🔑 Token saved to localStorage:", res.access_token);


      setError("");
      navigate("/invoices");
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          className="w-full border p-2 mb-3 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border p-2 mb-3 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
