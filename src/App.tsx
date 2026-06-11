import React, { useEffect } from 'react';
import { useApp } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// Pages import
import Home from './pages/Home';
import About from './pages/About';
import Collection from './pages/Collection';
import Details from './pages/Details';
import CustomRug from './pages/CustomRug';
import Gallery from './pages/Gallery';
import Reviews from './pages/Reviews';
import Faq from './pages/Faq';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Sitemap from './pages/Sitemap';
import Admin from './pages/Admin';

export default function App() {
  const { currentPage, theme } = useApp();

  // Scroll to head on page updates
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Render components according to state parameters
  const renderMainView = () => {
    if (currentPage.startsWith('policy-')) {
      return <Policy />;
    }

    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'collection':
        return <Collection />;
      case 'product-details':
        return <Details />;
      case 'custom-rug':
        return <CustomRug />;
      case 'gallery':
        return <Gallery />;
      case 'reviews':
        return <Reviews />;
      case 'faq':
        return <Faq />;
      case 'contact':
        return <Contact />;
      case 'sitemap':
        return <Sitemap />;
      case 'admin':
        return <Admin />;
      default:
        return <Home />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-serif transition-colors duration-300 ${
      theme === 'dark' ? 'dark bg-neutral-900 text-stone-100' : 'bg-stone-50 text-stone-900'
    }`} id="main-luxury-layout">
      
      {/* Centralized Header and Announcement Bar */}
      <Header />

      {/* Dynamic View container */}
      <main className="flex-1 animate-fadeIn">
        {renderMainView()}
      </main>

      {/* Luxury Footer and Sitemap Index */}
      <Footer />

      {/* Floating Patron Concierge Button */}
      <WhatsAppButton />

    </div>
  );
}
