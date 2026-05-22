import React from "react";
import { Search, Bell, Play, Plus, LogOut, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const featured = {
    title: "Avengers Secret Wars",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1920",
    desc: "Dive into cinematic universes, live cricket and trending originals in one immersive platform."
  };

  const shows = [
    "Loki","Ahsoka","The Bear","Deadpool","Formula 1","Interstellar"
  ];

  return (
    <div className="min-h-screen bg-[#040714] text-white">
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-10">
            <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
              Disney+ Hotstar
            </h1>

            <div className="hidden md:flex items-center gap-6 text-slate-300">
              <span>Home</span>
              <span>Movies</span>
              <span>Series</span>
              <span>Sports</span>
              <span>My Space</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <Search />
            <Bell />
            <button onClick={handleLogout} className="bg-red-500/20 border border-red-500/30 rounded-xl px-4 py-2 flex items-center gap-2">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <section className="relative h-[85vh] flex items-center">
        <img src={featured.image} className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040714] via-[#040714dd] to-transparent"></div>

        <div className="relative z-10 max-w-3xl px-8 md:px-16">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-400/30 rounded-full px-5 py-2 mb-6">
            <Flame className="text-cyan-300" size={18} />
            Trending Now
          </div>

          <h2 className="text-7xl font-black mb-6">{featured.title}</h2>
          <p className="text-xl text-slate-300 mb-8">{featured.desc}</p>

          <div className="flex gap-4">
            <button className="bg-white text-black px-8 py-4 rounded-2xl font-bold flex items-center gap-2">
              <Play fill="black" />
              Watch Now
            </button>

            <button className="bg-white/10 border border-white/10 px-8 py-4 rounded-2xl font-bold flex items-center gap-2">
              <Plus />
              Watchlist
            </button>
          </div>
        </div>
      </section>

      <section className="px-8 md:px-16 py-12">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-3xl font-bold">Recommended For You</h3>
          <button onClick={()=>navigate("/change-password")} className="text-cyan-300">Change Password</button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {shows.map((item,index)=>(
            <div key={index} className="group rounded-[2rem] overflow-hidden bg-slate-900 border border-white/10 hover:-translate-y-2 transition-all">
              <img src={`https://picsum.photos/400/60${index}`} className="h-80 w-full object-cover group-hover:scale-105 transition-all" />
              <div className="p-5">
                <h4 className="text-xl font-semibold">{item}</h4>
                <p className="text-slate-400 text-sm mt-2">Exclusive streaming experience in Ultra HD.</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
