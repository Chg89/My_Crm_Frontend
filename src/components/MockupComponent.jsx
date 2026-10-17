const CalendarPreview = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const appointments = [
    { day: 0, time: "10:00", label: "Haircut" },
    { day: 1, time: "14:30", label: "Checkup" },
    { day: 3, time: "09:00", label: "Haircut" },
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-[0_0_40px_rgba(124,58,237,0.08)]">
      <div className="grid grid-cols-5 gap-2 mb-3">
        {days.map((d) => (
          <div
            key={d}
            className="text-zinc-500 text-xs font-medium text-center"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-2">
        {days.map((_, i) => (
          <div
            key={i}
            className="bg-zinc-950 border border-zinc-800 rounded-lg h-28 p-1.5 flex flex-col gap-1"
          >
            {appointments
              .filter((a) => a.day === i)
              .map((a, idx) => (
                <div
                  key={idx}
                  className="bg-violet-600/80 text-white text-[10px] rounded px-1.5 py-1 leading-tight"
                >
                  {a.time} {a.label}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarPreview;
