import Navbar from "../components/NavBar";
import NewAnimal from "../components/adoptions/newAnimal";
import TableAdop from "../components/adoptions/tableCard";
import Footer from "../components/Footer";


function Adoptions() {
  return (
    <>
      <Navbar/>
      <main className="grow w-full mt-35">  
        <NewAnimal/>
        <TableAdop/>
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default Adoptions;