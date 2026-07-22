import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Adoptions from "./pages/adoptions";
import AboutUs from "./pages/about-us";
import Donations from "./pages/donations";
import FAQ from "./pages/faq";
import Home from "./pages/home";
import News from "./pages/news";
import NewsDetail from "./pages/NewsDetail";
import Reports from "./pages/reports";
import Login from "./pages/login";
import NewsCreate from "./pages/NewsCreate";
import NewsEdit from "./pages/NewsEdit";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import { useAuth } from "./context/AuthContext";

import ScrollToTop from "./components/ScrollToTop";

function AppRoutes() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
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
      <Route path="/news/create" element={<NewsCreate />} />
      <Route path="/news/edit/:slug" element={<NewsEdit />} />
      <Route path="/news/:slug" element={<NewsDetail />} />

      <Route path="/faq" element={<FAQ />} />
      <Route path="/donations" element={<Donations />} />
      <Route path="/reports" element={<Reports />} />

      {/* Ruta 404 para URLs inexistentes */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex flex-col pt-16">
            <Navbar />

            <main className="flex-1 flex items-center justify-center">
              <h1 className="text-4xl font-bold text-gray-600 text-center px-4">
                404 - Página no encontrada
              </h1>
            </main>

            <Footer />
          </div>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
