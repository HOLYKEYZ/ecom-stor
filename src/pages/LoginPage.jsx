import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await login(email, password);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] grid grid-cols-1 md:grid-cols-2">
      {/* Visual Side */}
      <div className="hidden md:block bg-neutral-100 relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
          alt="Editorial Fashion" 
          className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute bottom-12 left-12 text-white">
          <h2 className="text-5xl font-black tracking-tighter mb-2">AJ STORE</h2>
          <p className="text-lg tracking-widest uppercase">Collection 2025</p>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex flex-col justify-center px-8 md:px-24 bg-white relative">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-4xl font-black tracking-tighter mb-2">WELCOME BACK.</h1>
          <p className="text-neutral-500 mb-12">Login to manage your orders.</p>

          {error && (
            <div className="p-4 bg-red-50 border-l-2 border-red-500 text-red-600 mb-8 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-editorial"
                placeholder="name@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-editorial"
                placeholder="••••••••"
              />
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-editorial w-full">
              {isSubmitting ? "Processing..." : "Login"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-neutral-500">
            Available for new members? <Link to="/signup" className="text-obsidian font-bold hover:underline">Join Us</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
