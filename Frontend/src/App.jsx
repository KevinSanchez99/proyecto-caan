import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Adoptions from "./pages/adoptions";
import AboutUs from "./pages/about-us";
import Contact from "./pages/contact";
import Donations from "./pages/donations";
import FAQ from "./pages/faq";
import Home from "./pages/home";
import News from "./pages/news";
//import Reports from "./pages/reports";
import Login from "./pages/login";

import { useAuth } from "./context/AuthContext";

function AppRoutes() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h3>Cargando aplicación...</h3>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/admin" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/adoptions" element={<Adoptions />} />
      <Route path="/news" element={<News />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/donations" element={<Donations />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;