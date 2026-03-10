import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Grid: 1 col on mobile, 2 on sm, 4 on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          <div className="space-y-4">
            <h4 className="text-white font-bold tracking-widest text-xs uppercase">Company</h4>
            <nav className="flex flex-col space-y-2 text-sm text-slate-400">
              <a href="#" className="hover:text-cyan-400">About Us</a>
              <a href="#" className="hover:text-cyan-400">Careers</a>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-bold tracking-widest text-xs uppercase">Legal</h4>
            <nav className="flex flex-col space-y-2 text-sm text-slate-400">
              <a href="#" className="hover:text-cyan-400">Privacy Policy</a>
              <a href="#" className="hover:text-cyan-400">Terms of Service</a>
            </nav>
          </div>

          <div className="sm:col-span-2 lg:col-span-2">
            <h4 className="text-white font-bold tracking-widest text-xs uppercase mb-4">Stay Connected</h4>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-slate-800 border border-slate-700 rounded-md px-4 py-2 text-sm w-full focus:ring-1 focus:ring-cyan-500 outline-none" 
              />
              <button className="bg-cyan-600 text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-cyan-500 transition">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs gap-4">
          <p>© 2026 ClientFlow Logic. Built with React & Tailwind.</p>
          <div className="flex space-x-6 uppercase tracking-widest">
            <a href="#" className="hover:text-white">Github</a>
            <a href="#" className="hover:text-white">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;