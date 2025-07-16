import Dashboard from "./pages/Dashboard";
import { Signup } from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { PublicBrainPage } from "./components/PublicBrainPage";
import { LandingPage } from "./pages/LandingPage";
import { PageNotFound } from "./pages/PageNotFound";
import { useAuthRedirect } from "./components/ProtectRoute";

function AppRoutes() {
  useAuthRedirect(); 

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/brain/:userId" element={<PublicBrainPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}