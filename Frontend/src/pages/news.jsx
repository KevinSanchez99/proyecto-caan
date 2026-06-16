import { useState, useEffect } from 'react';
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import NewsHeader from "../components/news/NewsHeader";
import NewsCard from "../components/news/NewsCard";
import Pagination from "../components/news/Pagination";
import { getNewsRequest } from '../../api/auth';
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function News() {
    const { isAuthenticated } = useAuth();
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedSearch(searchQuery);
      }, 500);

      return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
      const fetchNews = async () => {
        setIsLoading(true);
        try {
          const response = await getNewsRequest(currentPage, 6, categoryFilter, debouncedSearch, dateFilter);
          setNews(response.data.docs);
          setTotalPages(response.data.totalPages);
        } catch (error) {
          console.error("Error al cargar noticias:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchNews();
    }, [currentPage, categoryFilter, debouncedSearch, dateFilter]);

    const handleCategoryChange = (cat) => {
      setCategoryFilter(cat);
      setCurrentPage(1);
    };

    const handleSearchChange = (val) => {
      setSearchQuery(val);
      setCurrentPage(1);
    };

    const handleDateChange = (val) => {
      setDateFilter(val);
      setCurrentPage(1);
    };

    return (
      <div className="bg-background w-full text-on-background font-body-md text-body-md antialiased min-h-screen flex flex-col pt-20">
        <Navbar />
        <main className="max-w-container_max mx-auto px-8 py-12 grow w-full">
          <section className="mb-xl">
            <div className="flex justify-between items-center mb-4">
              <h1 className="font-h1 text-[40px] md:text-[50px] text-on-surface text-center grow py-12">
                Noticias del CAAN
              </h1>
              {isAuthenticated && (
                <Link to="/news/create" className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-emerald-700 transition">
                  + Crear Noticia
                </Link>
              )}
            </div>

            <NewsHeader 
              currentCategory={categoryFilter} 
              onCategoryChange={handleCategoryChange}
              onSearch={handleSearchChange}
              currentDate={dateFilter}
              onDateChange={handleDateChange}
            />
            
            {isLoading ? (
              <div className="text-center py-20 text-xl font-bold">Cargando...</div>
            ) : news.length === 0 ? (
              <div className="text-center py-20 text-xl text-gray-500">No hay resultados para esa búsqueda.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                {news.map((article) => (
                  <NewsCard key={article._id} article={article} />
                ))}
              </div>
            )}
          </section>

          {!isLoading && totalPages > 1 && (
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage} 
            />
          )}
        </main>
        <Footer />
      </div>
    );
}