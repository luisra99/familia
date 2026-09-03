import "./global.css";

import { withErrorHandler } from "@/_pwa-framework/components/error-handling";
import AppErrorBoundaryFallback from "@/_pwa-framework/components/error-handling/fallbacks/App";
import Pages from "@/_pwa-framework/routes/Pages";
import { LanguageProvider } from "./_pwa-framework/components/contexts/i18context";
import { ConfirmProvider } from "material-ui-confirm";
function App() {
  return (
    <LanguageProvider>
      <ConfirmProvider>
        <Pages />
      </ConfirmProvider>
    </LanguageProvider>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
