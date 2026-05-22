import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, PlayCircle } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, user, error } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#040714] text-white relative flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e40af55,transparent_35%),radial-gradient(circle_at_bottom,#06b6d455,transparent_30%)]"></div>
      <div className="absolute top-8 left-8 z-20 flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
          <PlayCircle className="text-cyan-300" />
        </div>
        <h1 className="text-4xl font-black tracking-wider bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">Disney+ Hotstar</h1>
      </div>

      <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 gap-10 items-center">
        <div className="hidden lg:block space-y-6">
          <p className="uppercase tracking-[0.4em] text-cyan-300">Unlimited Entertainment</p>
          <h2 className="text-7xl font-black leading-tight">
            Stream Movies, Sports & Originals
          </h2>
          <p className="text-lg text-slate-300 max-w-xl">
            Experience a redesigned streaming dashboard inspired by Disney+ Hotstar with futuristic visuals and immersive layouts.
          </p>
          <div className="flex gap-4">
            <div className="glass-card rounded-3xl px-6 py-5">
              <p className="text-3xl font-bold">4K+</p>
              <span className="text-slate-400">Ultra HD Streaming</span>
            </div>
            <div className="glass-card rounded-3xl px-6 py-5">
              <p className="text-3xl font-bold">1000+</p>
              <span className="text-slate-400">Premium Titles</span>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-[2rem] p-8 md:p-12 border border-white/10 shadow-2xl backdrop-blur-2xl bg-white/5">
          <h2 className="text-4xl font-bold mb-2">Welcome Back</h2>
          <p className="text-slate-400 mb-8">Sign in to continue watching your favorites.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e)=>setFormData({...formData,[e.target.name]:e.target.value})}
              placeholder="Email Address"
              className="w-full bg-slate-900/80 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={(e)=>setFormData({...formData,[e.target.name]:e.target.value})}
                placeholder="Password"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && <div className="bg-red-500/10 border border-red-500/40 rounded-2xl p-4 text-red-300">{error}</div>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-2xl py-4 font-bold text-lg bg-gradient-to-r from-cyan-400 to-blue-600 hover:scale-[1.02] transition-all"
            >
              {isLoading ? "Signing In..." : "Continue"}
            </button>
          </form>

          <div className="flex justify-between text-sm mt-6 text-slate-400">
            <Link to="/forgot-password" className="hover:text-cyan-300">Forgot Password?</Link>
            <Link to="/signup" className="hover:text-cyan-300">Create Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
