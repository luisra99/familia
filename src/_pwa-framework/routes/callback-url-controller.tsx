import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";
import { logInRedirectPath } from "../config";
import { useSession } from "../session/state";

const CallBackUrlController = () => {
  const [, , sessionFunctions, , ,] = useSession();
  const [user, setUser] = useState<null | boolean>(null);
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    const session_state = new URL(window.location.href).searchParams.get(
      "session_state"
    );
    const user = new URL(window.location.href).searchParams.get("username");
    const password = new URL(window.location.href).searchParams.get("password");

    if (code && session_state) {
      sessionFunctions
        ?.create(code, session_state)
        .then((session: boolean) => setUser(session));
    }
    if (user && password) {
      sessionFunctions
        ?.createOfflineSession(user, password)
        .then((session: boolean) => setUser(session));
    }
  }, [user]);
  return user === null ? (
    <></>
  ) : user ? (
    <Navigate to={logInRedirectPath} />
  ) : (
    <Navigate to="/sign-in" />
  );
};
export default CallBackUrlController;
