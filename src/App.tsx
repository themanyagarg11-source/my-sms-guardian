import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Welcome from "./pages/Welcome";
import PasscodeSetup from "./pages/PasscodeSetup";
import Dashboard from "./pages/Dashboard";
import ContactsSettings from "./pages/ContactsSettings";
import RingerSettings from "./pages/RingerSettings";
import LocationSettings from "./pages/LocationSettings";
import LockSettings from "./pages/LockSettings";
import SOSSettings from "./pages/SOSSettings";
import WipeSettings from "./pages/WipeSettings";
import AccessibilitySettings from "./pages/AccessibilitySettings";
import Help from "./pages/Help";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/setup" element={<PasscodeSetup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contacts" element={<ContactsSettings />} />
          <Route path="/ringer" element={<RingerSettings />} />
          <Route path="/location" element={<LocationSettings />} />
          <Route path="/lock" element={<LockSettings />} />
          <Route path="/sos" element={<SOSSettings />} />
          <Route path="/wipe" element={<WipeSettings />} />
          <Route path="/accessibility" element={<AccessibilitySettings />} />
          <Route path="/help" element={<Help />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
