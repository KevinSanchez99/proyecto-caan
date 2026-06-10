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
    <>
      <Navbar/>
      <main className="grow w-full mt-20 bg-background">
        <Presentation/>
        <section className="px-4 py-6 w-full">
          <div className="w-[90%] mx-auto flex items-center justify-end gap-4">
            <NewAnimal/>
            <FilterAnimal onApplyFilters={handleApplyFilters} />
          </div>
        </section>
        <TableAdop filters={filters} />
      </main>
      <Footer/>
    </>
  );
}

export default Adoptions;