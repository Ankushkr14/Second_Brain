import Dashboard from "./pages/Dashboard";
import { Signup } from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { PublicBrainPage } from "./components/PublicBrainPage";
import { LandingPage } from "./pages/LandingPage";
import { PageNotFound } from "./pages/PageNotFound";
import { useAuthRedirect } from "./components/ProtectRoute";
import { LoadingProvider } from "./context/LoadingContext";
import { useHealthCheck } from "./components/customHooks/healthCheck";
import { Loading } from "./components/Loading";
import { ServerError } from "./pages/ServerError";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AppRoutes() {
  const { isServerHealthy, isChecking, recheckHealth } = useHealthCheck();
  useAuthRedirect(); 

  if (isChecking) {
    return <Loading message="Checking server status..." />;
  }

  if (isServerHealthy === false) {
    return <ServerError onRetry={recheckHealth} isRetrying={isChecking} />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/brain/:userId" element={<PublicBrainPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        limit={3}
      />
    </>
  );
}

export default function App() {
  return (
    <LoadingProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </LoadingProvider>
  );
}