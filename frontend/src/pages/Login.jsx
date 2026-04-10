import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  // input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);

      // store token in local storage
      localStorage.setItem("token", res.data.token);

      setMsg(res.data.message || "Login successful ✅");

      // redirect to homepage after 1 second
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setMsg(error.response?.data?.message || "Something went wrong ❌");
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 h-screen">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-center">
          {" "}
          Login to your Account{" "}
        </h1>

        {msg && <div className="text-blue-500 mb-4">{msg}</div>}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
