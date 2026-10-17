import React from "react";
import { NavLink } from "react-router-dom";

const features = [
  {
    icon: "👥",
    title: "Client Management",
    description: "Store and organize all your client data in one place.",
  },
  {
    icon: "📅",
    title: "Appointment Booking",
    description:
      "Schedule appointments with a built-in calendar — no double bookings.",
  },
  {
    icon: "✂️",
    title: "Service Catalog",
    description: "Define your services, prices, and durations in minutes.",
  },
];

const CalendarPreview = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const appointments = [
    { day: 0, time: "10:00", label: "Haircut" },
    { day: 1, time: "14:30", label: "Checkup" },
    { day: 3, time: "09:00", label: "Haircut" },
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-[0_0_40px_rgba(124,58,237,0.08)] w-full">
      <div className="grid grid-cols-5 gap-3 mb-3">
        {days.map((d) => (
          <div
            key={d}
            className="text-zinc-500 text-xs font-medium text-center"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-3">
        {days.map((_, i) => (
          <div
            key={i}
            className="bg-zinc-950 border border-zinc-800 rounded-lg h-32 p-2 flex flex-col gap-1.5"
          >
            {appointments
              .filter((a) => a.day === i)
              .map((a, idx) => (
                <div
                  key={idx}
                  className="bg-violet-600/80 text-white text-xs rounded px-2 py-1.5 leading-tight"
                >
                  <div className="font-semibold">{a.time}</div>
                  <div className="text-violet-100">{a.label}</div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="w-full text-white">
      {/* Hero */}
      <section className="flex flex-col lg:flex-row items-center justify-center gap-12 px-6 py-24 max-w-6xl mx-auto">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1">
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
            ClientFlow helps service businesses manage clients, book
            appointments, and track their service catalog — all in one clean
            dashboard.
          </p>

          <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
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
        </div>

        <div className="flex-1 w-full max-w-md">
          <CalendarPreview />
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
