import Navbar from "../components/NavBar";
import Presentation from "../components/adoptions/Prest";
import NewAnimal from "../components/adoptions/newAnimal";
import FilterAnimal from "../components/adoptions/filterAnimal";
import TableAdop from "../components/adoptions/tableCard";
import Footer from "../components/Footer";


function Adoptions() {
  return (
    <>
      <Navbar/>
      <main className="grow w-full mt-20 bg-background">
        <Presentation/>
        <section className="flex flex-row md:flex-row items-center justify-end gap-4 px-4 py-6 w-full">
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