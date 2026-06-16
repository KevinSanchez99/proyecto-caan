import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import Hero from "../components/home/Hero";
import NewsSlider from "../components/home/NewsSlider";
import QuickAdoptions from "../components/home/QuickAdoptions";
import CallToAction from "../components/home/CallToAction";
import ReportBanner from "../components/home/ReportBanner";

export default function Home() {
  return (
    <div className="bg-background text-on-background font-body-md text-body-md antialiased min-h-screen flex flex-col pt-10">
      <NavBar />
      <main className="max-w-container_max mx-auto px-8 py-12 grow w-full">
        <Hero />
        <section>
          <ReportBanner />
        </section>
        <NewsSlider />
        <QuickAdoptions />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};