import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;
  const [user, setUser] = useState(null);
  const [productStats, setProductStats] = useState(null);
  const [CustomerData, setCustomerData] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [geography, setGeography] = useState(null);
  const [overallStats, setOverallStats] = useState(null);
  const [admins, setAdmins] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(null);

  // Fetch user (Memoized)
  const fetchUser = useCallback(
    async (id) => {
      try {
        const response = await axios.get(`${baseUrl}/general/user/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },
    [baseUrl]
  );

  const fetchProductwithStats = async () => {
    try {
      const response = await axios.get(`${baseUrl}/client/products`);
      setProductStats(response.data);
    } catch (error) {
      console.error("Error fetching Product Stats:", error);
    }
  };
  const fetchCustomersData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/client/customers`);
      setCustomerData(response.data);
    } catch (error) {
      console.error("Error fetching Product Stats:", error);
    }
  };
  const fetchTransactionsData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/client/transactions`);
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching Product Stats:", error);
    }
  };
  const fetchGeography = async () => {
    try {
      const response = await axios.get(`${baseUrl}/client/geography`);
      setGeography(response.data);
    } catch (error) {
      console.error("Error fetching Product Stats:", error);
    }
  };
  const fetchOverallStats = async () => {
    try {
      const response = await axios.get(`${baseUrl}/sales/stats`);
      setOverallStats(response.data);
    } catch (error) {
      console.error("Error fetching Product Stats:", error);
    }
  };
  const fetchAdmins = async () => {
    try {
      const response = await axios.get(`${baseUrl}/management/admins`);
      setAdmins(response.data);
    } catch (error) {
      console.error("Error fetching Product Stats:", error);
    }
  };
  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get(`${baseUrl}/general/dashboardstats`);
      setDashboardStats(response.data);
    } catch (error) {
      console.error("Error fetching Product Stats:", error);
    }
  };

  return (
    <ApiContext.Provider
      value={{
        user,
        fetchUser,
        fetchProductwithStats,
        productStats,
        fetchCustomersData,
        CustomerData,
        fetchTransactionsData,
        transactions,
        fetchGeography,
        geography,
        fetchOverallStats,
        overallStats,
        fetchAdmins,
        admins,
        fetchDashboardStats,
        dashboardStats,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
