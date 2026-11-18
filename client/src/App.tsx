import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Workspace from "./pages/Workspace";
import { hydrateServerState, installServerStateBridge } from "./lib/serverState";
import { useEffect, useState } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/workspace/:role/website-configuration" component={Workspace} />
      <Route path="/workspace/:role" component={Workspace} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [stateReady, setStateReady] = useState(false);
  useEffect(() => {
    installServerStateBridge();
    hydrateServerState().finally(() => setStateReady(true));
  }, []);
  if (!stateReady) {
    return <div className="workspace-state"><div className="button-spinner" /><span>Loading Velentra workspace…</span></div>;
  }
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
