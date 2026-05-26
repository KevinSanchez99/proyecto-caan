import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <main className="grow w-full"> 
        {/* <BasicInfoSection />
        <NewsSlider />
        <FeaturedAnimals />
        <DonationRequest /> */}
      </main>
      <Footer />
    </>
  );
}

export default Home;