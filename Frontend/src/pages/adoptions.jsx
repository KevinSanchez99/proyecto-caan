import Navbar from "../components/NavBar";
import PageHeader from "../components/adoptions/Prest";
import NewAnimal from "../components/adoptions/newAnimal";
import TableAdop from "../components/adoptions/TableAdoptions";
import Footer from "../components/Footer";


function Adoptions() {
  return (
    <>
      <Navbar/>
      <main className="grow w-full mt-35">
        <PageHeader/>
        <NewAnimal/>
        <TableAdop/>
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default Adoptions;