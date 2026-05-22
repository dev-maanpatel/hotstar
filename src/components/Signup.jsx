import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Sparkles } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(
      "https://backend-auth-c86g.onrender.com/api/auth/register",
      register
    ).then(() => navigate("/login"));
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#2563eb66,transparent_30%),radial-gradient(circle_at_bottom_left,#06b6d466,transparent_30%)]"></div>

      <div className="relative z-10 max-w-5xl w-full grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full px-5 py-3 border border-cyan-500/30 bg-cyan-500/10">
            <Sparkles className="text-cyan-300" />
            <span>Premium Streaming Experience</span>
          </div>

          <h1 className="text-6xl font-black leading-tight">
            Create Your Hotstar Account
          </h1>

          <p className="text-slate-300 text-lg">
            Join millions of users enjoying blockbuster movies, live sports, anime and exclusive originals.
          </p>
        </div>

        <div className="glass-card rounded-[2rem] p-10 bg-white/5">
          <h2 className="text-4xl font-bold mb-8">Sign Up</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              value={register.name}
              onChange={(e)=>setRegister({...register,name:e.target.value})}
              className="w-full rounded-2xl bg-slate-900/80 border border-slate-700 px-5 py-4 outline-none focus:border-cyan-400"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={register.email}
              onChange={(e)=>setRegister({...register,email:e.target.value})}
              className="w-full rounded-2xl bg-slate-900/80 border border-slate-700 px-5 py-4 outline-none focus:border-cyan-400"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={register.password}
                onChange={(e)=>setRegister({...register,password:e.target.value})}
                className="w-full rounded-2xl bg-slate-900/80 border border-slate-700 px-5 py-4 outline-none focus:border-cyan-400"
              />
              <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400">
                {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
              </button>
            </div>

            <select
              value={register.role}
              onChange={(e)=>setRegister({...register,role:e.target.value})}
              className="w-full rounded-2xl bg-slate-900/80 border border-slate-700 px-5 py-4 outline-none"
            >
              <option value="user">Viewer</option>
              <option value="admin">Admin</option>
            </select>

            <button type="submit" disabled={isLoading} className="w-full rounded-2xl py-4 font-bold text-lg bg-gradient-to-r from-blue-500 to-cyan-400">
              {isLoading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="text-slate-400 mt-6 text-center">
            Already have an account? <Link to="/login" className="text-cyan-300">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
