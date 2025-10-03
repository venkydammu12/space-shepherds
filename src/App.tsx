import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RouteLoader from "./components/RouteLoader";

// Lazy load all route components for optimal bundle splitting
const Landing = lazy(() => import("./pages/Landing"));
const ProblemPage = lazy(() => import("./pages/ProblemPage"));
const SolutionPage = lazy(() => import("./pages/SolutionPage"));
const VirtualPrototypePage = lazy(() => import("./pages/VirtualPrototypePage"));
const ImpactPage = lazy(() => import("./pages/ImpactPage"));
const MissionControl = lazy(() => import("./components/MissionControl"));
const RoboNavigator = lazy(() => import("./pages/RoboNavigator"));
const RoboEyeCamera = lazy(() => import("./pages/RoboEyeCamera"));
const AIRobotPage = lazy(() => import("./pages/AIRobotPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/problem" element={<ProblemPage />} />
            <Route path="/solution" element={<SolutionPage />} />
            <Route path="/virtual-prototype" element={<VirtualPrototypePage />} />
            <Route path="/impact" element={<ImpactPage />} />
            <Route path="/mission-control" element={<MissionControl />} />
            <Route path="/robo-navigator" element={<RoboNavigator />} />
            <Route path="/robo-eye-camera" element={<RoboEyeCamera />} />
            <Route path="/ai-robot" element={<AIRobotPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;