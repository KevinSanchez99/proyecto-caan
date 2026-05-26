import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

function Donations() {
  return (
    <>
      <Navbar />
      <main className="grow w-full">
        {/* <PageHeader /> */}
        <div className="layout-grid">
          <section aria-label="Formulario de aporte económico">
            {/* <DonationForm /> */}
          </section>
          <aside aria-label="Impacto y otras formas de ayudar">
            {/* <WishlistCard /> */}
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Donations;