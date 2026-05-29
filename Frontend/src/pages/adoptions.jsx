import Navbar from "../components/NavBar";
import PageHeader from "../components/adoptions/Prest";
import FilterDog from "../components/adoptions/FilterDog";
import TableAdop from "../components/adoptions/TableAdoptions";
import Footer from "../components/Footer";


function Adoptions() {
  return (
    <>
      <Navbar/>
      <main className="grow w-full mt-35">
        <PageHeader/>
        <FilterDog/>
        <TableAdop/>
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default Adoptions;