import { Product, Category, WebsiteSetting, CustomerReview } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: "hand-tufted",
    name: "Hand Tufted Rugs",
    description: "Intricately hand-tufted carpets woven with 100% New Zealand blend wool, translating the 500-year legacy of Bhadohi weavers into timeless, modern statement decor.",
    image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "machine-made",
    name: "Machine Made Rugs",
    description: "Precision-engineered carpets combining extreme node density, durable modern composites, and exquisite Turkish-inspired classic designs for busy high-luxury galleries.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "modern",
    name: "Modern Rugs",
    description: "Sleek textures and avant-garde designs featuring gradient dye-pools and elegant negative space.",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "contemporary",
    name: "Contemporary Rugs",
    description: "Fluid lines, abstract expressionist layouts, and bold luxury colors tailored for designer flats.",
    image: "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "geometric",
    name: "Geometric Rugs",
    description: "Perfect grid symmetries, sharp chevron patterns, and intersecting brass-colored colorblocks.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800"
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prc-001",
    name: "Aurelia Gold Silk Weave",
    sku: "PRC-HFT-AUR01",
    category: "hand-tufted",
    description: "The crown jewel of our boutique collection. Woven manually over 120 days by fourth-generation weavers in Bhadohi, India, using fine, high-lustre bamboo silk and worsted New Zealand wool. Featuring raised high-low gold silk carvings against an ivory-beige wool canvas, it reflects ambient light with breathtaking shimmer.",
    features: [
      "Individually hand-carved high-low pile depth (12mm to 14mm)",
      "Premium organic dye blend of ochre, gold leaf, and soft beige",
      "Finished with a heavy-duty luxury latex backing and organic cotton lining",
      "Extremely dense pile counting over 90,000 tufts per square meter"
    ],
    material: "80% New Zealand Wool, 20% Bamboo Silk",
    sizes: ["6x9 ft (180x270 cm)", "8x10 ft (240x300 cm)", "9x12 ft (270x360 cm)", "Custom Size"],
    colors: ["Gold & Ivory", "Gold & Charcoal", "Bronze & Beige"],
    priceINR: 145000,
    priceUSD: 1850,
    images: [
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800"
    ],
    stockStatus: "in_stock",
    shippingInfo: "Complimentary air shipping across India and USA. Secure custom crates included.",
    seoTitle: "Aurelia Gold Silk Weave Rug - Premium Hand Tufted Rugs",
    seoDescription: "Patronize Mohd Sarik's signature gold silk and wool luxury rug, handcrafted in Bhadohi. Buy online or inquire on WhatsApp from Thane, India.",
    rating: 5,
    isFeatured: true,
    createdAt: "2026-06-01T12:00:00Z"
  },
  {
    id: "prc-002",
    name: "Emperor's Obsidian Mandala",
    sku: "PRC-MCD-EMP02",
    category: "machine-made",
    description: "A monumental masterwork of engineering, featuring over 1.2 million knots per square meter. Styled in deep charcoal obsidian black and accented with antique brass gold, this carpet delivers the absolute grandeur of vintage Persian royalty with modern wear resilience.",
    features: [
      "Unparalleled ultra-dense weave with fine micro-pile (8mm)",
      "Highly resilient Turkish composite loop structure",
      "Stain-resistant and hypoallergenic luxury fibers",
      "Beautifully finished with hand-tied luxury silk fringes"
    ],
    material: "60% Premium Viscose, 40% High-Density Polyester",
    sizes: ["5x8 ft (150x240 cm)", "6x9 ft (180x270 cm)", "8x10 ft (240x300 cm)", "Circular 8ft (240 cm)"],
    colors: ["Obsidian Black & Gold", "Midnight Blue & Bronze", "Alabaster & Champagne"],
    priceINR: 88000,
    priceUSD: 1100,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=800"
    ],
    stockStatus: "in_stock",
    shippingInfo: "Pre-treated with luxury dust guards. Ships globally within 7-10 business days.",
    seoTitle: "Emperor's Obsidian Black & Gold Carpet | Premium Rug Collection",
    seoDescription: "Exquisite high-density vintage style carpet featuring luxurious charcoal and brass tone arrays. Shop worldwide shipping.",
    rating: 4.9,
    isFeatured: true,
    createdAt: "2026-06-02T10:30:00Z"
  },
  {
    id: "prc-003",
    name: "Nebula Abstract Colorwash",
    sku: "PRC-MOD-NEB03",
    category: "modern",
    description: "An expressive canvas for your floor. Inspired by shifting cosmic gases, the Nebula rug merges shades of rich slate charcoal, shimmering champagne beige, and ocean teal in fluid, non-repetitive strokes. Hand-carved details define the separation between deep colored valleys.",
    features: [
      "Dynamic watercolor gradient dye technology",
      "Eco-friendly organic linen and New Zealand wool blends",
      "Plush 15mm pile height offering cloud-like stepping comfort",
      "Individually hand-loomed with seamless edge binding"
    ],
    material: "70% Wool, 30% Bamboo Viscose",
    sizes: ["6x9 ft", "8x10 ft", "10x14 ft", "Custom Shape"],
    colors: ["Champagne Slate", "Ivory Ocean", "Desert Amber"],
    priceINR: 120000,
    priceUSD: 1500,
    images: [
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800"
    ],
    stockStatus: "in_stock",
    shippingInfo: "Ships rolled in extra-padded double layered moisture-lock heavy-duty protective cases.",
    seoTitle: "Nebula Abstract Designer Rug | Premium Rug Collection Thane",
    seoDescription: "Modern abstract fluid design custom rug. Perfectly aligned with premium architectural home designs in Mumbai, NY and LA.",
    rating: 5,
    isFeatured: true,
    createdAt: "2026-06-03T11:45:00Z"
  },
  {
    id: "prc-004",
    name: "Marrakesh Vintage Shag",
    sku: "PRC-HFT-MAR04",
    category: "hand-tufted",
    description: "A plush reinterpret of ancestral Moroccan tribal art. This rug combines thick, un-dyed pure sheep wool loops with charcoal-dyed linear intersections, bringing warm boho intimacy and supreme tactile grounding to premium modern living rooms.",
    features: [
      "Authentic thick wool shag finish (28mm pile height)",
      "Woven completely with chemical-free, natural sheep wool",
      "Thermoregulatory fibers ideal for all season comfort",
      "Excellent dampening and acoustic soundproofing qualities"
    ],
    material: "100% Pure Virgin Mountain Wool",
    sizes: ["5x8 ft", "6x9 ft", "8x10 ft", "9x12 ft"],
    colors: ["Ivory Cream & Charcoal", "Beige & Terracotta"],
    priceINR: 95000,
    priceUSD: 1200,
    images: [
      "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800"
    ],
    stockStatus: "low_stock",
    shippingInfo: "Includes premium rug pad to maximize underfoot rebound and zero slipping.",
    seoTitle: "Marrakesh Moroccan Wool Shag Rugs - Premium Rug Collection",
    seoDescription: "Plush pure virgin wool tribal linear shag rug. Handcrafted premium carpet ideal for Nordic and modern retro decors.",
    rating: 4.8,
    isFeatured: false,
    createdAt: "2026-06-04T09:12:00Z"
  },
  {
    id: "prc-005",
    name: "Prism Geometric Grid",
    sku: "PRC-GEO-PRM05",
    category: "geometric",
    description: "Our high-precision geometric marvel. The Prism Rug is a visual rhythm of interlocking rectangular elements and thin gold leaf borders. Woven using highly contrasted fibers, it creates a striking mid-century masterwork in sleek office lobbies and minimal modern dining halls.",
    features: [
      "Precision cut geometric intersections with 1mm sharp contour borders",
      "Premium low pile for optimal durability under heavy chairs",
      "Subtle silver and gold lurex strands woven for metallic pop",
      "Reinforced heavy cotton canvas base for lay-flat assurance"
    ],
    material: "75% Merino Wool, 25% Metallic Bamboo Thread",
    sizes: ["6x9 ft", "8x10 ft", "10x10 ft Square", "Runner 3x10 ft"],
    colors: ["Sleek Charcoal & Gold", "Ivory & Warm Brass", "Cool Navy & Copper"],
    priceINR: 110000,
    priceUSD: 1400,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800"
    ],
    stockStatus: "in_stock",
    shippingInfo: "Packed with dust resistant wraps. Fast shipping worldwide.",
    seoTitle: "Prism Geometric Grid Hand Tufted Rug | Luxury Carpets India",
    seoDescription: "A high-precision geometric gold leaf lined carpet. Tailored for corporate office grids and contemporary metropolitan dining suites.",
    rating: 4.9,
    isFeatured: false,
    createdAt: "2026-06-05T14:40:00Z"
  }
];

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: "rev-001",
    name: "Architect Rajesh Kumar",
    rating: 5,
    comment: "I commissioned Mohd Sarik for a custom 12x15ft rug for a luxury duplex penthouse in Worli, Mumbai. The execution matches international boutique showrooms. The pure Bhadohi wool is incredibly dense, and the gold details are stunning.",
    location: "Mumbai, India",
    verified: true,
    createdAt: "2026-06-09T10:00:00Z",
    status: "approved"
  },
  {
    id: "rev-002",
    name: "Genevieve Vance",
    rating: 5,
    comment: "Shipping to the United States was seamless. The rug was crated inside plywood sheets, ensuring it arrived in perfect condition. The Aurelia high-low texture is a piece of art in our dining room.",
    location: "New York, USA",
    verified: true,
    createdAt: "2026-06-08T15:30:00Z",
    status: "approved"
  },
  {
    id: "rev-003",
    name: "Nikhil & Tanya Roy",
    rating: 5,
    comment: "Incredibly helpful customer support over WhatsApp! They sent photos of the rug on the loom in Bhadohi while it was being woven. Connecting with our historic artisan heritage makes this rug so special.",
    location: "Thane, India",
    verified: true,
    createdAt: "2026-06-07T08:00:00Z",
    status: "approved"
  }
];

