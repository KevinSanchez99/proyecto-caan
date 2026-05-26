import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

function AboutUs() {
  return (
    <>
      <Navbar />
      <main className="grow w-full">
        <section aria-label="Nuestra Historia">
          {/* <HistoryBlock />
          <HistoryGalleryBlock /> */}
        </section>
        {/* <FacilitiesSection /> */}
      </main>
      <Footer />
    </>
  );
}

export default AboutUs;