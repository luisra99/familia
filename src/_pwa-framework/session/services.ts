import { apiScope, env } from "../config";
import axios from "axios";
export const logInService = async (is: string): Promise<any> => {
  try {
    const { data } = await axios.get(`${apiScope}/login`, {
      params: {
        is,
        redirect: `${env.ENV_SERVER_URL}/create-session`,
      },
    });
    return data.url;
  } catch (error: any) {
    return false;
  }
};
export const getInfoService = async (
  code: string,
  session_state: string
): Promise<any> => {
  try {
    const { data } = await axios.get(`${apiScope}/userInfo`, {
      params: { code, session_state },
    });
    return data;
  } catch (error: any) {
    return false;
  }
};
export const restoreSessionService = async (): Promise<any> => {
  try {
    const { data } = await axios.get(`${apiScope}/restoreSession`);
    return data;
  } catch (error: any) {
    return false;
  }
};
