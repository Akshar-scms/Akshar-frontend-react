import React from 'react';
import Landing from './component/Herosection/Landing';
import Features from './component/Herosection/Features';
import Testimonials from './component/Herosection/Testimonials.jsx';
import FAQ from './component/Herosection/FAQ.jsx';
import OurTeam from './component/Herosection/OurTeam.jsx';
import Footer from './component/Herosection/Footer.jsx';

const Herosection = () => {
  return (
    <div className="w-full relative bg-white overflow-hidden flex flex-col items-start justify-start pt-0 px-0 box-border leading-[normal] tracking-[normal]">
      <Landing />
      <Features />
      <Testimonials />
      <FAQ />
      <OurTeam />
      <Footer />
    </div>
  );
};

export default Herosection;
