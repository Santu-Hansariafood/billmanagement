"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Lock, UserPlus } from "lucide-react";
import { fadeIn } from "@/utils/motion/motion";
import { register as registerApi } from "@/utils/api/auth";

const Register = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!mobile || !password) {
      setError("Enter mobile and password");
      return;
    }
    try {
      await registerApi(mobile, password);
      setMessage("User registered successfully");
      setMobile("");
      setPassword("");
    } catch (err) {
      setError(err?.response?.data?.error || "Registration failed");
    }
  };

  return (
    <motion.div {...fadeIn} className="card w-full max-w-md">
      <div className="flex items-center space-x-2 mb-4">
        <UserPlus className="w-5 h-5 text-emerald-600" />
        <h3 className="text-lg font-bold">Register User</h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mobile Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="input-field pl-11"
              placeholder="Enter mobile number"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field pl-11"
              placeholder="Enter password"
            />
          </div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-emerald-600 text-sm">{message}</p>}
        <button type="submit" className="btn-primary w-full">Register</button>
      </form>
    </motion.div>
  );
};

export default Register;
