import "./App.css"; // Ensure this file has @import "tailwindcss"; inside it

function App() {
  return (
    <div className="h-screen flex items-center justify-center bg-slate-900">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
        Tailwind v4 is Live!
      </h1>
    </div>
  );
}

export default App;
