import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, ArrowRight, Truck, RefreshCw, FileText } from 'lucide-react';

export default function Policy() {
  const { currentPage, setCurrentPage } = useApp();

  // Determine initial active tab based on currentPage string parameter (e.g., 'policy-shipping', etc.)
  const getTabFromPage = () => {
    if (currentPage === 'policy-shipping') return 'shipping';
    if (currentPage === 'policy-refund') return 'refund';
    if (currentPage === 'policy-terms') return 'terms';
    if (currentPage === 'policy-privacy') return 'privacy';
    return 'shipping';
  };

  const [activeTab, setActiveTab] = useState<'shipping' | 'refund' | 'terms' | 'privacy'>(getTabFromPage());

  // React to parent category page changes
  React.useEffect(() => {
    if (currentPage.startsWith('policy-')) {
      setActiveTab(currentPage.replace('policy-', '') as any);
    }
  }, [currentPage]);

  const tabs = [
    { id: 'shipping', label: 'Shipping Policy', icon: <Truck className="h-4.5 w-4.5" /> },
    { id: 'refund', label: 'Refund & Returns', icon: <RefreshCw className="h-4.5 w-4.5" /> },
    { id: 'terms', label: 'Terms & Conditions', icon: <FileText className="h-4.5 w-4.5" /> },
    { id: 'privacy', label: 'Privacy Policy', icon: <ShieldCheck className="h-4.5 w-4.5" /> }
  ];

  return (
    <div className="font-serif bg-stone-50 dark:bg-neutral-900 text-stone-900 dark:text-stone-100 transition-colors duration-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <ShieldCheck className="h-10 w-10 text-amber-500/25 mx-auto" />
          <span className="text-[11px] font-sans font-bold tracking-[0.3em] uppercase text-neutral-400">LEGAL & LOGISTICS PORTFOLIO</span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-wide">Policies & Agreements</h1>
          <p className="text-xs font-sans text-stone-600 dark:text-neutral-400 leading-normal max-w-lg mx-auto">
            Governing rules of raw weaving, client acquisitions, refunds, and global freight protocols.
          </p>
        </div>

        {/* Tab Buttons bar */}
        <div className="flex flex-wrap md:flex-nowrap justify-center border-b border-neutral-200 dark:border-neutral-805">
          {tabs.map(tb => (
            <button
              key={tb.id}
              onClick={() => {
                setActiveTab(tb.id as any);
                setCurrentPage(`policy-${tb.id}`);
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 border-b-2 font-sans text-xs font-bold uppercase tracking-widest transition duration-300 cursor-pointer ${
                activeTab === tb.id 
                  ? 'border-amber-400 text-amber-400' 
                  : 'border-transparent text-neutral-400 hover:text-stone-200'
              }`}
            >
              {tb.icon}
              <span>{tb.label}</span>
            </button>
          ))}
        </div>

        {/* Tab content sheets */}
        <div className="bg-white dark:bg-neutral-950 p-8 rounded-lg border border-neutral-200 dark:border-neutral-850 shadow-xl text-left space-y-6">
          
          {activeTab === 'shipping' && (
            <div className="space-y-4 font-sans text-xs md:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed tracking-wide">
              <h2 className="font-serif text-lg md:text-xl font-bold uppercase tracking-wider text-amber-300 border-b border-neutral-900 pb-2 mb-4">India & International Secure Carriage</h2>
              <p>
                At Premium Rug Collection, we recognize that a luxury carpet is a high-value art investment. We do not fold or stuff carpets into loose cardboard parcels. Every product is carefully vacuum-sealed in heavy-duty poly moisture shields and then rolled inside high-strength structural cylinders.
              </p>
              <h4 className="font-serif text-[11px] font-bold uppercase tracking-widest text-amber-500 mt-6 block">1. SHIPPING TIMELINES</h4>
              <p>
                <strong>Catalog In-Stock Items:</strong> Dispatched from our Thane warehouse within 2 to 3 days of booking confirmation. Average carriage transit periods are 3–5 working days inside India, and 7–10 days globally (e.g. United States, United Kingdom, UAE).
              </p>
              <p>
                <strong>Bespoke Custom Orders:</strong> Configured hand-tufted looms in Bhadohi are assigned in real-time. Designing, dyeing, weaving, structural latex backing, and finishing take 8 to 12 weeks. Clients are hosted with weekly WhatsApp progress checks throughout this time.
              </p>
              <h4 className="font-serif text-[11px] font-bold uppercase tracking-widest text-amber-500 mt-6 block">2. FREIGHT INSURANCE & CARRIER SELECTION</h4>
              <p>
                All international transits are handled via premium air and ocean freight carriers (FedEx, DHL, Sequel Logistics). Every parcel is covered under comprehensive door-to-door transit insurance policy structures to protect our patrons' assets from any extreme logistics anomalies.
              </p>
            </div>
          )}

          {activeTab === 'refund' && (
            <div className="space-y-4 font-sans text-xs md:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed tracking-wide">
              <h2 className="font-serif text-lg md:text-xl font-bold uppercase tracking-wider text-amber-300 border-b border-neutral-900 pb-2 mb-4">Refund, return & Loom cancellation rules</h2>
              <p>
                Our weaver cooperative prides itself on flawless surface precision. However, we back our patrons' trust with standard legal frameworks protecting their transactions.
              </p>
              <h4 className="font-serif text-[11px] font-bold uppercase tracking-widest text-amber-500 mt-6 block font-bold">1. CATALOG HANDCRAFT CARPET RETURNS</h4>
              <p>
                Our standard catalogue items are covered under a <strong>7-Day Returns Window</strong>. If a rug size fails to anchor your layout properly, or color casts conflict with your wallpaper, you can submit a return request. The rug must remain in pristine rolled conditions, wrapped in original water-barrier materials.
              </p>
              <h4 className="font-serif text-[11px] font-bold uppercase tracking-widest text-amber-500 mt-6 block font-bold">2. BESPOKE CUSTOM PIECES RULES</h4>
              <p>
                Because custom looms are tailored to precise patron dimensions, pattern choices, and dye combinations, custom commissions **cannot** be refunded or returned after the loom is strung in Bhadohi. We mitigate this by providing high-definition wool swatch boxes and digital CAD visualizations for your final approval.
              </p>
              <h4 className="font-serif text-[11px] font-bold uppercase tracking-widest text-amber-500 mt-6 block font-bold">3. RETURN DISPATCH FEES</h4>
              <p>
                Within India, our showroom offers complimentary returns pickup. For international territories (e.g. USA), return ocean/air freight and export declarations must be managed by the customer.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4 font-sans text-xs md:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed tracking-wide">
              <h2 className="font-serif text-lg md:text-xl font-bold uppercase tracking-wider text-amber-300 border-b border-neutral-900 pb-2 mb-4">Terms of Business</h2>
              <p>
                Welcome to Premium Rug Collection. By accessing our Thane showroom or browsing our digital registry, you accept these terms of service representing our weavers cooperative.
              </p>
              <h4 className="font-serif text-[11px] font-bold uppercase tracking-widest text-amber-500 mt-6 block font-bold">1. HANDMADE NATURAL DISCLOSURES</h4>
              <p>
                Every handmade carpet contains delicate idiosyncrasies. Variances in yarn texture, surface pile depth, and mild watercolor variations (abrashes) are signatures of human hand carding and natural crock crucible dyeing. These are not flaws; they are indicators of handcraft ancestry.
              </p>
              <h4 className="font-serif text-[11px] font-bold uppercase tracking-widest text-amber-500 mt-6 block font-bold">2. TRANSACTION AGREEMENTS & CURRENCY DEVIATIONS</h4>
              <p>
                Purchases inside India are billed in Indian Rupees (INR) with standard GST logs. USA and outside transactions are converted and processed in US Dollars (USD). No international payment gateways are completed without manual estimate checks compiled by Mohd Sarik.
              </p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4 font-sans text-xs md:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed tracking-wide">
              <h2 className="font-serif text-lg md:text-xl font-bold uppercase tracking-wider text-amber-300 border-b border-neutral-900 pb-2 mb-4">Privacy & Data Protections</h2>
              <p>
                Premium Rug Collection is committed to safeguarding our patrons' private communications. We do not sell, rent, or lease our list of emails or client details to third-party databases.
              </p>
              <h4 className="font-serif text-[11px] font-bold uppercase tracking-widest text-amber-500 mt-6 block font-bold">1. INFORMATION SECURITY AND ENVELOPE DETAILS</h4>
              <p>
                We capture your phone number, email address, physical layout sketches, and zip codes strictly to calculate carrier rates and dispatch swatch collections. All data fields are stored inside highly secure Firestore configurations with direct operational controls.
              </p>
              <h4 className="font-serif text-[11px] font-bold uppercase tracking-widest text-amber-500 mt-6 block font-bold">2. WHATSAPP LOGS</h4>
              <p>
                All communications on WhatsApp are encrypted from end to end using Meta technology. Our Thane curator Mohd Sarik handles direct logs and customer records exclusively.
              </p>
            </div>
          )}

        </div>

        {/* Back link */}
        <button 
          onClick={() => setCurrentPage('home')}
          className="text-xs font-sans tracking-widest uppercase text-amber-500 hover:underline inline-flex items-center gap-1.5"
        >
          <span>Return To Showroom Entrance</span>
          <ArrowRight className="h-4 w-4" />
        </button>

      </div>
    </div>
  );
}
