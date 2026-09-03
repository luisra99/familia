import { atom, useRecoilState } from "recoil";
import { getInfoService, restoreSessionService } from "./services";

import mockedProfile from "@/app/mockedProfile.json";
import { mode } from "../config";
import { getCookie, removeCookie } from "../helpers/cookies";

const defaultSession = {
  status: false,
};

const sessionAtom = atom<any>({
  key: "session-state",
  default: mode ? mockedProfile :getCookie("JWT")? defaultSession:null,
});
const backdropAtom = atom<any>({
  key: "backdorp-state",
  default: !!getCookie("JWT"),
});

export function useSession(): [
  state: any,
  accessProfile: any,
  methods: { create: any; restore: any; createOfflineSession: any },
  close: any,
  backdrop: any,
  setBackDrop: any,
] {
  const [state, setSession] = useRecoilState(sessionAtom);
  const [backdrop, setBackDrop] = useRecoilState(backdropAtom);

  function close() {
    setSession({
      status: false,
    });
    removeCookie("session_state");
    removeCookie("JWT");
    // window.location.href = "/sign-in";
  }

  async function create(code: string, session_state: string): Promise<boolean> {
    setBackDrop(true);
    let userData = await getInfoService(code, session_state);
    if (userData.message) {
      setSession(defaultSession);
      setBackDrop(false);
      return false;
    }
    setBackDrop(false);
    setSession(userData);
    return true;
  }

  async function createOfflineSession(
    user: string,
    password: string
  ): Promise<boolean> {
    setBackDrop(true);
    let authorized =
      localStorage.getItem("offlineMode") === `${user}:${password}`;

    let userData;
    if (authorized) {
      localStorage.setItem("offlineSessionActive", "true");
      userData = localStorage.getItem("userData") ?? "";
      userData = userData ? JSON.parse(userData) : null;
    }

    if (!userData) {
      setSession(defaultSession);
      setBackDrop(false);
      return false;
    }
    setBackDrop(false);
    setSession(userData);
    return true;
  }
  async function restore(): Promise<boolean> {

    let userData = localStorage.getItem("offlineSessionActive")
      ? JSON.parse(localStorage.getItem("userData") ?? "")
      : await restoreSessionService();
    if (userData.message) {
      setSession(defaultSession);
      setBackDrop(false);
      window.location.reload();
      return false;
    }
    setBackDrop(false);
    setSession(userData);
    return true;
  }

  return [
    state,
    state?.accessProfile,
    { create, restore, createOfflineSession },
    close,
    backdrop,
    setBackDrop,
  ];
}
