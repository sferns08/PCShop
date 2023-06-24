import { Outlet, useNavigate } from "react-router";
import InicioSesion from "./pages/public/inicioSesion";
import { useEffect } from "react";

const useAutenticacion = () => {
  const cookies = document.cookie.split(';');
  const jwtCookie = cookies.find(cookie => cookie.trim().startsWith('jwt='));
  return Boolean(jwtCookie);    
};

const RutaProtegida = () => {
  const isAut = useAutenticacion();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAut) {
      navigate('/inicioSesion');
    }
  }, [isAut, navigate]);
  
  return isAut ? <Outlet/> : <InicioSesion />;
};

export default RutaProtegida;