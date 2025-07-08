import { useEffect, useState } from 'react';
import * as jwt_decode from 'jwt-decode';

export function useSessionTimeout(onLogout, onRefresh) {
  const [showSessionModal, setShowSessionModal] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('session_token');
      if (!token) return;
      try {
        
        const decode = jwt_decode.default || jwt_decode;
        const { exp } = decode(token);
        const now = Date.now() / 1000;
        if (exp - now < 120 && exp - now > 0) {
          setShowSessionModal(true);
        } else if (exp < now) {
          setShowSessionModal(false);
          if (onLogout) onLogout();
        } else {
          setShowSessionModal(false);
        }
      } catch (e) {
        setShowSessionModal(false);
      }
    };
    const interval = setInterval(checkToken, 30000);
    checkToken(); // initial check
    return () => clearInterval(interval);
  }, [onLogout]);

  return [showSessionModal, setShowSessionModal];
}
