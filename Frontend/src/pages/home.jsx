import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import Hero from "../components/home/Hero";
import NewsSlider from "../components/home/NewsSlider";
import QuickAdoptions from "../components/home/QuickAdoptions";
import CallToAction from "../components/home/CallToAction";


import React, { useState } from 'react';

export default function Home() {
  return (
    <div className="bg-background text-on-background font-body-md text-body-md antialiased min-h-screen flex flex-col pt-20">
      <NavBar />
      <main className="flex-grow w-full">
        <Hero />
        <NewsSlider />
        <QuickAdoptions />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};