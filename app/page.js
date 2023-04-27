"use client";
import React from 'react';
import Footer from './components/footer';
import Header from './components/header'
export default function Home() {
  return (
    <section className="flex flex-col h-screen justify-between">
      <Header />
      <Footer />
    </section>
  )
}
