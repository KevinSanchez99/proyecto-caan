import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import HistorySection from "../components/aboutUs/HistorySection";
import OverlappingImagesSection from "../components/aboutUs/OverlappingImagesSection";
import FacilitiesSection from "../components/aboutUs/FacilitiesSection";

export default function AboutUs() {
  return (
    <div className="bg-background text-on-background font-body-md text-body-md antialiased min-h-screen flex flex-col pt-12 container_max">
      <NavBar/>
      <main className="max-w-container_max mx-auto px-8 py-12 grow w-full">
        <HistorySection />
        <OverlappingImagesSection />
        <FacilitiesSection />
      </main>
      <Footer />
    </div>
  );
};