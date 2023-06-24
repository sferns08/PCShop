import { Outlet, useNavigate } from "react-router";
import SignIn from "./pages/public/signIn";
import { useEffect } from "react";

const useAuth = () => {
  const cookies = document.cookie.split(';');
  const jwtCookie = cookies.find(cookie => cookie.trim().startsWith('jwt='));
  return Boolean(jwtCookie);    
};

const ProtectedRoute = () => {
  const isAuth = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuth) {
      navigate('/signIn');
    }
  }, [isAuth, navigate]);
  
  return isAuth ? <Outlet/> : <SignIn />;
};

export default ProtectedRoute;