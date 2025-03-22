import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  ShoppingCart,
  Users,
  Receipt,
  Globe,
  LineChart,
  Calendar,
  Briefcase,
  LayoutDashboard,
} from "lucide-react";

const navSections = [
  {
    title: "Client Facing",
    links: [
      { text: "Products", icon: <ShoppingCart />, path: "/products" },
      { text: "Customers", icon: <Users />, path: "/customers" },
      { text: "Transactions", icon: <Receipt />, path: "/transactions" },
      { text: "Geography", icon: <Globe />, path: "/geography" },
    ],
  },
  {
    title: "Sales",
    links: [
      { text: "Overview", icon: <LineChart />, path: "/overview" },
      { text: "Daily", icon: <Calendar />, path: "/daily" },
      { text: "Breakdown", icon: <LayoutDashboard />, path: "/breakdown" },
    ],
  },
  {
    title: "Management",
    links: [{ text: "Admin", icon: <Briefcase />, path: "/admin" }],
  },
];

const Sidebar = ({ isSidebarOpen, user }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current path
  const [activePath, setActivePath] = useState(location.pathname);

  if (!isSidebarOpen) return null; // Hide sidebar if closed

  return (
    <div className="w-64 h-screen bg-[#1E2A47] text-white p-4 flex flex-col overflow-y-auto">
      {/* Logo */}
      <h1 className="text-2xl font-bold px-4 py-3">ECOMVISION</h1>

      {/* Navigation */}
      <nav className="flex-1 mt-4">
        <button
          onClick={() => {
            setActivePath("/dashboard");
            navigate("/dashboard");
          }}
          className={`flex items-center gap-3 px-6 py-3 rounded-lg text-sm font-medium w-full text-left ${
            activePath === "/dashboard"
              ? "bg-[#cca752] text-gray-900"
              : "hover:bg-gray-700 transition duration-200"
          }`}
        >
          <Home className="w-5 h-5" />
          Dashboard
        </button>

        {navSections.map((section) => (
          <div key={section.title} className="mt-4">
            <h2 className="text-xs font-semibold uppercase text-gray-400 px-6">
              {section.title}
            </h2>
            {section.links.map(({ text, icon, path }) => (
              <button
                key={text}
                onClick={() => {
                  setActivePath(path);
                  navigate(path);
                }}
                className={`flex items-center gap-3 px-6 py-3 rounded-lg text-sm font-medium w-full text-left ${
                  activePath === path
                    ? "bg-[#cca752] text-gray-900"
                    : "hover:bg-gray-700 transition duration-200"
                }`}
              >
                <span className="w-5 h-5">{icon}</span>
                {text}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* Separator */}
      <div className="w-full border-t border-gray-600 my-4"></div>

      {/* User Profile */}
      <div className="flex items-center gap-3 px-4 py-2">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-500">
          <img
            src="/profile (1).jpeg"
            alt="profile"
            className="w-full h-full"
          />
        </div>
        <div>
          <h1 className="text-sm font-semibold">{user?.name || "Guest"}</h1>
          <h2 className="text-xs text-gray-300">
            {user?.occupation || "User"}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
