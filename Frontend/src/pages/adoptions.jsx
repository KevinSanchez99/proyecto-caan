import { useState } from "react";
import Navbar from "../components/NavBar";
import Presentation from "../components/adoptions/Prest";
import NewAnimal from "../components/adoptions/newAnimal";
import FilterAnimal from "../components/adoptions/filterAnimal";
import TableAdop from "../components/adoptions/tableCard";
import Footer from "../components/Footer";


function Adoptions() {
  const [filters, setFilters] = useState({});

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="bg-background w-full text-on-background font-body-md text-body-md antialiased min-h-screen flex flex-col pt-20">
      <Navbar/>
      <main className="max-w-container_max mx-auto px-8 py-12 grow w-full">
        <Presentation/>
        <section className="px-4 py-6 w-full">
          <div className="w-full mx-auto flex items-center justify-end gap-4">
            <NewAnimal/>
            <FilterAnimal onApplyFilters={handleApplyFilters} />
          </div>
        </section>
        <TableAdop filters={filters} />
      </main>
      <Footer/>
    </div>
  );
}

export default Adoptions;