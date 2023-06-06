import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginChecker = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkCookieExpiration = () => {
          const cookies = document.cookie.split(';');
          const cookieExpiration = getCookieExpiration(cookies);
          if (cookieExpiration) {
            const currentTime = new Date();
            if (currentTime > cookieExpiration) {
              //navigate("/inicioSesion");
            }
          } else {
            //navigate('/inicioSesion');
          }
        };
        checkCookieExpiration();
      }, [navigate]);

    const getCookieExpiration = (cookies) => {
        for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === 'jwt') {
            const expiration = cookieValue.replace(/[^0-9]/g, '');
            const expirationDate = new Date(parseInt(expiration, 10) * 1000);
            return expirationDate;
        }
        }
        return null;
    };
  return null;
};

export default LoginChecker;
