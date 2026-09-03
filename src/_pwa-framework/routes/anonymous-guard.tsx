import { Navigate } from "react-router-dom";
import { getCookie } from "../helpers/cookies";
import { mode } from "../config";

const AnonymousGuard = ({ children }: any) => {
  const session = (): boolean => {
    return (
      !!getCookie("JWT") ||
      !!localStorage.getItem("offlineSessionActive") ||
      mode
    );
  };
  return !session() ? children : <Navigate to="/" />;
};
export default AnonymousGuard;
