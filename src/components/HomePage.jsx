import React from "react";
import { NavLink } from "react-router-dom";

const features = [
  {
    icon: "👥",
    title: "Client Management",
    description: "Store and organize all your client data in one place.",
  },
  {
    icon: "📊",
    title: "Track Progress",
    description: "Monitor deals and relationships at every stage.",
  },
  {
    icon: "⚡",
    title: "Fast & Simple",
    description: "A clean interface that gets out of your way.",
  },
];

const HomePage = () => {
  return (
    <div className="w-full text-white">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-medium px-3 py-1 rounded-full mb-6">
          <span className="w-1.5 h-1.5 bg-violet-400 rounded-full"></span>
          Your CRM, simplified
        </div>

        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          Manage your clients
          <br />
          <span className="text-violet-400">with confidence</span>
        </h1>

        <p className="text-zinc-400 text-lg max-w-xl mb-10">
          ClientFlow helps you track every client relationship, deal, and interaction — all in one clean dashboard.
        </p>

        <div className="flex gap-4 flex-wrap justify-center">
          <NavLink
            to="/register"
            className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 py-3 rounded-lg transition duration-150 shadow-[0_0_20px_rgba(124,58,237,0.3)]"
          >
            Get Started
          </NavLink>
          <NavLink
            to="/login"
            className="border border-zinc-700 hover:border-violet-500 hover:text-violet-400 text-zinc-300 font-semibold px-6 py-3 rounded-lg transition duration-150"
          >
            Sign In
          </NavLink>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-6 pb-24 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-violet-500/40 transition duration-150"
          >
            <div className="text-3xl mb-3">{f.icon}</div>
            <h3 className="text-white font-semibold mb-1">{f.title}</h3>
            <p className="text-zinc-400 text-sm">{f.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HomePage;
