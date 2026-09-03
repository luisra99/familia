import { useEffect, useState, useRef } from "react";
import { registerSW } from "virtual:pwa-register";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

declare const __BUILD_VERSION__: string;

export const UpdatePWAButton = () => {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  const [updateFound, setUpdateFound] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isUpdating, setIsUpdating] = useState(false);
  const [noUpdateMessage, setNoUpdateMessage] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");
  const [version, setVersion] = useState("");
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const updateSW = registerSW({
      onNeedRefresh() {
        console.info("🔔 Nueva versión detectada (onNeedRefresh)");
        setUpdateFound(true);
        navigator.serviceWorker.getRegistration().then((reg) => {
          if (reg?.waiting) {
            setWaitingWorker(reg.waiting);
            startCountdown();
          }
        });
      },
      onOfflineReady() {
        console.info("✅ App lista para funcionar offline");
        setOfflineReady(true);
      },
    });

    // Verificamos versión local
    const storedDate = localStorage.getItem("lastUpdated");
    const storedVersion = localStorage.getItem("appVersion");
    if (storedDate && storedVersion) {
      setLastUpdated(storedDate);
      setVersion(storedVersion);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startCountdown = () => {
    setCountdown(5);
    timerRef.current = window.setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsUpdating(true);
          applyUpdate();
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelUpdate = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setUpdateFound(false);
    setCountdown(5);
  };

  const applyUpdate = () => {
    if (waitingWorker) {
      console.log("💬 Enviando mensaje: SKIP_WAITING");
      waitingWorker.postMessage({ type: "SKIP_WAITING" });

      waitingWorker.addEventListener("statechange", (e: Event) => {
        const sw = e.target as ServiceWorker;
        if (sw.state === "activated") {
          console.info("✅ SW activado. Recargando...");
          const updateDate = new Date().toLocaleString();
          localStorage.setItem("lastUpdated", updateDate);
          localStorage.setItem("appVersion", __BUILD_VERSION__);
          window.location.reload();
        }
      });
    }
  };

  const checkForUpdate = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (!reg) {
          setNoUpdateMessage(true);
          setTimeout(() => setNoUpdateMessage(false), 3000);
          return;
        }

        reg.update().then(() => {
          if (reg.waiting) {
            setWaitingWorker(reg.waiting);
            setUpdateFound(true);
            startCountdown();
          } else {
            setNoUpdateMessage(true);
            setTimeout(() => setNoUpdateMessage(false), 3000);
          }
        });
      });
    }
  };

  return (
    <div>
      <Grid item xl={12}>
        <Button
          onClick={checkForUpdate}
          style={{
            backgroundColor: offlineReady ? "#3b82f6" : "#10b981",
            color: "white",
            padding: "12px 20px",
            borderRadius: "10px",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
            width: "100%",
            transition: "background-color 0.3s ease",
          }}
          title={offlineReady ? "App lista para funcionar offline" : "Buscar nueva versión"}
        >
          {offlineReady ? "✅ App lista offline" : "🔍 Buscar nueva versión"}
        </Button>
      </Grid>

      {updateFound && !isUpdating && (
        <div
          style={{
            position: "fixed",
            bottom: 80,
            left: 20,
            backgroundColor: "#facc15",
            color: "#1f2937",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            zIndex: 9999,
            maxWidth: 300,
          }}
        >
          <p>⚡ Nueva versión disponible.</p>
          <p>Se actualizará en {countdown}s...</p>
          <button
            onClick={cancelUpdate}
            style={{
              marginTop: "10px",
              backgroundColor: "#ef4444",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Cancelar
          </button>
        </div>
      )}

      {isUpdating && (
        <div
          style={{
            position: "fixed",
            bottom: 80,
            left: 20,
            backgroundColor: "#3b82f6",
            color: "white",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            zIndex: 9999,
            maxWidth: 320,
          }}
        >
          <p>🔄 Actualizando...</p>
          <div
            className="loader"
            style={{
              border: "4px solid #ffffff44",
              borderTop: "4px solid white",
              borderRadius: "50%",
              width: 24,
              height: 24,
              animation: "spin 1s linear infinite",
              margin: "10px auto",
            }}
          />
          <p>
            Cuando termine, la app se recargará automáticamente
            <br />y estarás usando la nueva versión.
          </p>
        </div>
      )}

      {noUpdateMessage && (
        <div
          style={{
            position: "fixed",
            bottom: 80,
            left: 20,
            backgroundColor: "#6b7280",
            color: "white",
            padding: "12px 16px",
            borderRadius: "10px",
            zIndex: 9999,
          }}
        >
          ✅ Ya tienes la última versión
        </div>
      )}

      {version && lastUpdated && (
        <div
          style={{
            marginTop: 16,
            fontSize: 14,
            color: "#6b7280",
            textAlign: "center",
          }}
        >
          🗓️ Versión: <strong>{version}</strong>
          <br />
          ⏱️ Actualizada en este dispositivo el <strong>{lastUpdated}</strong>
        </div>
      )}

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};
