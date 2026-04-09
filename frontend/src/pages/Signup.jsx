import React, { useState } from "react";
import api from "../api/axios";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");

  // input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/signup", form);

      setMsg(res.data.message || "Signup successful ✅");

      // reset form
      setForm({
        name: "",
        email: "",
        password: "",
      });

    } catch (error) {
      setMsg(error.response?.data?.message || "Something went wrong ❌");
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 h-screen">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Register Here
        </h1>

        {msg && (
          <div className="mb-4 text-center text-sm text-blue-600 font-medium">
            {msg}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none"
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            required
            onChange={handleChange}
          />

          <input
            className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            required
            onChange={handleChange}
          />

          <input
            className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            required
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full px-3 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}