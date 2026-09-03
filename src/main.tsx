import welcome from "./_pwa-framework/utils/welcome";
// Root contains the main dependencies and providers of the base app
//  - React, ReactDom, RecoilRoot, HelmetProvider, ThemeProvider, MUI-core)
// App contains the main structure of the base app
// These are the two main chunks that are used to render the core structure of the app
// Importing them with Promise.all (by using HTTP/2 multiplexing) we can load them in parallel
// and achieve the best possible performance

async function bootstrap() {
  // const config = await fetch("/config.json").then((r) => r.json());
  // (window as any).__CONFIG__ = config;
  const [{ default: render }, { default: App }] = await Promise.all([
    import("@/Root"),
    import("@/App"),
  ]);
  render(App);
}
bootstrap();


// welcome message for users in the console
welcome();

// ts(1208)
export {};
