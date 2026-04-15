
import { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import StudyTools from './components/StudyTools';
import Collaboration from './components/Collaboration';
import SmartGlasses from './components/SmartGlasses';
import Analytics from './components/Analytics';
import CTA from './components/CTA';
import Footer from '../../components/layout/Footer';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#050B18] text-white min-h-screen overflow-x-hidden">
      <Navbar scrolled={scrolled} />
      <Hero />
      <Features />
      <HowItWorks />
      <StudyTools />
      <Collaboration />
      <SmartGlasses />
      <Analytics />
      <CTA />
      <Footer />
    </div>
  );
}
