import Dashboard from "./pages/Dashboard";
import { Signup } from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { PublicBrainPage } from "./components/PublicBrainPage";

export default function App(){
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/brain/:userId" element={<PublicBrainPage/>}/>
    </Routes>
  </BrowserRouter>
}