export const SHOWCASE_PROJECTS = [
  {
    title: "Worli Penthouse Living Room",
    category: "Living Room Installations",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
    description: "A colossal bespoke Aurelia Silk rug anchoring a gold-accented Italian sofa set."
  },
  {
    title: "The Taj President Suite",
    category: "Hotel Projects",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800",
    description: "Intricate high-density medallion custom carpets layout for state dignitary suites."
  },
  {
    title: "Alibaug Luxury Villa",
    category: "Villa Projects",
    image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=800",
    description: "Plush wool shags merging sand dunes tones with high-ceiling marble halls."
  },
  {
    title: "HDFC Executive Boardroom",
    category: "Office Projects",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    description: "Soundproofing geometric dark slate grid runs engineered with extreme resilience."
  },
  {
    title: "Bandra Designer Flat Duplex",
    category: "Luxury Interior Projects",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800",
    description: "Abstract colorwash rug tying brass ornaments and custom leather chairs together."
  }
];

export const FAQS = [
  {
    question: "What makes Premium Rug Collection unique?",
    answer: "Unlike mass-market standard rug outlets, our founder Mohd Sarik directly bridges high-end designer aesthetics in Mumbai/Thane with our family weaving cooperative in Bhadohi, Uttar Pradesh—India's legendary 'Carpet City' backed by over 500 years of royal Persian rug weaving heritage. We utilize only 100% genuine New Zealand blended wool and high-lustre organic bamboo silk."
  },
  {
    question: "Can I commission a completely custom-sized and designed rug?",
    answer: "Absolutely. We are pioneers in custom commissions. Through our Custom Rug Design page, you can request custom shapes (circular, oval, runners, freeform), custom colorways matching your paint swatches, and custom dimensions. We provide digital cad renderings followed by physical mini yarn loop swatches for approval before we begin weaving."
  },
  {
    question: "Do you ship to the United States and how is it packaged?",
    answer: "Yes, we ship globally with a specialization in India and the United States. All international shipments are pre-treated with protective dust-shields, wrapped in multiple layers of moisture-lock casing, and secured inside specialized heavy-duty wooden crates to guarantee perfect safety."
  },
  {
    question: "How long does a hand-tufted versus hand-knotted custom rug take?",
    answer: "An average hand-tufted rug takes approximately 6 to 10 weeks depending on size and carving detail. Complete hand-knotted carpets require extreme knot densities and can take anywhere from 4 to 8 months to complete. We send real-time loom photo updates directly on WhatsApp to keep patrons integrated into their rug's craft journey."
  },
  {
    question: "Are your rugs suitable for rooms with high floor heating or pets?",
    answer: "Yes. Our hand-tufted wool rugs are made using durable organic latex, which handles underfloor heating excellently. Natural virgin sheep wool contains organic protective lanolin oils, making our carpets naturally stain-resistant, highly cleanable, and soft for luxury households with pets."
  }
];

