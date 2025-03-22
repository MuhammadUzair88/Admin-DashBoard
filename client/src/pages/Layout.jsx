import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./../components/Sidebar";
import Navbar from "./../components/Navbar";
import { useApi } from "../context/ApiContext";
import { useUser } from "../context/UserContext";

const Layout = () => {
  const { user, fetchUser } = useApi();
  const { userId } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      if (userId) {
        await fetchUser(userId);
      }
    };
    getUser();
  }, [userId]); // ✅ Removed fetchUser from dependencies

  useEffect(() => {
    console.log("User fetched:", user);
  }, [user]);

  return (
    <div className="flex h-screen ">
      <div className="hidden md:flex">
        <Sidebar
          user={user}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
      <div className="flex-1 flex flex-col">
        <Navbar
          user={user}
          setIsSidebarOpen={setIsSidebarOpen}
          isSidebarOpen={isSidebarOpen}
        />
        <main className="p-4 flex-1  overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
