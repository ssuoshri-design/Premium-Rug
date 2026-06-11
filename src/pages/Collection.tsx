import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Filter, 
  MessageCircle, 
  ChevronRight, 
  Sparkles, 
  Grid3X3,
  SlidersHorizontal,
  X,
  Search
} from 'lucide-react';
import { Product } from '../types';

export default function Collection() {
  const { 
    products, 
    categories, 
    currency, 
    setSelectedProductId, 
    setCurrentPage,
    addToCart
  } = useApp();

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [selectedShape, setSelectedShape] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number>(300000); // 3L cap

  const [searchQuery, setSearchQuery] = useState('');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Lists of available attributes
  const colorOptions = ['all', 'Gold', 'Beige', 'Charcoal', 'Ivory', 'Obsidian', 'Bronze', 'Slate', 'Teal', 'Silver'];
  const shapeOptions = ['all', 'Rectangular', 'Circular', 'Oval', 'Square', 'Runner'];
  const sizeOptions = ['all', '5x8 ft', '6x9 ft', '8x10 ft', '9x12 ft', '10x14 ft', 'Runner'];
  const materialOptions = ['all', 'Wool & Bamboo Silk', 'Mountain Sheep Wool', 'Viscose & Polyester Composite', 'Bamboo Silk', 'Merino Wool'];

  // Clear All Filters
  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedColor('all');
    setSelectedShape('all');
    setSelectedSize('all');
    setSelectedMaterial('all');
    setPriceRange(300000);
    setSearchQuery('');
  };

  // Filter products reactively in-memory
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category Match
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      
      // Color Match
      if (selectedColor !== 'all' && !p.colors.some(c => c.toLowerCase().includes(selectedColor.toLowerCase()))) return false;
      
      // Shape / Name / SKU Keyword Search
      const searchLower = searchQuery.toLowerCase();
      if (searchLower) {
        const matchesName = p.name.toLowerCase().includes(searchLower);
        const matchesSku = p.sku.toLowerCase().includes(searchLower);
        const matchesDesc = p.description.toLowerCase().includes(searchLower);
        if (!matchesName && !matchesSku && !matchesDesc) return false;
      }

      // Material Match
      if (selectedMaterial !== 'all' && !p.material.toLowerCase().includes(selectedMaterial.toLowerCase())) return false;

      // Price Match
      const price = currency === 'INR' ? p.priceINR : p.priceUSD;
      const targetMaxPrice = currency === 'INR' ? priceRange : (priceRange / 80); // USD division approx
      if (price > targetMaxPrice) return false;

      // Sizing Match
      if (selectedSize !== 'all') {
        const matchSizeInArray = p.sizes.some(sz => sz.toLowerCase().includes(selectedSize.toLowerCase()));
        if (!matchSizeInArray) return false;
      }

      // Shape Match (e.g. checks shapes in descriptions/skus)
      if (selectedShape !== 'all') {
        const shapeLower = selectedShape.toLowerCase();
        const matchesInName = p.name.toLowerCase().includes(shapeLower);
        const matchesInDescription = p.description.toLowerCase().includes(shapeLower);
        const matchesInSku = p.sku.toLowerCase().includes(shapeLower);
        if (!matchesInName && !matchesInDescription && !matchesInSku) return false;
      }

      return true;
    });
  }, [products, selectedCategory, selectedColor, selectedShape, selectedSize, selectedMaterial, priceRange, searchQuery, currency]);

  // Open WhatsApp directly with Product contextual data
  const handleProductWhatsAppClick = (p: Product) => {
    const formattedMsg = `Dear Premium Rug Collection Team,\nI am looking at your outstanding product digital catalog and would love to request pricing, loom timelines, and swatch dispatch details for the following:\n\n` + 
                         `• Rug Name: ${p.name}\n` + 
                         `• Product SKU: ${p.sku}\n` + 
                         `• Material Profile: ${p.material}\n` + 
                         `• Size Selected: ${p.sizes[0] || 'Custom Sizing Preferred'}\n\n` + 
                         `Thank you context.`;
    
    const url = `https://wa.me/918356864659?text=${encodeURIComponent(formattedMsg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-warm-ivory text-graphite min-h-screen py-16 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        
        {/* Page Header */}
        <div className="text-center md:text-left border-b border-sand/40 pb-10 mb-12">
          <span className="text-[10px] font-sans font-semibold tracking-[0.3em] uppercase text-muted-gold">The Exhibition Corridor</span>
          <h1 className="text-4xl md:text-5xl font-serif font-light text-zinc-950 tracking-wide mt-1">Noble Rug Catalog</h1>
          <p className="text-sm font-serif text-neutral-500 mt-2 max-w-3xl leading-relaxed italic">
            Filter our premium wool shags, high-lustre bamboo silk carvings, and handcrafted double-knotted masterpieces.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* A. DESKTOP FILTERS COLUMN */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-8 rounded-2xl border border-sand/45 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-sand/30 pb-4">
              <span className="text-xs font-sans font-semibold tracking-wider uppercase flex items-center gap-1.5 text-zinc-900">
                <SlidersHorizontal className="h-4 w-4 text-muted-gold" /> Filter Suite
              </span>
              <button onClick={handleClearFilters} className="text-[10px] font-sans font-bold tracking-wider text-muted-gold hover:text-zinc-950 hover:underline cursor-pointer">RESET ALL</button>
            </div>

            {/* 1. Category selector */}
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-sans font-semibold tracking-wider uppercase text-neutral-400">Classification</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-soft-beige border border-sand/30 rounded-lg p-3 outline-none text-xs font-sans text-zinc-800 focus:border-muted-gold"
              >
                <option value="all">All Classifications</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* 2. Color category */}
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-sans font-semibold tracking-wider uppercase text-neutral-400">Patron Tone</label>
              <select 
                value={selectedColor} 
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full bg-soft-beige border border-sand/30 rounded-lg p-3 outline-none text-xs font-sans text-zinc-800 focus:border-muted-gold"
              >
                {colorOptions.map(col => (
                  <option key={col} value={col}>{col === 'all' ? 'All Colors' : col}</option>
                ))}
              </select>
            </div>

            {/* 3. Materials selector */}
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-sans font-semibold tracking-wider uppercase text-neutral-400">Weft Material</label>
              <select 
                value={selectedMaterial} 
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="w-full bg-soft-beige border border-sand/30 rounded-lg p-3 outline-none text-xs font-sans text-zinc-800 focus:border-muted-gold"
              >
                {materialOptions.map(mat => (
                  <option key={mat} value={mat}>{mat === 'all' ? 'All Materials' : mat}</option>
                ))}
              </select>
            </div>

            {/* 4. Shape category */}
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-sans font-semibold tracking-wider uppercase text-neutral-400">Weaving Shape</label>
              <select 
                value={selectedShape} 
                onChange={(e) => setSelectedShape(e.target.value)}
                className="w-full bg-soft-beige border border-sand/30 rounded-lg p-3 outline-none text-xs font-sans text-zinc-800 focus:border-muted-gold"
              >
                {shapeOptions.map(sh => (
                  <option key={sh} value={sh}>{sh === 'all' ? 'All Shapes' : sh}</option>
                ))}
              </select>
            </div>

            {/* 5. Size Spec */}
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-sans font-semibold tracking-wider uppercase text-neutral-400">Size Spec</label>
              <select 
                value={selectedSize} 
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full bg-soft-beige border border-sand/30 rounded-lg p-3 outline-none text-xs font-sans text-zinc-800 focus:border-muted-gold"
              >
                {sizeOptions.map(sz => (
                  <option key={sz} value={sz}>{sz === 'all' ? 'All Sizes' : sz}</option>
                ))}
              </select>
            </div>

            {/* 6. Price Range Slider */}
            <div className="space-y-3 pt-4 border-t border-sand/20 text-left">
              <div className="flex justify-between items-center text-[10px] font-sans font-semibold tracking-wider uppercase text-neutral-400">
                <span>Maximum Value</span>
                <span className="font-serif text-muted-gold text-xs font-semibold">
                  {currency === 'INR' ? '₹' : '$'} {currency === 'INR' ? priceRange.toLocaleString() : Math.round(priceRange / 80).toLocaleString()}
                </span>
              </div>
              <input 
                type="range" 
                min={20000} 
                max={300000} 
                step={5000}
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-muted-gold h-1 bg-soft-beige rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-neutral-500 font-sans tracking-tight">
                <span>{currency === 'INR' ? '₹20K' : '$250'}</span>
                <span>{currency === 'INR' ? '₹3L+' : '$3,750+'}</span>
              </div>
            </div>

          </aside>

          {/* B. MOBILE FILTERS HEADER BAR */}
          <div className="lg:hidden flex gap-4 w-full justify-between items-center bg-white p-4 rounded-xl border border-sand/30 mb-6 shadow-sm">
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="Search catalog..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-soft-beige text-zinc-950 border border-sand/20 rounded-lg pl-9 pr-3 py-2 text-xs focus:ring-1 focus:ring-muted-gold outline-none font-sans"
              />
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-400" />
            </div>
            <button 
              onClick={() => setShowFiltersMobile(true)}
              className="bg-zinc-950 hover:bg-muted-gold text-white text-[10px] font-sans font-bold tracking-widest uppercase py-2.5 px-4 rounded-full active:scale-95 flex items-center gap-1.5"
            >
              <Filter className="h-3.5 w-3.5" /> Filters
            </button>
          </div>

          {/* Mobile full screen filters modal */}
          {showFiltersMobile && (
            <div className="fixed inset-0 bg-black/55 z-100 flex justify-end backdrop-blur-[2px]">
              <div className="w-full max-w-xs bg-white p-6 flex flex-col h-full overflow-y-auto border-l border-sand/30 text-zinc-950">
                <div className="flex justify-between items-center pb-4 border-b border-sand/30 mb-6">
                  <h3 className="font-serif text-lg font-normal tracking-wide text-zinc-950">Catalog Filters</h3>
                  <button onClick={() => setShowFiltersMobile(false)} className="p-1"><X className="h-5 w-5" /></button>
                </div>

                <div className="space-y-6 flex-1 text-left">
                  <div className="space-y-2">
                    <label className="text-[10px] text-neutral-400 uppercase font-sans font-semibold">Classification</label>
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full bg-soft-beige border border-sand/30 p-3 text-xs rounded-lg text-zinc-850">
                      <option value="all">All Classifications</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-neutral-400 uppercase font-sans font-semibold">Color Palette</label>
                    <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} className="w-full bg-soft-beige border border-sand/30 p-3 text-xs rounded-lg text-zinc-850">
                      {colorOptions.map(col => <option key={col} value={col}>{col === 'all' ? 'All Colors' : col}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-neutral-400 uppercase font-sans font-semibold">Weaving Shape</label>
                    <select value={selectedShape} onChange={(e) => setSelectedShape(e.target.value)} className="w-full bg-soft-beige border border-sand/30 p-3 text-xs rounded-lg text-zinc-850">
                      {shapeOptions.map(sh => <option key={sh} value={sh}>{sh === 'all' ? 'All Shapes' : sh}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-neutral-400 uppercase font-sans font-semibold">Material Blend</label>
                    <select value={selectedMaterial} onChange={(e) => setSelectedMaterial(e.target.value)} className="w-full bg-soft-beige border border-sand/30 p-3 text-xs rounded-lg text-zinc-850">
                      {materialOptions.map(mat => <option key={mat} value={mat}>{mat === 'all' ? 'All Materials' : mat}</option>)}
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-sand/20 flex gap-4 mt-8">
                  <button onClick={handleClearFilters} className="flex-1 text-center py-3 text-xs text-neutral-400 uppercase tracking-widest border border-sand rounded-full">Reset</button>
                  <button onClick={() => setShowFiltersMobile(false)} className="flex-1 text-center py-3 text-xs bg-zinc-950 text-white font-bold uppercase tracking-widest rounded-full shadow">Apply</button>
                </div>
              </div>
            </div>
          )}

          {/* C. PRODUCT CATALOG GRID COLUMN */}
          <div className="lg:col-span-9 space-y-8">
            
            {/* Search Bar (Desktop) */}
            <div className="hidden lg:block relative text-left">
              <input 
                type="text" 
                placeholder="Search collection, product details, SKUs, or materials..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-zinc-950 border border-sand/40 rounded-2xl pl-10 pr-4 py-4 placeholder-neutral-400 text-xs font-sans shadow-sm"
              />
              <Search className="absolute left-4 top-4 h-4 w-4 text-neutral-400" />
            </div>

            {/* Results Counters */}
            <div className="flex justify-between items-center text-xs text-neutral-400 border-b border-sand/30 pb-3 font-sans">
              <span>Showing <strong>{filteredProducts.length}</strong> luxurious masterworks</span>
              {searchQuery && <span>Search key: "{searchQuery}"</span>}
            </div>

            {/* Catalog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredProducts.length === 0 ? (
                <div className="col-span-3 text-center py-24 bg-white border border-dashed border-sand/60 rounded-2xl px-6">
                  <Sparkles className="h-9 w-9 text-neutral-350 mx-auto mb-4" />
                  <p className="font-serif text-[16px] font-medium text-muted-gold">No matching rugs found in our current exhibition.</p>
                  <p className="font-sans text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed mt-2.5">
                    Adjust your premium filters, or coordinate directly with our founder Mohd Sarik for custom woven requests.
                  </p>
                  <button 
                    onClick={handleClearFilters}
                    className="mt-6 border border-muted-gold/50 text-muted-gold hover:bg-soft-beige font-sans text-[10px] tracking-widest uppercase py-3.5 px-8 transition duration-300 rounded-full"
                  >
                    Reset Filter Portfolio
                  </button>
                </div>
              ) : (
                filteredProducts.map((p) => {
                  const price = currency === 'INR' ? p.priceINR : p.priceUSD;
                  const symbol = currency === 'INR' ? '₹' : '$';
                  return (
                    <div 
                      key={p.id} 
                      className="group bg-white border border-sand/30 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl duration-500 flex flex-col justify-between"
                    >
                      <div className="relative overflow-hidden aspect-[4/3] bg-zinc-900 cursor-pointer" onClick={() => { setSelectedProductId(p.id); setCurrentPage('product-details'); }}>
                        <img 
                          src={p.images[0]} 
                          alt={p.name} 
                          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        {p.isFeatured && (
                          <span className="absolute top-3 left-3 bg-zinc-950/85 border border-white/5 text-champagne font-sans text-[8px] uppercase tracking-widest font-bold py-1.5 px-3 rounded-full">
                            Exquisite
                          </span>
                        )}
                        <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-zinc-800 font-sans font-semibold text-[9px] py-1 px-3 rounded-full shadow-sm">
                          {p.category === 'machine-made' ? 'Machine Made' : 'Hand Knotted'}
                        </span>
                      </div>

                      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                        <div className="space-y-2 text-left">
                          <p className="text-[9px] font-sans font-light tracking-widest text-neutral-400 uppercase">SKU: {p.sku}</p>
                          <h3 className="font-serif text-lg font-medium text-zinc-950 group-hover:text-muted-gold transition duration-300 cursor-pointer" onClick={() => { setSelectedProductId(p.id); setCurrentPage('product-details'); }}>
                            {p.name}
                          </h3>
                          <p className="text-xs text-neutral-500 font-serif line-clamp-2 leading-relaxed italic pr-1">
                            {p.description}
                          </p>
                          
                          <div className="pt-2 text-left">
                            <span className="text-[9px] text-neutral-450 uppercase font-sans tracking-wide font-semibold block">Loom Sizes:</span>
                            <span className="text-[11px] text-zinc-800 font-serif italic block mt-0.5 leading-snug">
                              {p.sizes.join(' • ')}
                            </span>
                          </div>
                        </div>

                        <div className="pt-4 mt-6 border-t border-sand/40 flex justify-between items-center">
                          <span className="font-serif text-base font-bold text-muted-gold">
                            {symbol} {price.toLocaleString()}
                          </span>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => { setSelectedProductId(p.id); setCurrentPage('product-details'); }}
                              className="text-[9px] font-sans tracking-widest font-bold uppercase bg-zinc-950 hover:bg-muted-gold text-white hover:text-white py-2.5 px-4 rounded-full transition shadow-sm"
                            >
                              Explore
                            </button>
                            
                            <button 
                              onClick={() => handleProductWhatsAppClick(p)}
                              className="h-9 w-9 rounded-full border border-sand hover:border-muted-gold flex items-center justify-center text-zinc-700 hover:text-muted-gold hover:bg-soft-beige transition-all duration-300"
                              title="WhatsApp Quick Consultation"
                            >
                              <MessageCircle className="h-4.5 w-4.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
