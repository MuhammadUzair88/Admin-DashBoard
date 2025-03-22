import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import { UserProvider } from "./context/UserContext"; // Import UserProvider
import { ApiProvider } from "./context/ApiContext"; // Import APIContextProvider
import Products from "./pages/Product";
import Customers from "./pages/Customers";
import Transactions from "./pages/Transactions";
import Geography from "./pages/Geography";
import OverView from "./pages/OverView";
import Daily from "./pages/Daily";
import Monthly from "./pages/Monthly";
import Breakdown from "./pages/Breakdown";
import Admin from "./pages/Admin";
import Performance from "./pages/Performance";

function App() {
  return (
    <UserProvider>
      <ApiProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/geography" element={<Geography />} />
            <Route path="/overview" element={<OverView />} />
            <Route path="/daily" element={<Daily />} />
            <Route path="/monthly" element={<Monthly />} />
            <Route path="/breakdown" element={<Breakdown />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/performance" element={<Performance />} />

            {/* /customers */}
          </Route>
        </Routes>
      </ApiProvider>
    </UserProvider>
  );
}

export default App;
