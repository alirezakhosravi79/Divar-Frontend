import { Route, Routes } from "react-router-dom";
import AdminPage from "../Pages/AdminPage";
import AuthPage from "../Pages/AuthPage";
import DashboardPage from "../Pages/DashboardPage";
import ErrorPage from "../Pages/ErrorPage";
import HomePage from "../Pages/HomePage";

function Router() {
  return (
    <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/dashboard" element={<DashboardPage/>}/>
        <Route path="/admin" element={<AdminPage/>}/>
        <Route path="/auth" element={<AuthPage/>}/>
        <Route path="*" element={<ErrorPage/>}/>
    </Routes>
  )
}

export default Router;
 