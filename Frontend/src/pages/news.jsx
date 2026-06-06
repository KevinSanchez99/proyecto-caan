import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

import NewsHeader from "../components/news/NewsHeader";
import NewsCard from "../components/news/NewsCard";
import Pagination from "../components/news/Pagination";

import React, { useState } from 'react';
import newsData from "../components/news/NewsData.json";

export default function News() {
  return (
    <div className="bg-background text-on-background font-body-md text-body-md antialiased min-h-screen flex flex-col pt-20">
      <Navbar />
      <main className="max-w-container_max mx-auto px-8 py-12 flex-grow w-full">
        <section className="mb-xl">
          <h1 class="font-h1 text-[40px] md:text-[50px] text-on-surface leading-tight mb-4 text-center">Noticias del CAAN</h1>
          <NewsHeader />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {newsData.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <a className="inline-block border border-primary text-primary font-label-sm text-label-sm px-6 py-2 rounded-full" href="#">
              Ver todas las noticias
            </a>
          </div>
        </section>
        <Pagination />
      </main>
      <Footer />
    </div>
  );
};