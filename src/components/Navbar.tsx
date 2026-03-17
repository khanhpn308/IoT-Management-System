import { Home, LayoutDashboard, Cpu, Users } from 'lucide-react';
import { baseUrl } from '../lib/base-url';

export default function Navbar() {
  return (
    <nav className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-blue-400 font-heading">IoT Manager</span>
            </div>
            <div className="ml-10 flex items-baseline space-x-4">
              <a
                href={`${baseUrl}/`}
                className="text-slate-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
              >
                <Home size={18} />
                Home
              </a>
              <a
                href={`${baseUrl}/dashboard`}
                className="text-slate-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </a>
              <a
                href={`${baseUrl}/devices`}
                className="text-slate-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
              >
                <Cpu size={18} />
                Devices
              </a>
              <a
                href={`${baseUrl}/users`}
                className="text-slate-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
              >
                <Users size={18} />
                User Management
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-300 text-sm">Admin User</span>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
