import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await signup(name, email, password);
    if (result.success) {
      navigate("/");
    } else {
      setError(result?.error || "Failed to sign up");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] grid grid-cols-1 md:grid-cols-2">
      {/* Form Side - Left for Signup */}
      <div className="flex flex-col justify-center px-8 md:px-24 bg-white order-2 md:order-1">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-4xl font-black tracking-tighter mb-2">JOIN THE CLUB.</h1>
          <p className="text-neutral-500 mb-12">Create an account to track your orders.</p>

          {error && (
            <div className="p-4 bg-red-50 border-l-2 border-red-500 text-red-600 mb-8 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-editorial"
                placeholder="John Doe"
              />
            </div>

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
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-neutral-500">
            Already a member? <Link to="/login" className="text-obsidian font-bold hover:underline">Login Here</Link>
          </p>
        </div>
      </div>

      {/* Visual Side */}
      <div className="hidden md:block bg-neutral-100 relative overflow-hidden order-1 md:order-2">
        <img 
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop" 
          alt="Editorial Fashion" 
          className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute bottom-12 right-12 text-white text-right">
          <h2 className="text-5xl font-black tracking-tighter mb-2">NEW ARRIVALS</h2>
          <p className="text-lg tracking-widest uppercase">The Winter Edit</p>
        </div>
      </div>
    </div>
  );
}
