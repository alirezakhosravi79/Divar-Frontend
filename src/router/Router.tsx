import { Navigate, Route, Routes } from "react-router-dom";
import AdminPage from "../Pages/AdminPage";
import AuthPage from "../Pages/AuthPage";
import DashboardPage from "../Pages/DashboardPage";
import ErrorPage from "../Pages/ErrorPage";
import HomePage from "../Pages/HomePage";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/user";
import Loader from "../Components/Template/modules/Loader";

function Router() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  console.log({ data, isLoading, error });

  if (isLoading) return <Loader />;

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={data ? <DashboardPage /> : <Navigate to="/auth"/>} />
      <Route path="/admin" element={data && data.data.role === "ADMIN" ? (<AdminPage />) :
       <Navigate to="/"/>} />
      <Route path="/auth" element={data ? <Navigate to="/dashboard"/> : <AuthPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default Router;
