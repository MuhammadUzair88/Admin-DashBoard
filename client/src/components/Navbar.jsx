import React from "react";
import { Menu, Search, Settings, ChevronDown } from "lucide-react";

const Navbar = ({ setIsSidebarOpen, isSidebarOpen }) => {
  return (
    <nav className="  p-4 flex justify-between items-center">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">
        <button
          className="p-2 rounded-md hover:bg-gray-100 "
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center shadow-md rounded-md px-4 py-2">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none"
          />
          <button className="ml-2">
            <Search size={20} />
          </button>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-md hover:bg-gray-100">
          <Settings size={24} />
        </button>

        <div className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-100">
          <img
            src="/profile (1).jpeg"
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="text-sm text-gray-700">
            <p className="font-semibold">John Doe</p>
            <p className="text-xs text-gray-500">Software Engineer</p>
          </div>
          <ChevronDown size={20} className="text-gray-500" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
