import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

function Contact() {
  return (
    <>
      <Navbar />
      <main className="grow w-full">
        {/* <PageHeader /> */}
        <section aria-label="Información de Contacto">
          {/* <ContactForm /> */}
          <aside aria-label="Detalles de ubicación y redes">
            {/* <ContactInfoCards />
            <LocationMap /> */}
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Contact;