import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/NavBar";
import Presentation from "../components/adoptions/Prest";
import NewAnimal from "../components/adoptions/newAnimal";
import FilterAnimal from "../components/adoptions/filterAnimal";
import TableAdop from "../components/adoptions/tableCard";
import Footer from "../components/Footer";


function Adoptions() {
  const { isAuthenticated } = useAuth();
  const [filters, setFilters] = useState({});
  
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const handleAnimalCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="bg-background w-full text-on-background font-body-md text-body-md antialiased min-h-screen flex flex-col pt-30">
      <Navbar/>
      <main className="max-w-container_max mx-auto px-8 grow w-full pb-10">
        <Presentation/>
        <section className="w-full">
          <div className="w-full mx-auto flex items-center justify-end gap-4 py-10">
            <NewAnimal onAnimalCreated={handleAnimalCreated} />
            <FilterAnimal onApplyFilters={handleApplyFilters} isAuthenticated={isAuthenticated} />
          </div>
        </section>
        <TableAdop filters={filters} refreshTrigger={refreshTrigger} />
      </main>
      <Footer/>
    </div>
  );
}

export default Adoptions;