export const GLOBAL_SETTING_DEFAULT: WebsiteSetting = {
  id: "default_config",
  pricePerSqFt: 700,
  businessName: "Premium Rug Collection",
  founder: "Mohd Sarik",
  location: "Thane, Maharashtra, India",
  phone: "+91 83568 64659",
  whatsapp: "+91 83568 64659",
  contactEmail: "inquiry@premiumrugcollection.com",
  instagramUrl: "https://instagram.com/premiumrugcollection",
  facebookUrl: "https://facebook.com/premiumrugcollection",
  pinterestUrl: "https://pinterest.com/premiumrugcollection",
  youtubeUrl: "https://youtube.com/premiumrugcollection",
  linkedinUrl: "https://linkedin.com/company/premiumrugcollection",
  shippingPolicy: "We offer complimentary express air shipping across India and continental USA. Standard orders are packed and dispatched in 2-3 business days. Custom orders involve high-precision handcrafted weaving times, ranging from 6 to 12 weeks. Detailed logistics and tracking numbers are shared on WhatsApp.",
  refundPolicy: "Due to the rare, handcrafted nature of our designs, items in our signature collection can be exchanged for gallery credits within 7 days of delivery, provided they are in pristine, unused condition. Custom orders, bespoke dimensions, and specialized color looms are final sales and cannot be modified or refunded once weaving commences.",
  privacyPolicy: "At Premium Rug Collection, we respect the absolute privacy of our elite patrons. Any collection of personal information (e.g. name, phone, email, project layouts/dimensions) shared via our contact sheets, custom rug requests, or newsletter registrations are encrypted and secured. We never resell or distribute patron coordinates.",
  termsConditions: "By accessing this premium gallery, you agree to patronize our authentic Bhadohi legacy designs. Prices are automatically estimated in INR (₹) for Indian traffic and USD ($) for international traffic based on standard trading values. All custom orders require a 50% weaving deposit to authorize raw material looms, with the remaining balance due upon completion before wooden box crating and air carriage.",
  seoTitle: "Premium Rug Collection | Hand Handcrafted Luxury Rugs Bhadohi",
  seoDescription: "Exquisite hand-tufted rugs and custom luxury carpets inspired by Bhadohi's 500-year heritage. Curated by Mohd Sarik, Thane, India. Global shipping.",
  homepageImages: {
    heroBg: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=2000",
    bento1: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=1200",
    bento2: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800",
    bento3: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800",
    bento4: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800",
    heritage1: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200",
    heritage2: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=700",
    gallery1: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=700",
    gallery2: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=700",
    gallery3: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=700",
    gallery4: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=700",
    gallery5: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=700",
    gallery6: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=700",
    consultation: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=900"
  }
};
