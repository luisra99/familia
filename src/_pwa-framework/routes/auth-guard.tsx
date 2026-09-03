import { Navigate } from "react-router-dom";
import { getCookie } from "../helpers/cookies";
import { mode } from "../config";
import { useSession } from "../session/state";
import { useEffect } from "react";

const AuthGuard = ({ children }: any) => {
  const [user, , functions, , ,] = useSession();

  useEffect(()=>{
     if (
      (!!getCookie("JWT") || !!localStorage.getItem("offlineSessionActive")) &&
      !user?.PI &&
      !mode
    ) functions?.restore?.();

  },[])

  return user ? children : <Navigate to="/landing" />;
};
export default AuthGuard;
