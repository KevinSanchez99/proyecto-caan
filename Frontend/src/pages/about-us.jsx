import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import HistorySection from "../components/aboutUs/HistorySection";
import OverlappingImagesSection from "../components/aboutUs/OverlappingImagesSection";
import FacilitiesSection from "../components/aboutUs/FacilitiesSection";

import React, { useState } from 'react';

export default function AboutUs() {
  return (
    <div className="bg-background text-on-background font-body-md text-body-md antialiased min-h-screen flex flex-col pt-20 container_max">
      <NavBar/>
      <main className="flex-grow w-full pb-12">
        <HistorySection />
        <OverlappingImagesSection />
        <FacilitiesSection />
      </main>
      <Footer />
    </div>
  );
};