import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

function FAQ() {
  return (
    <>
      <Navbar />
      <main className="grow w-full">
        {/* <PageHeader /> */}
        <section aria-label="Secciones de ayuda">
          <aside aria-label="Navegación de categorías">
            {/* <SidebarNav />
            <ContactSupportCard /> */}
          </aside>
          {/* <FaqContent /> */}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default FAQ;