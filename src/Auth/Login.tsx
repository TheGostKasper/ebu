import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "./store";
import { User } from "./types";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Replace this with your actual authentication logic (API call)
      const mockUser: User = {
        id: "1",
        name: "John Doe",
        email,
        role: email === "admin@example.com" ? "admin" : "user",
      };

      const mockToken = "fake-jwt-token";

      // Update auth store
      login(mockUser, mockToken);

      // Redirect to dashboard
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
      // Handle login error (show message, etc.)
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-red-600 to-red-500">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Welcome back</h2>
        <p className="text-gray-500 mb-6">
          Welcome to Vodafone Self-care Portal. Please enter your details to
          login.
        </p>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="ahmed@gmail.com"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="**********"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg w-full"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-right">
          <a href="#" className="text-red-600 hover:text-red-700">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
