import { env } from "../config";
import { logInService } from "./services";

export const logIng = (is: string, setLoanding?: (state: boolean) => void) => {
  logInService(is).then((url: string) => {
    if (url) {
      window.location.href = url;
    } else {
      alert("Servidor de identidad no especificado");
    }
  });
  setLoanding?.(false);
};
export const offlineLogIng = (username: string, password: string) => {
  window.location.href = `${
    env.ENV_SERVER_URL
  }/create-session?username=${username}&password=${password}`;
};
// export const restoreSession = async () => {
//   return await restoreSessionService();
// };
