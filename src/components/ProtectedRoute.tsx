import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function ProtectedRoute() {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Checking credentials...</div>;
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/cms/login" replace />;
  }

  // If authenticated but not admin, redirect to home
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // If authenticated and admin, render child routes
  return <Outlet />;
}
