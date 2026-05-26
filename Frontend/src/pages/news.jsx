import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

function News() {
  return (
    <>
      <Navbar />
      <main className="grow w-full">
        <section aria-label="Noticias y Comunidad">
          <header>
            {/* <SectionTitle />
            <NewsFilterBar /> */}
          </header>
          {/* <NewsGrid /> */}
        </section>
        {/* <Pagination /> */}
      </main>
      <Footer />
    </>
  );
}

export default News;