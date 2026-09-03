import { ComponentType, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RecoilRoot } from "recoil";
import SessionBackDrop from "./_pwa-framework/components/backdrop/backdrop";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import "./global.css";
import ThemeProvider from "@/theme/Provider";
import { CssBaseline } from "@mui/material";
import HotKeys from "./_pwa-framework/sections/HotKeys";
import SW from "./_pwa-framework/sections/SW";
import Notifications from "./_pwa-framework/sections/Notifications";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

function render(App: ComponentType) {
  root.render(
    <StrictMode>
      <RecoilRoot>
        <HelmetProvider>
          <ThemeProvider>
            <>
              <CssBaseline />
              <Notifications />
              <HotKeys />
              <SessionBackDrop />
              <HelmetProvider>
                <BrowserRouter>
                  <Suspense>
                    <App />
                  </Suspense>
                </BrowserRouter>
              </HelmetProvider>
            </>
          </ThemeProvider>
        </HelmetProvider>
      </RecoilRoot>
    </StrictMode>
  );
}

export default render;
