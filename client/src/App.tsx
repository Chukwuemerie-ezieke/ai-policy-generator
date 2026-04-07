import { Switch, Route, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { StoreContext } from "@/lib/store";
import type { GeneratedPolicy } from "@/lib/policyEngine";
import Home from "@/pages/Home";
import Generate from "@/pages/Generate";
import Result from "@/pages/Result";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/not-found";

export default function App() {
  const [policies, setPolicies] = useState<GeneratedPolicy[]>([]);

  const addPolicy = (p: GeneratedPolicy) => {
    setPolicies((prev) => [p, ...prev]);
  };

  return (
    <StoreContext.Provider value={{ policies, addPolicy }}>
      <Router hook={useHashLocation}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/generate" component={Generate} />
          <Route path="/result/:id" component={Result} />
          <Route path="/dashboard" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </Router>
      <Toaster />
    </StoreContext.Provider>
  );
}
