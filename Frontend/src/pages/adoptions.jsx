import Navbar from "../components/NavBar";
import NewAnimal from "../components/adoptions/newAnimal";
import FilterAnimal from "../components/adoptions/filterAnimal";
import TableAdop from "../components/adoptions/tableCard";
import Footer from "../components/Footer";


function Adoptions() {
  return (
    <>
      <Navbar/>
      <main className="grow w-full mt-35 bg-primary-fixed">
        <section className="flex flex-row md:flex-row items-center gap-4 px-4 py-6">
          <NewAnimal/>
          <FilterAnimal/>
        </section>
        <TableAdop/>
      </main>
      <Footer/>
    </>
  );
}

export default Adoptions;