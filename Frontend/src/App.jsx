import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Adoptions from "./pages/adoptions";
import AboutUs from "./pages/about-us";
import Donations from "./pages/donations";
import FAQ from "./pages/faq";
import Home from "./pages/home";
import News from "./pages/news";
import Reports from "./pages/reports";
import Login from "./pages/login";

function App() {
  return(
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Login/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/about-us" element={<AboutUs/>} />
          <Route path="/adoptions" element={<Adoptions/>} />
          <Route path="/news" element={<News/>} />
          <Route path="/faq" element={<FAQ/>} />
          <Route path="/reports" element={<Reports/>} />
          <Route path="/donations" element={<Donations/>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;