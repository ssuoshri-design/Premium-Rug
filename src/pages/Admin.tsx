import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ImageUpload from '../components/ImageUpload';
import Logo from '../components/Logo';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  Layers, 
  MessageSquare, 
  Compass, 
  Star, 
  Mail, 
  Settings, 
  Trash2,
  Edit,
  PlusCircle,
  CheckCircle,
  XCircle,
  Lock,
  LogOut,
  FolderOpen,
  ShoppingBag,
  Grid,
  FileText,
  Percent,
  TrendingUp,
  Globe,
  Share2,
  Info,
  Sliders,
  CheckSquare,
  AlertCircle
} from 'lucide-react';
import { Product, ShowcaseProject, Order, CustomerReview } from '../types';

type AdminTab = 'analytics' | 'products' | 'orders' | 'leads' | 'bespoke' | 'showcase' | 'reviews' | 'subscribers' | 'settings';

export default function Admin() {
  const { 
    currentUser, 
    isAdminUser, 
    loginAdminUser, 
    logoutAdmin,
    products, 
    categories, 
    inquiries, 
    customRugRequests, 
    reviews, 
    newsletterSubscribers,
    updateInquiryStatus,
    updateCustomRugStatus,
    approveClientReview,
    deleteClientReview,
    createOrUpdateProduct,
    deleteProductById,
    isDbSeeded,
    seedDatabase,

    // Live collections & setters
    orders,
    updateOrderStatus,
    settings,
    updateGlobalSettings,
    showcaseProjects,
    addShowcaseProject,
    editShowcaseProject,
    deleteShowcaseProject
  } = useApp();

  const [activeTab, setActiveTab] = useState<AdminTab>('analytics');

  // Sign-in parameters
  const [email, setEmail] = useState('ssuoshri@gmail.com');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [signingIn, setSigningIn] = useState(false);

  // Product Form state
  const [adminProductViewMode, setAdminProductViewMode] = useState<'containers' | 'table'>('containers');
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [tempName, setTempName] = useState('');
  const [tempDescription, setTempDescription] = useState('');
  const [tempImgUrl, setTempImgUrl] = useState('');
  const [tempSavingId, setTempSavingId] = useState<string | null>(null);

  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [formName, setFormName] = useState('');
  const [formSku, setFormSku] = useState('');
  const [formCategory, setFormCategory] = useState('hand-tufted');
  const [formMaterial, setFormMaterial] = useState('');
  const [formPriceINR, setFormPriceINR] = useState(0);
  const [formPriceUSD, setFormPriceUSD] = useState(0);
  const [formImgUrl, setFormImgUrl] = useState('');
  const [formSizes, setFormSizes] = useState('');
  const [formColors, setFormColors] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formFeatures, setFormFeatures] = useState('');
  const [formStockStatus, setFormStockStatus] = useState<'in_stock' | 'low_stock' | 'out_of_stock'>('in_stock');
  const [formIsFeatured, setFormIsFeatured] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Showcase Portfolio Form State
  const [editingShowcase, setEditingShowcase] = useState<Partial<ShowcaseProject> | null>(null);
  const [showShowcaseForm, setShowShowcaseForm] = useState(false);
  const [showcaseTitle, setShowcaseTitle] = useState('');
  const [showcaseCategory, setShowcaseCategory] = useState('Living Room Installations');
  const [showcaseImage, setShowcaseImage] = useState('');
  const [showcaseDescription, setShowcaseDescription] = useState('');
  const [showcaseSubmitting, setShowcaseSubmitting] = useState(false);

  // Order Details Panel / Modal
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderTrackingNum, setOrderTrackingNum] = useState('');
  const [orderUpdatingStatus, setOrderUpdatingStatus] = useState(false);

  // Global Settings Form state
  const [settingsForm, setSettingsForm] = useState({
    businessName: '',
    founder: '',
    location: '',
    phone: '',
    whatsapp: '',
    contactEmail: '',
    instagramUrl: '',
    facebookUrl: '',
    pinterestUrl: '',
    youtubeUrl: '',
    linkedinUrl: '',
    shippingPolicy: '',
    refundPolicy: '',
    privacyPolicy: '',
    termsConditions: '',
    seoTitle: '',
    seoDescription: ''
  });
  const [settingsFormLoaded, setSettingsFormLoaded] = useState(false);
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [settingsStatusMsg, setSettingsStatusMsg] = useState('');

  // Dynamically populate settings form once settings are resolved
  if (settings && !settingsFormLoaded) {
    setSettingsForm({
      businessName: settings.businessName || 'Premium Rug Collection',
      founder: settings.founder || 'Mohd Sarik',
      location: settings.location || 'Thane, Maharashtra, India',
      phone: settings.phone || '+91 83568 64659',
      whatsapp: settings.whatsapp || '+91 83568 64659',
      contactEmail: settings.contactEmail || 'inquiry@premiumrugcollection.com',
      instagramUrl: settings.instagramUrl || '',
      facebookUrl: settings.facebookUrl || '',
      pinterestUrl: settings.pinterestUrl || '',
      youtubeUrl: settings.youtubeUrl || '',
      linkedinUrl: settings.linkedinUrl || '',
      shippingPolicy: settings.shippingPolicy || '',
      refundPolicy: settings.refundPolicy || '',
      privacyPolicy: settings.privacyPolicy || '',
      termsConditions: settings.termsConditions || '',
      seoTitle: settings.seoTitle || '',
      seoDescription: settings.seoDescription || ''
    });
    setSettingsFormLoaded(true);
  }

  // Handle Admin Auth Submission
  const handleAdminSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setSigningIn(true);
    try {
      const success = await loginAdminUser(email, password);
      if (!success) {
        setLoginError('Authentication denied. Please check credentials or contact system engineer.');
      }
    } catch (err: any) {
      setLoginError(err.message || 'Authentication error.');
    } finally {
      setSigningIn(false);
    }
  };

  // Populate product form for creation or editing
  const handleOpenProductForm = (p: Product | null) => {
    if (p) {
      setEditingProduct(p);
      setFormName(p.name);
      setFormSku(p.sku);
      setFormCategory(p.category);
      setFormMaterial(p.material);
      setFormPriceINR(p.priceINR);
      setFormPriceUSD(p.priceUSD);
      setFormImgUrl(p.images[0] || '');
      setFormSizes(p.sizes.join(', '));
      setFormColors(p.colors.join(', '));
      setFormStockStatus(p.stockStatus || 'in_stock');
      setFormDescription(p.description);
      setFormFeatures(p.features.join('\n'));
      setFormIsFeatured(p.isFeatured);
    } else {
      setEditingProduct(null);
      setFormName('');
      setFormSku(`PRC-HT-${Date.now().toString().slice(-4)}`);
      setFormCategory('hand-tufted');
      setFormMaterial('80% New Zealand Wool, 20% Bamboo Silk');
      setFormPriceINR(145000);
      setFormPriceUSD(1850);
      setFormImgUrl('');
      setFormSizes('6x9 ft (180x270 cm), 8x10 ft (240x300 cm), 9x12 ft (270x360 cm)');
      setFormColors('Gold, Ivory, Beige, Bronze');
      setFormStockStatus('in_stock');
      setFormDescription('Woven manually using custom raised pile heights against an exquisite wool canvas.');
      setFormFeatures('Individually hand-carved raised pile depths\nWoven on legacy family looms in Bhadohi\nPremium heavy cotton canvas backing linings');
      setFormIsFeatured(false);
    }
    setShowProductForm(true);
  };

  // Handle saving product
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formImgUrl) {
      alert("Please upload a high-resolution product image asset.");
      return;
    }
    setFormSubmitting(true);

    const readyProduct: any = {
      name: formName,
      sku: formSku,
      category: formCategory,
      material: formMaterial,
      priceINR: formPriceINR,
      priceUSD: formPriceUSD,
      images: [formImgUrl], // Real Base64 list
      sizes: formSizes.split(',').map(s => s.trim()).filter(Boolean),
      colors: formColors.split(',').map(c => c.trim()).filter(Boolean),
      stockStatus: formStockStatus,
      features: formFeatures.split('\n').map(f => f.trim()).filter(Boolean),
      isFeatured: formIsFeatured,
      rating: (editingProduct as any)?.rating || 4.9,
      description: formDescription,
      shippingInfo: "Pre-treated with organic protectors. Shipped via premium air crates.",
      seoTitle: `${formName} Handcrafted Rug | Premium Rug Collection`,
      seoDescription: `${formDescription.slice(0, 150)}... Handcrafted premium category rug.`
    };

    if (editingProduct && editingProduct.id) {
      readyProduct.id = editingProduct.id;
    }

    try {
      await createOrUpdateProduct(readyProduct);
      setShowProductForm(false);
    } catch (err) {
      console.error(err);
      alert("Failed to commit product design forge package.");
    } finally {
      setFormSubmitting(false);
    }
  };

  // Save localized container-card edits in real-time
  const handleSaveInlineProduct = async (prodId: string) => {
    if (!tempImgUrl) {
      alert("Please upload or specify a valid photo path.");
      return;
    }
    if (!tempName.trim()) {
      alert("Product title cannot be empty.");
      return;
    }
    setTempSavingId(prodId);
    try {
      await createOrUpdateProduct({
        id: prodId,
        name: tempName.trim(),
        description: tempDescription.trim(),
        images: [tempImgUrl]
      });
      setEditingCardId(null);
    } catch (err) {
      console.error(err);
      alert("Failed to commit inline changes to registry.");
    } finally {
      setTempSavingId(null);
    }
  };

  // Populate showcase project form for creation or editing
  const handleOpenShowcaseForm = (s: ShowcaseProject | null) => {
    if (s) {
      setEditingShowcase(s);
      setShowcaseTitle(s.title);
      setShowcaseCategory(s.category);
      setShowcaseImage(s.image);
      setShowcaseDescription(s.description || '');
    } else {
      setEditingShowcase(null);
      setShowcaseTitle('');
      setShowcaseCategory('Living Room Installations');
      setShowcaseImage('');
      setShowcaseDescription('');
    }
    setShowShowcaseForm(true);
  };

  // Handle saving showcase project
  const handleShowcaseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showcaseImage) {
      alert("Please upload an installation photography roll.");
      return;
    }
    setShowcaseSubmitting(true);

    try {
      if (editingShowcase && editingShowcase.id) {
        await editShowcaseProject(editingShowcase.id, {
          title: showcaseTitle,
          category: showcaseCategory,
          image: showcaseImage,
          description: showcaseDescription
        });
      } else {
        await addShowcaseProject({
          title: showcaseTitle,
          category: showcaseCategory,
          image: showcaseImage,
          description: showcaseDescription
        });
      }
      setShowShowcaseForm(false);
    } catch (err) {
      console.error(err);
      alert("Failed to curate showcase photography.");
    } finally {
      setShowcaseSubmitting(false);
    }
  };

  // Handle saving global brand settings
  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaving(true);
    setSettingsStatusMsg('');
    try {
      await updateGlobalSettings(settingsForm);
      setSettingsStatusMsg('Atelier Enterprise guidelines and SEO policies written to database!');
      setTimeout(() => setSettingsStatusMsg(''), 5000);
    } catch (err) {
      console.error(err);
      setSettingsStatusMsg('Error committing corporate policy assets.');
    } finally {
      setSettingsSaving(false);
    }
  };

  // Handle updating order status
  const handleUpdateOrderStatus = async (orderId: string, nextStatus: Order['orderStatus']) => {
    setOrderUpdatingStatus(true);
    try {
      await updateOrderStatus(orderId, nextStatus, orderTrackingNum || undefined);
      // Synchronize modal state if open
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(prev => prev ? { ...prev, orderStatus: nextStatus, trackingNumber: orderTrackingNum || prev.trackingNumber } : null);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to advance order state.");
    } finally {
      setOrderUpdatingStatus(false);
    }
  };

  // Compute stats helper
  const totalInvoicedValue = orders
    .filter(o => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.totalPrice, 0);

  // A. UNAUTHORIZED SHIELD ENTRY
  if (!currentUser || !isAdminUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-zinc-950 px-4 py-16 font-sans relative overflow-hidden transition-colors duration-500">
        {/* Spotlights to simulate ambient studio lighting on a luxury carpet */}
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-amber-600/5 blur-[150px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm space-y-6 relative z-10"
        >
          {/* Main Logo & Title brand header */}
          <div className="text-center space-y-4 flex flex-col items-center">
            <motion.div 
              initial={{ scale: 0.7, rotate: -15, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="mb-1"
            >
              {/* Custom Branded Logo */}
              <Logo className="h-20 w-20" showText={false} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="space-y-1 text-center"
            >
              <span className="text-[10px] tracking-[0.25em] font-sans font-bold uppercase text-muted-gold block">
                Manager Access
              </span>
              <h1 className="text-2xl font-serif font-light tracking-wide text-zinc-900 dark:text-champagne">
                Welcome Back
              </h1>
              <p className="text-xs text-neutral-550 dark:text-neutral-400 max-w-xs mx-auto leading-relaxed">
                Please enter your administrative passcode to manage the showroom.
              </p>
            </motion.div>
          </div>

          {/* Login Credentials Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl p-6 rounded-2xl border border-sand dark:border-neutral-850 shadow-2xl space-y-5"
          >
            {loginError && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2.5 text-red-650 dark:text-red-400 text-xs leading-relaxed"
              >
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </motion.div>
            )}

            <form onSubmit={handleAdminSignIn} className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-1.5 text-left"
              >
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-sans font-bold tracking-wider text-neutral-500 dark:text-neutral-400 uppercase">
                    Passcode
                  </label>
                  <span className="text-[9px] text-amber-500 font-bold tracking-wider uppercase font-sans">Hint: admin@2026</span>
                </div>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••"
                  required
                  className="w-full bg-stone-50 dark:bg-neutral-950 text-neutral-800 dark:text-stone-100 border border-sand dark:border-neutral-800 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-muted-gold dark:focus:border-champagne transition duration-300"
                />
                <p className="text-[9px] text-amber-500/90 dark:text-amber-400/90 leading-normal italic font-sans font-light leading-snug">
                  * Passcode login successfully writes and syncs your edits and photo uploads directly to Firestore.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="pt-1"
              >
                <motion.button 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  disabled={signingIn}
                  className="w-full bg-zinc-950 hover:bg-black text-white font-sans text-xs sm:text-sm font-bold tracking-widest uppercase py-3.5 rounded-xl shadow transition duration-300 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Lock className="h-4 w-4" />
                  <span>{signingIn ? 'Validating...' : 'Administrative Login'}</span>
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.8 }}
            className="text-center text-[10px] text-neutral-500/80 tracking-widest uppercase"
          >
            © Premium Rug Collection
          </motion.p>
        </motion.div>
      </div>
    );
  }

  // B. AUTHORIZED ADVISOR CONSOLE
  return (
    <div className="bg-stone-50 dark:bg-zinc-950 text-neutral-800 dark:text-stone-200 min-h-screen py-10 transition-colors duration-350">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* TOP STATUS RIBBON */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/70 dark:bg-neutral-900/60 border border-neutral-200/55 dark:border-neutral-900/90 rounded-2xl p-6 shadow-sm text-left">
          <div className="space-y-1">
            <span className="text-[9px] font-sans font-extrabold tracking-[0.3em] uppercase text-amber-500">WEAVERS COOPERATIVE PLATFORM MONITOR</span>
            <h1 className="text-2xl font-serif font-light tracking-tight text-neutral-900 dark:text-stone-100">Atelier Suite Board</h1>
            <p className="text-[11px] font-sans text-neutral-400 leading-normal">
              Supervisor Coord: <span className="text-amber-500 font-medium">{currentUser?.email}</span> • Sync State:{' '}
              <span className="text-emerald-400 font-bold text-[10px] font-mono">● Live Cloud Sync Mode</span>
            </p>
          </div>
          <button 
            onClick={logoutAdmin}
            className="bg-neutral-900/80 hover:bg-red-955 text-red-400 hover:text-white border border-red-500/10 hover:border-red-500/30 font-sans text-[10px] font-bold tracking-widest uppercase py-2 px-4 rounded-xl shadow flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign Out Curation
          </button>
        </div>

        {/* BENTO SIDEBAR + CONTENT WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* SIDEBAR NAVIGATION PANEL */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-neutral-500 block px-3">Management Directories</span>
            <div className="bg-white/70 dark:bg-neutral-900/40 border border-neutral-200/60 dark:border-neutral-900/90 rounded-2xl p-3 shadow-md space-y-1 lg:space-y-1.5">
              
              <button 
                onClick={() => { setActiveTab('analytics'); setShowProductForm(false); }}
                className={`w-full py-3 px-4 rounded-xl font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-between transition cursor-pointer ${
                  activeTab === 'analytics' ? 'bg-amber-400 text-neutral-950 font-extrabold shadow-sm' : 'text-neutral-400 hover:bg-neutral-900/5 dark:hover:bg-neutral-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" /> 
                  <span>Live Metrics</span>
                </div>
                <span className="text-[10px] font-mono opacity-60">Sync</span>
              </button>

              <button 
                onClick={() => { setActiveTab('products'); }}
                className={`w-full py-3 px-4 rounded-xl font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-between transition cursor-pointer ${
                  activeTab === 'products' ? 'bg-amber-400 text-neutral-950 font-extrabold shadow-sm' : 'text-neutral-400 hover:bg-neutral-900/5 dark:hover:bg-neutral-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4" /> 
                  <span>Products Forge</span>
                </div>
                <span className="text-[10px] font-mono bg-neutral-900/10 dark:bg-neutral-950/80 border border-neutral-200/10 px-2 py-0.5 rounded text-neutral-400 font-bold">{products.length}</span>
              </button>

              <button 
                onClick={() => { setActiveTab('orders'); }}
                className={`w-full py-3 px-4 rounded-xl font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-between transition cursor-pointer ${
                  activeTab === 'orders' ? 'bg-amber-400 text-neutral-950 font-extrabold shadow-sm' : 'text-neutral-400 hover:bg-neutral-900/5 dark:hover:bg-neutral-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" /> 
                  <span>Orders & Quotes</span>
                </div>
                <span className="text-[10px] font-mono bg-neutral-900/10 dark:bg-neutral-950/80 border border-neutral-200/10 px-2 py-0.5 rounded text-neutral-400 font-bold">{orders.length}</span>
              </button>

              <button 
                onClick={() => { setActiveTab('showcase'); }}
                className={`w-full py-3 px-4 rounded-xl font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-between transition cursor-pointer ${
                  activeTab === 'showcase' ? 'bg-amber-400 text-neutral-950 font-extrabold shadow-sm' : 'text-neutral-400 hover:bg-neutral-900/5 dark:hover:bg-neutral-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Grid className="h-4 w-4" /> 
                  <span>Showcase Gallery</span>
                </div>
                <span className="text-[10px] font-mono bg-neutral-900/10 dark:bg-neutral-950/80 border border-neutral-200/10 px-2 py-0.5 rounded text-neutral-400 font-bold">{showcaseProjects.length}</span>
              </button>

              <button 
                onClick={() => { setActiveTab('leads'); setShowProductForm(false); }}
                className={`w-full py-3 px-4 rounded-xl font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-between transition cursor-pointer ${
                  activeTab === 'leads' ? 'bg-amber-400 text-neutral-950 font-extrabold shadow-sm' : 'text-neutral-400 hover:bg-neutral-900/5 dark:hover:bg-neutral-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" /> 
                  <span>Client Leads</span>
                </div>
                <span className="text-[10px] font-mono bg-neutral-900/10 dark:bg-neutral-950/80 border border-neutral-200/10 px-2 py-0.5 rounded text-neutral-400 font-bold">{inquiries.length}</span>
              </button>

              <button 
                onClick={() => { setActiveTab('bespoke'); setShowProductForm(false); }}
                className={`w-full py-3 px-4 rounded-xl font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-between transition cursor-pointer ${
                  activeTab === 'bespoke' ? 'bg-amber-400 text-neutral-950 font-extrabold shadow-sm' : 'text-neutral-400 hover:bg-neutral-900/5 dark:hover:bg-neutral-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Compass className="h-4 w-4" /> 
                  <span>Bespoke Looms</span>
                </div>
                <span className="text-[10px] font-mono bg-neutral-900/10 dark:bg-neutral-950/80 border border-neutral-200/10 px-2 py-0.5 rounded text-neutral-400 font-bold">{customRugRequests.length}</span>
              </button>

              <button 
                onClick={() => { setActiveTab('reviews'); setShowProductForm(false); }}
                className={`w-full py-3 px-4 rounded-xl font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-between transition cursor-pointer ${
                  activeTab === 'reviews' ? 'bg-amber-400 text-neutral-950 font-extrabold shadow-sm' : 'text-neutral-400 hover:bg-neutral-900/5 dark:hover:bg-neutral-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" /> 
                  <span>Moderation</span>
                </div>
                <span className="text-[10px] font-mono bg-neutral-900/10 dark:bg-neutral-950/80 border border-neutral-200/10 px-2 py-0.5 rounded text-neutral-400 font-bold">{reviews.length}</span>
              </button>

              <button 
                onClick={() => { setActiveTab('subscribers'); setShowProductForm(false); }}
                className={`w-full py-3 px-4 rounded-xl font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-between transition cursor-pointer ${
                  activeTab === 'subscribers' ? 'bg-amber-400 text-neutral-950 font-extrabold shadow-sm' : 'text-neutral-400 hover:bg-neutral-900/5 dark:hover:bg-neutral-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" /> 
                  <span>Subscribers</span>
                </div>
                <span className="text-[10px] font-mono bg-neutral-900/10 dark:bg-neutral-950/80 border border-neutral-200/10 px-2 py-0.5 rounded text-neutral-400 font-bold">{newsletterSubscribers.length}</span>
              </button>

              <button 
                onClick={() => { setActiveTab('settings'); setShowProductForm(false); }}
                className={`w-full py-3 px-4 rounded-xl font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-between transition cursor-pointer ${
                  activeTab === 'settings' ? 'bg-amber-400 text-neutral-950 font-extrabold shadow-sm' : 'text-neutral-400 hover:bg-neutral-900/5 dark:hover:bg-neutral-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4" /> 
                  <span>Atelier Settings</span>
                </div>
                <span className="text-[10px] font-mono opacity-60">Config</span>
              </button>

            </div>

            {/* QUICK SEED PANEL IF EMPTY */}
            {!isDbSeeded && (
              <div className="bg-amber-400/10 border border-amber-400/20 p-4 rounded-2xl text-xs space-y-2.5 text-amber-300">
                <span className="font-bold flex items-center gap-1"><Info className="h-4 w-4" /> Empty Database Detected</span>
                <p className="font-serif leading-relaxed text-[11px] opacity-80">Boostrap the premium initial collection, default stagers, and reviews with Mohd Sarik legacy seeds.</p>
                <button 
                  onClick={seedDatabase} 
                  className="w-full bg-amber-400 text-neutral-950 hover:brightness-110 py-2 rounded-lg font-bold tracking-wider font-sans text-[10px] uppercase shadow cursor-pointer transition"
                >
                  Seed Historic Data
                </button>
              </div>
            )}
          </div>

          {/* MAIN CONTAINER WORKSPACE */}
          <div className="lg:col-span-9 bg-white/70 dark:bg-neutral-900/40 border border-neutral-200/60 dark:border-neutral-900/90 rounded-2xl p-6 shadow-xl relative min-h-[500px]">
            
            {/* 1. REAL-TIME METRICS & STATISTICS TAB */}
            {activeTab === 'analytics' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="text-left border-b border-neutral-200 dark:border-neutral-850 pb-4">
                  <h2 className="text-xl font-serif font-light tracking-tight text-neutral-900 dark:text-stone-100">Synchronous Curation Dashboard</h2>
                  <p className="text-xs text-neutral-400 font-sans mt-0.5">Real-time indicators across client registries and ledger volumes.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  
                  <div className="bg-neutral-50 dark:bg-neutral-950/70 p-5 rounded-xl border border-neutral-200/60 dark:border-neutral-900 shadow-sm">
                    <span className="text-[9px] font-sans font-bold tracking-wider text-neutral-400 uppercase">Live Showroom Floor</span>
                    <span className="block text-3xl font-black text-amber-500 font-mono mt-1">{products.length}</span>
                    <p className="text-[10px] font-sans text-neutral-550 mt-1">Authentic woven assets synced</p>
                  </div>

                  <div className="bg-neutral-50 dark:bg-neutral-950/70 p-5 rounded-xl border border-neutral-200/60 dark:border-neutral-900 shadow-sm">
                    <span className="text-[9px] font-sans font-bold tracking-wider text-neutral-400 uppercase">Awaiting Client Inquiries</span>
                    <span className="block text-3xl font-black text-amber-500 font-mono mt-1">
                      {inquiries.filter(i => i.status === 'new').length}
                    </span>
                    <p className="text-[10px] font-sans text-neutral-550 mt-1">Total logged: {inquiries.length} leads</p>
                  </div>

                  <div className="bg-neutral-50 dark:bg-neutral-950/70 p-5 rounded-xl border border-neutral-200/60 dark:border-neutral-900 shadow-sm">
                    <span className="text-[9px] font-sans font-bold tracking-wider text-neutral-400 uppercase">Active Loom CAD commissions</span>
                    <span className="block text-3xl font-black text-amber-500 font-mono mt-1">{customRugRequests.length}</span>
                    <p className="text-[10px] font-sans text-neutral-550 mt-1">Bespoke custom specification orders</p>
                  </div>

                  <div className="bg-neutral-50 dark:bg-neutral-950/70 p-5 rounded-xl border border-neutral-200/60 dark:border-neutral-900 shadow-sm">
                    <span className="text-[9px] font-sans font-bold tracking-wider text-neutral-400 uppercase">Orders / Private Quotes</span>
                    <span className="block text-3xl font-black text-amber-500 font-mono mt-1">{orders.length}</span>
                    <p className="text-[10px] font-sans text-neutral-550 mt-1">Transaction registries logged</p>
                  </div>

                  <div className="bg-neutral-50 dark:bg-neutral-950/70 p-5 rounded-xl border border-neutral-200/60 dark:border-neutral-900 shadow-sm">
                    <span className="text-[9px] font-sans font-bold tracking-wider text-neutral-400 uppercase">Invoiced Valuation (Paid Orders)</span>
                    <span className="block text-2xl font-black text-emerald-400 font-mono mt-2">
                      ₹{totalInvoicedValue.toLocaleString()}
                    </span>
                    <p className="text-[10px] font-sans text-neutral-550 mt-1">Or ${Math.round(totalInvoicedValue / 82).toLocaleString()} approximate USD</p>
                  </div>

                  <div className="bg-neutral-50 dark:bg-neutral-950/70 p-5 rounded-xl border border-neutral-200/60 dark:border-neutral-900 shadow-sm">
                    <span className="text-[9px] font-sans font-bold tracking-wider text-neutral-400 uppercase">VIP Subscribers Registered</span>
                    <span className="block text-3xl font-black text-amber-500 font-mono mt-1">{newsletterSubscribers.length}</span>
                    <p className="text-[10px] font-sans text-neutral-550 mt-1">Priority private catalog cataloged</p>
                  </div>

                </div>

                {/* DIRECTIVES BOX */}
                <div className="p-5 bg-amber-500/5 text-amber-300 border border-amber-400/10 rounded-xl text-left font-serif leading-relaxed text-xs">
                  <div className="flex gap-2 items-start">
                    <Sliders className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                    <div className="space-y-1">
                      <strong className="text-amber-400">Chief Curation Desk Mandates:</strong>
                      <p className="text-neutral-400 leading-relaxed font-sans text-[11px] font-light">
                        Use this master platform to instantly publish rugs, synchronize transactional ledgers, coordinate bespoke customer reference blueprints, review testimonies and moderate online policies. Everything operates with durable secure database sync.
                      </p>
                    </div>
                  </div>
                </div>

                {/* MOCK PERFORMANCE INDICATOR */}
                <div className="bg-neutral-50 dark:bg-neutral-950/50 rounded-xl p-5 border border-neutral-200/65 dark:border-neutral-900 space-y-2 text-left">
                  <div className="flex justify-between items-center bg-white/5 pb-2">
                    <span className="font-bold text-xs uppercase tracking-wider">Atelier Connection Telemetry</span>
                    <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-950px-2.5 py-0.5 rounded">ONLINE</span>
                  </div>
                  <p className="text-[11px] font-sans text-neutral-450 leading-relaxed font-light">
                    Your connection coordinates are secured under Mohd Sarik Trusteeship. All operations (product creations, showcase portfolio alterations, review management and transactional edits) reflect onto the live client portal instantly with no stale states.
                  </p>
                </div>

              </div>
            )}

            {/* 2. PRODUCTS FORGE TAB ( ADD / EDIT / DELETE PRODUCTS with base64 UPLOAD ) */}
            {activeTab === 'products' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex justify-between items-center border-b border-neutral-200 dark:border-neutral-850 pb-4">
                  <div className="text-left">
                    <h2 className="text-xl font-serif font-light tracking-tight text-neutral-900 dark:text-stone-100">Products Forge</h2>
                    <p className="text-xs text-neutral-400 font-sans mt-0.5">Publish and maintain statement carpets inside real showroom catalog.</p>
                  </div>
                  {!showProductForm && (
                     <button 
                       onClick={() => handleOpenProductForm(null)}
                       className="bg-amber-400 text-neutral-950 hover:brightness-110 px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase font-sans flex items-center gap-1.5 cursor-pointer shadow-md"
                     >
                       <PlusCircle className="h-4 w-4" /> Forge Product
                     </button>
                  )}
                </div>

                {/* PRODUCT CREATION/EDITING FORM */}
                {showProductForm ? (
                  <form onSubmit={handleProductSubmit} className="space-y-6 bg-neutral-50 dark:bg-neutral-950/50 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-900 text-stone-100 text-left">
                    <div className="flex justify-between items-center border-b border-neutral-250 dark:border-neutral-850 pb-2.5 mb-2">
                      <h3 className="font-serif text-sm font-semibold tracking-wide text-neutral-900 dark:text-amber-400">
                        {editingProduct ? `Edit Carpet: ${editingProduct.name}` : `Forge New Statement Carpet`}
                      </h3>
                      <button 
                        type="button" 
                        onClick={() => setShowProductForm(false)} 
                        className="text-[10px] tracking-wider uppercase font-sans font-bold text-neutral-400 hover:text-white cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-neutral-800 dark:text-neutral-300">
                      
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Masterpiece Title</label>
                        <input 
                          type="text" 
                          value={formName} 
                          onChange={(e) => setFormName(e.target.value)} 
                          placeholder="E.g. Aurelia Gold Silk Weave" 
                          required 
                          className="w-full bg-white dark:bg-neutral-900 text-neutral-800 dark:text-stone-100 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Design SKU</label>
                        <input 
                          type="text" 
                          value={formSku} 
                          onChange={(e) => setFormSku(e.target.value)} 
                          placeholder="E.g. PRC-HT-AUR01" 
                          required 
                          className="w-full bg-white dark:bg-neutral-900 text-neutral-800 dark:text-stone-100 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 font-mono outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Collection Class</label>
                        <select 
                          value={formCategory} 
                          onChange={(e) => setFormCategory(e.target.value)} 
                          className="w-full bg-white dark:bg-neutral-900 text-neutral-800 dark:text-stone-100 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 outline-none font-sans font-semibold"
                        >
                          <option value="hand-tufted">Hand Tufted Rugs</option>
                          <option value="machine-made">Machine Made Rugs</option>
                          <option value="modern">Modern Rugs</option>
                          <option value="contemporary">Contemporary Rugs</option>
                          <option value="geometric">Geometric Rugs</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Material Composition</label>
                        <input 
                          type="text" 
                          value={formMaterial} 
                          onChange={(e) => setFormMaterial(e.target.value)} 
                          placeholder="E.g. 80% New Zealand Wool, 20% Bamboo Silk" 
                          required 
                          className="w-full bg-white dark:bg-neutral-900 text-neutral-800 dark:text-stone-100 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Price in India (INR ₹)</label>
                        <input 
                          type="number" 
                          value={formPriceINR} 
                          onChange={(e) => setFormPriceINR(Number(e.target.value))} 
                          required 
                          className="w-full bg-white dark:bg-neutral-900 text-neutral-800 dark:text-stone-100 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 font-mono outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Price International (USD $)</label>
                        <input 
                          type="number" 
                          value={formPriceUSD} 
                          onChange={(e) => setFormPriceUSD(Number(e.target.value))} 
                          required 
                          className="w-full bg-white dark:bg-neutral-900 text-neutral-800 dark:text-stone-100 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 font-mono outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Stock Availability</label>
                        <select 
                          value={formStockStatus} 
                          onChange={(e) => setFormStockStatus(e.target.value as any)} 
                          className="w-full bg-white dark:bg-neutral-900 text-neutral-800 dark:text-stone-100 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 font-sans font-semibold outline-none"
                        >
                          <option value="in_stock">In Stock (Showroom Floor)</option>
                          <option value="low_stock">Low Stock (Limited Looms)</option>
                          <option value="out_of_stock">Out of Stock (Awaiting weave)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5 flex items-center pt-5">
                        <input 
                          type="checkbox" 
                          id="featuredProductChbox"
                          checked={formIsFeatured} 
                          onChange={(e) => setFormIsFeatured(e.target.checked)} 
                          className="accent-amber-500 h-5 w-5 rounded border-neutral-300 dark:border-neutral-800 text-neutral-950 mr-3 cursor-pointer"
                        />
                        <label htmlFor="featuredProductChbox" className="text-[10px] font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 select-none cursor-pointer">
                          Mark as Featured Couture
                        </label>
                      </div>

                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-450 md:col-span-2 text-neutral-400">Available Dimensions (separate by comma)</label>
                        <input 
                          type="text" 
                          value={formSizes} 
                          onChange={(e) => setFormSizes(e.target.value)} 
                          placeholder="E.g. 6x9 ft (180x270 cm), 8x10 ft (240x300 cm)" 
                          required 
                          className="w-full bg-white dark:bg-neutral-900 text-neutral-800 dark:text-stone-100 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 outline-none"
                        />
                      </div>

                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Available Palette Colors (separate by comma)</label>
                        <input 
                          type="text" 
                          value={formColors} 
                          onChange={(e) => setFormColors(e.target.value)} 
                          placeholder="E.g. Gold, Ivory, Sage green, Anthracite" 
                          required 
                          className="w-full bg-white dark:bg-neutral-900 text-neutral-800 dark:text-stone-100 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 outline-none"
                        />
                      </div>

                      <div className="md:col-span-2 pt-2 pb-1">
                        <ImageUpload 
                          label="Carpet Curation Photography Asset"
                          currentImage={formImgUrl}
                          onImageUploaded={(b64) => setFormImgUrl(b64)}
                          onClear={() => setFormImgUrl('')}
                        />
                      </div>

                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Execution Features (one statement per line)</label>
                        <textarea 
                          value={formFeatures} 
                          onChange={(e) => setFormFeatures(e.target.value)} 
                          rows={3} 
                          placeholder="High-low dynamic depths..." 
                          className="w-full bg-white dark:bg-neutral-900 text-neutral-800 dark:text-stone-100 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 outline-none"
                        />
                      </div>

                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Heritage Curation Description</label>
                        <textarea 
                          value={formDescription} 
                          onChange={(e) => setFormDescription(e.target.value)} 
                          rows={4} 
                          placeholder="Describe the artistic layout of the design..." 
                          className="w-full bg-white dark:bg-neutral-900 text-neutral-800 dark:text-stone-100 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 outline-none text-xs"
                        />
                      </div>

                    </div>

                    <button 
                      type="submit" 
                      disabled={formSubmitting}
                      className="w-full bg-gradient-to-r from-amber-400 to-yellow-600 text-neutral-950 font-serif text-[11px] font-bold tracking-widest uppercase py-3.5 rounded-xl shadow-lg transition duration-200 hover:brightness-110 disabled:opacity-50 cursor-pointer"
                    >
                      {formSubmitting ? 'DISPATCHING TO CLOUD REGISTRY...' : 'COMMIT MASTERPIECE DATA'}
                    </button>
                    
                  </form>
                ) : (
                  /* PRODUCT LIST REFRESHED LAYOUT CONSOLE */
                  <div className="space-y-6">
                    {/* Presentation selection card */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-200/80 dark:border-neutral-900 text-left shadow-sm">
                      <div>
                        <h4 className="font-serif text-sm font-semibold text-neutral-800 dark:text-amber-400">Catalogue Representation Display</h4>
                        <p className="text-[10px] text-neutral-500 font-sans mt-0.5">Toggle between interactive design containers with live photo tracking or the raw inventory table.</p>
                      </div>
                      <div className="flex gap-2 bg-neutral-100 dark:bg-neutral-900/50 p-1 rounded-xl font-sans font-bold text-[10px] tracking-wider uppercase border border-neutral-200/50 dark:border-neutral-850">
                        <button
                          type="button"
                          onClick={() => setAdminProductViewMode('containers')}
                          className={`px-4.5 py-2.5 rounded-lg cursor-pointer transition ${
                            adminProductViewMode === 'containers'
                              ? 'bg-amber-400 text-neutral-950 shadow-sm'
                              : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-stone-200'
                          }`}
                        >
                          Visual Containers
                        </button>
                        <button
                          type="button"
                          onClick={() => setAdminProductViewMode('table')}
                          className={`px-4.5 py-2.5 rounded-lg cursor-pointer transition ${
                            adminProductViewMode === 'table'
                              ? 'bg-amber-400 text-neutral-950 shadow-sm'
                              : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-stone-200'
                          }`}
                        >
                          Compact Table Index
                        </button>
                      </div>
                    </div>

                    {/* Conditional render of views */}
                    {adminProductViewMode === 'containers' ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 text-left">
                        {products.length === 0 ? (
                          <div className="col-span-2 text-center py-20 bg-white dark:bg-neutral-950 rounded-3xl border border-neutral-200 dark:border-neutral-900 text-neutral-500 font-serif text-sm">
                            No woven designs published in platform files yet.
                          </div>
                        ) : (
                          products.map((prod) => {
                            const isEditingThisCard = editingCardId === prod.id;
                            const activeImgUrl = isEditingThisCard ? tempImgUrl : prod.images[0];
                            return (
                              <div
                                key={prod.id}
                                className={`rounded-3xl border bg-white dark:bg-neutral-950 shadow-sm overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                                  isEditingThisCard
                                    ? 'border-amber-400 ring-2 ring-amber-400/20 shadow-md'
                                    : 'border-neutral-200/70 dark:border-neutral-900 hover:border-amber-500/30'
                                }`}
                              >
                                <div className="p-6 space-y-4">
                                  {/* Container Image view with real-time update */}
                                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-900 border border-neutral-200 dark:border-neutral-850 group">
                                    {activeImgUrl ? (
                                      <img
                                        src={activeImgUrl}
                                        alt={prod.name}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                                      />
                                    ) : (
                                      <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center text-neutral-500 select-none">
                                        <Sliders className="h-8 w-8 text-neutral-600 mb-2" />
                                        <p className="text-xs font-sans">No photography resource assigned.</p>
                                      </div>
                                    )}
                                    <div className="absolute top-3.5 left-3.5 flex gap-1.5 flex-wrap">
                                      <span className="bg-zinc-950/85 backdrop-blur-md text-amber-400 text-[8.5px] font-mono uppercase tracking-widest font-extrabold px-2.5 py-1 rounded-full border border-white/5">
                                        {prod.sku}
                                      </span>
                                      <span className="bg-zinc-950/85 backdrop-blur-md text-emerald-400 text-[8.5px] font-sans uppercase tracking-widest font-extrabold px-2.5 py-1 rounded-full border border-white/5">
                                        ₹{prod.priceINR?.toLocaleString()}
                                      </span>
                                    </div>
                                    {isEditingThisCard && (
                                      <span className="absolute bottom-3.5 right-3.5 bg-amber-400 text-neutral-950 text-[8px] font-sans tracking-widest uppercase font-extrabold px-2.5 py-1 rounded animate-pulse">
                                        Editing Active Image
                                      </span>
                                    )}
                                  </div>

                                  {/* Database Path Tracker Area */}
                                  <div className="bg-neutral-50 dark:bg-neutral-900/60 font-mono text-[9.5px] p-4 rounded-2xl border border-neutral-200/50 dark:border-neutral-850 space-y-1.5 text-neutral-500 dark:text-neutral-450">
                                    <div className="flex justify-between items-center bg-neutral-250/50 dark:bg-neutral-950/40 px-2.5 py-0.5 rounded text-[8.5px] font-bold text-neutral-450 uppercase tracking-widest mb-2 self-start w-fit">
                                      <span>Database Path Tracker</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 overflow-hidden">
                                      <span className="text-amber-500 font-bold shrink-0">Path Ref:</span>
                                      <span className="font-bold select-all truncate text-neutral-800 dark:text-neutral-300">
                                        products / {prod.id} / images[0]
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 overflow-hidden">
                                      <span className="text-emerald-500 font-bold shrink-0">Current:</span>
                                      <span className="truncate select-all text-neutral-600 dark:text-neutral-300 font-light">
                                        {activeImgUrl || "Empty / Unspecified"}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-purple-500 font-bold shrink-0">Encoding:</span>
                                      <span>
                                        {activeImgUrl?.startsWith('data:')
                                          ? `Embedded Base64 Binary (~${Math.round(activeImgUrl.length / 1024)} KB)`
                                          : (activeImgUrl ? "Remote CDN URL Endpoint" : "Unspecified")}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Editable Title and Description Inside Card Container */}
                                  {isEditingThisCard ? (
                                    <div className="space-y-4 pt-2">
                                      <div className="space-y-1">
                                        <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">Product Title</label>
                                        <input
                                          type="text"
                                          value={tempName}
                                          onChange={(e) => setTempName(e.target.value)}
                                          className="w-full bg-stone-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-xl px-4 py-2.5 text-xs font-sans text-neutral-800 dark:text-stone-100 outline-none"
                                          required
                                        />
                                      </div>

                                      <div className="space-y-1">
                                        <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">Product Description</label>
                                        <textarea
                                          value={tempDescription}
                                          onChange={(e) => setTempDescription(e.target.value)}
                                          rows={3}
                                          className="w-full bg-stone-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-xl px-4 py-2.5 text-xs font-sans text-neutral-800 dark:text-stone-100 outline-none resize-none leading-relaxed"
                                          required
                                        />
                                      </div>

                                      <div className="space-y-2 border-t border-neutral-100 dark:border-neutral-900 pt-3.5">
                                        <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">Replace Photo Asset (Instantly Updates Preview)</label>
                                        <div className="space-y-2.5">
                                          <ImageUpload
                                            label="Upload Local Image"
                                            currentImage={tempImgUrl}
                                            onImageUploaded={(b64) => setTempImgUrl(b64)}
                                            onClear={() => setTempImgUrl('')}
                                          />
                                          <div className="space-y-1">
                                            <span className="text-[9px] uppercase font-bold tracking-wider text-neutral-400 block">Or Paste Remote URL</span>
                                            <input
                                              type="text"
                                              value={tempImgUrl}
                                              onChange={(e) => setTempImgUrl(e.target.value)}
                                              placeholder="https://images.unsplash.com/photo-..."
                                              className="w-full bg-stone-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-805 rounded-xl px-3 py-2 text-xs text-neutral-850 dark:text-stone-250 outline-none font-mono"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="space-y-2 pt-1">
                                      <h3 className="font-serif font-semibold text-[15px] text-neutral-900 dark:text-stone-100 tracking-tight leading-snug">
                                        {prod.name}
                                      </h3>
                                      <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans leading-relaxed tracking-wide font-light line-clamp-3">
                                        {prod.description}
                                      </p>
                                      
                                      <div className="flex flex-wrap gap-1.5 pt-1.5 text-[9.5px] font-mono tracking-wide text-neutral-400">
                                        <span className="bg-neutral-100 dark:bg-neutral-900/50 px-2.5 py-1 rounded-lg">Category: <strong className="text-amber-500 uppercase">{prod.category}</strong></span>
                                        <span className="bg-neutral-100 dark:bg-neutral-900/50 px-2.5 py-1 rounded-lg">Material: <strong className="text-neutral-600 dark:text-neutral-350">{prod.material.split(',')[0]}</strong></span>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* Controls Row */}
                                <div className="p-4 bg-neutral-50 dark:bg-neutral-900/40 border-t border-neutral-100 dark:border-neutral-900 flex justify-between items-center gap-2">
                                  {isEditingThisCard ? (
                                    <>
                                      <button
                                        type="button"
                                        onClick={() => setEditingCardId(null)}
                                        className="px-4 py-2 hover:bg-neutral-200 dark:hover:bg-neutral-900 text-neutral-600 dark:text-stone-300 rounded-xl text-[10px] font-sans font-bold uppercase tracking-wider cursor-pointer"
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        type="button"
                                        disabled={tempSavingId === prod.id}
                                        onClick={() => handleSaveInlineProduct(prod.id)}
                                        className="px-4 py-2.5 bg-amber-400 hover:brightness-110 text-neutral-950 font-sans font-extrabold text-[10px] rounded-xl uppercase tracking-wider cursor-pointer shadow-md flex items-center gap-1.5"
                                      >
                                        {tempSavingId === prod.id ? (
                                          <>
                                            <span className="h-3 w-3 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                                            Saving Changes...
                                          </>
                                        ) : (
                                          'Save Changes'
                                        )}
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          if (confirm(`Do you wish to purge ${prod.name} from public archives?`)) {
                                            deleteProductById(prod.id);
                                          }
                                        }}
                                        className="text-red-400 hover:text-red-500 px-3 py-2 hover:bg-red-500/5 rounded-xl text-[10px] font-sans uppercase font-bold tracking-wider cursor-pointer transition"
                                      >
                                        Purge Item
                                      </button>
                                      
                                      <div className="flex items-center gap-2">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setEditingCardId(prod.id);
                                            setTempName(prod.name);
                                            setTempDescription(prod.description);
                                            setTempImgUrl(prod.images[0] || '');
                                          }}
                                          className="px-3.5 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-250 dark:border-neutral-800 text-neutral-800 dark:text-stone-200 rounded-xl text-[10px] font-bold tracking-wider font-sans uppercase transition cursor-pointer hover:border-amber-400 hover:text-amber-400 flex items-center gap-1"
                                        >
                                          Edit Container
                                        </button>
                                        
                                        <button
                                          type="button"
                                          onClick={() => handleOpenProductForm(prod)}
                                          className="px-3.5 py-2.5 bg-amber-400 text-neutral-950 rounded-xl text-[10px] font-extrabold tracking-wider font-sans uppercase transition cursor-pointer hover:brightness-105 flex items-center gap-1 shadow-sm"
                                          title="Configure Stock & Pricing Attributes"
                                        >
                                          Deep Config
                                        </button>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    ) : (
                      /* PRODUCT LIST TABLE */
                      <div className="bg-white dark:bg-neutral-950 border border-neutral-200/70 dark:border-neutral-900 rounded-2xl overflow-hidden shadow">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left font-sans text-xs">
                            <thead>
                              <tr className="bg-neutral-50 dark:bg-neutral-900 text-neutral-450 uppercase tracking-widest text-[9px] font-bold border-b border-neutral-200 dark:border-neutral-800">
                                <th className="p-4 w-16">Asset</th>
                                <th className="p-4">Carpet Details</th>
                                <th className="p-4">SKU / Class</th>
                                <th className="p-4">Pricing</th>
                                <th className="p-4">Weave Reserve</th>
                                <th className="p-4 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-900">
                              {products.length === 0 ? (
                                <tr>
                                  <td colSpan={6} className="p-12 text-center text-neutral-500 font-serif">No woven designs published in platform files yet.</td>
                                </tr>
                              ) : (
                                products.map((prod) => (
                                  <tr key={prod.id} className="hover:bg-neutral-900/5 dark:hover:bg-neutral-900/30">
                                    <td className="p-4">
                                      <div className="h-12 w-12 rounded-lg bg-neutral-900 border border-neutral-800 overflow-hidden shadow-inner">
                                        <img src={prod.images[0]} alt="" className="h-full w-full object-cover" />
                                      </div>
                                    </td>
                                    <td className="p-4 text-left">
                                      <span className="font-serif font-bold text-neutral-850 dark:text-stone-150 block text-[13px]">{prod.name}</span>
                                      <span className="text-[10px] text-neutral-445 block truncate max-w-xs">{prod.material}</span>
                                    </td>
                                    <td className="p-4 uppercase font-mono text-[10.5px]">
                                      <span className="font-bold text-amber-500 block">{prod.sku}</span>
                                      <span className="text-[9px] text-neutral-500 block">{prod.category}</span>
                                    </td>
                                    <td className="p-4 font-mono font-bold space-y-0.5 text-left">
                                      <span className="block text-emerald-400">₹{prod.priceINR?.toLocaleString()}</span>
                                      <span className="block text-neutral-400 text-[10px] font-light">${prod.priceUSD?.toLocaleString()}</span>
                                    </td>
                                    <td className="p-4">
                                      <span className={`text-[9px] font-bold tracking-wider uppercase py-0.5 px-2 bg-neutral-900 w-fit block rounded ${
                                        prod.stockStatus === 'in_stock' ? 'text-emerald-400 border border-emerald-500/10' :
                                        prod.stockStatus === 'low_stock' ? 'text-amber-400 border border-amber-500/10' :
                                        'text-red-400 border border-red-500/5'
                                      }`}>
                                        {prod.stockStatus === 'in_stock' ? 'IN SHOWROOM' :
                                         prod.stockStatus === 'low_stock' ? 'LOW SECURED' : 'OUT / LOOM ONLY'}
                                      </span>
                                    </td>
                                    <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                                      <button 
                                        onClick={() => handleOpenProductForm(prod)}
                                        className="p-1 px-2.5 bg-neutral-900/10 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-amber-400 rounded hover:text-amber-400 cursor-pointer text-[10px] font-bold font-sans uppercase tracking-wider"
                                        title="Edit design"
                                      >
                                        Edit
                                      </button>
                                      <button 
                                        onClick={() => {
                                          if (confirm(`Do you wish to purge ${prod.name} from public archives?`)) {
                                            deleteProductById(prod.id);
                                          }
                                        }}
                                        className="p-1 px-2.5 bg-red-950/15 text-red-400 border border-red-500/10 hover:bg-red-500 hover:text-white rounded cursor-pointer text-[10px] font-bold font-sans uppercase tracking-wider"
                                        title="Purge design"
                                      >
                                        Purge
                                      </button>
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 3. ORDERS & TRANSACTIONS MANAGEMENT TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-left border-b border-neutral-200 dark:border-neutral-850 pb-4">
                  <h2 className="text-xl font-serif font-light tracking-tight text-neutral-900 dark:text-stone-100">Orders & Private Quotes Curation</h2>
                  <p className="text-xs text-neutral-400 font-sans mt-0.5">Moderate custom acquisitions, process invoices and dispatch tracking numbers.</p>
                </div>

                {/* VISUAL DRILL MODAL FOR SELECTED ORDER */}
                {selectedOrder && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs text-left animate-fadeIn">
                    <div className="bg-stone-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 w-full max-w-xl rounded-2xl p-6 space-y-6 font-sans">
                      
                      <div className="flex justify-between items-start border-b border-neutral-800 pb-3">
                        <div>
                          <span className="text-[10px] font-bold tracking-widest text-amber-500 font-mono uppercase bg-amber-955/50 px-2 py-0.5 rounded">
                            ID: {selectedOrder.id}
                          </span>
                          <h3 className="font-serif text-lg font-light text-neutral-900 dark:text-warm-ivory mt-1">Transaction Dossier</h3>
                        </div>
                        <button 
                          onClick={() => { setSelectedOrder(null); setOrderTrackingNum(''); }}
                          className="p-1.5 hover:bg-neutral-900 rounded-full text-neutral-400 hover:text-white"
                        >
                          <XCircle className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="space-y-1">
                          <span className="text-[10px] text-neutral-500 uppercase font-bold">Patron Curation</span>
                          <p className="font-serif font-bold text-sm text-neutral-900 dark:text-stone-150">{selectedOrder.customerName}</p>
                          <p className="text-neutral-400">{selectedOrder.email}</p>
                          <p className="text-neutral-450">{selectedOrder.phone}</p>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] text-neutral-500 uppercase font-bold">Consignment Destination</span>
                          <p className="font-bold text-neutral-800 dark:text-neutral-300">{selectedOrder.country}</p>
                          <p className="text-neutral-450 leading-relaxed max-w-xs truncate">{selectedOrder.address}</p>
                        </div>
                      </div>

                      {/* ORDER ITEMS LIST */}
                      <div className="border-t border-b border-neutral-200 dark:border-neutral-900 py-3.5 space-y-2 text-xs">
                        <span className="text-[10px] text-neutral-500 uppercase font-bold block mb-1">Acquired Masterworks</span>
                        {selectedOrder.items && selectedOrder.items.length > 0 ? (
                          selectedOrder.items.map((item, id) => (
                            <div key={id} className="flex justify-between items-center text-[12.5px] border-b border-neutral-200/20 last:border-0 pb-2">
                              <div>
                                <p className="font-serif font-bold text-neutral-800 dark:text-stone-200">{item.productName}</p>
                                <span className="text-[10px] text-neutral-500 uppercase">Size: {item.selectedSize} • Color: {item.selectedColor}</span>
                              </div>
                              <div className="text-right font-mono text-stone-300">
                                <span>Qty {item.quantity}</span> • <strong className="text-amber-500">₹{item.price?.toLocaleString() || selectedOrder.totalPrice?.toLocaleString()}</strong>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="flex justify-between items-center text-[12.5px]">
                            <div>
                              <p className="font-serif font-bold text-amber-300">{selectedOrder.productName || 'Custom Curation Request'}</p>
                              <span className="text-[10px] text-neutral-500">Acquisition Specs</span>
                            </div>
                            <strong className="text-amber-500 font-mono">₹{selectedOrder.totalPrice?.toLocaleString()}</strong>
                          </div>
                        )}
                      </div>

                      {/* WORKFLOW STATUS ALTER CONTROLS */}
                      <div className="space-y-4 text-xs bg-neutral-100 dark:bg-neutral-900/60 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800/80">
                        <span className="text-[10px] text-neutral-500 uppercase font-bold block">Consignment Workflow</span>
                        
                        <div className="flex gap-2 items-center flex-wrap">
                          <button 
                            disabled={orderUpdatingStatus}
                            onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'processed')}
                            className="bg-neutral-900 border border-neutral-800 hover:border-amber-400 text-neutral-300 font-sans text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded cursor-pointer"
                          >
                            Mark Processed
                          </button>
                          <button 
                            disabled={orderUpdatingStatus}
                            onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'shipped')}
                            className="bg-indigo-900 border border-indigo-800/20 hover:border-indigo-400 text-indigo-300 font-sans text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded cursor-pointer"
                          >
                            Mark Air Transit
                          </button>
                          <button 
                            disabled={orderUpdatingStatus}
                            onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'delivered')}
                            className="bg-emerald-900 border border-emerald-800/20 hover:border-emerald-400 text-emerald-300 font-sans text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded cursor-pointer"
                          >
                            Mark Delivered
                          </button>
                          <button 
                            disabled={orderUpdatingStatus}
                            onClick={() => handleUpdateOrderStatus(selectedOrder.id, 'cancelled')}
                            className="bg-red-950 border border-red-900/10 text-red-400 font-sans text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded cursor-pointer hover:bg-red-500 hover:text-white transition"
                          >
                            Cancel
                          </button>
                        </div>

                        {/* TRACKING NUMBER ENTRY */}
                        <div className="grid grid-cols-3 items-center gap-3 border-t border-neutral-200 dark:border-neutral-800 pt-3.5">
                          <label className="text-[10px] font-bold uppercase text-neutral-400 col-span-1">Airway Bill Tracking</label>
                          <input 
                            type="text"
                            value={orderTrackingNum}
                            onChange={(e) => setOrderTrackingNum(e.target.value)}
                            placeholder={selectedOrder.trackingNumber || "AWB Number (e.g. DHL-586)"}
                            className="col-span-2 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-stone-300 border border-neutral-200 dark:border-neutral-850 px-3 py-2 rounded text-xs font-mono outline-none focus:border-amber-400"
                          />
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* ORDERS DIRECTORY TABLE */}
                <div className="bg-white dark:bg-neutral-950 border border-neutral-200/70 dark:border-neutral-900 rounded-2xl overflow-hidden shadow">
                  <div className="overflow-x-auto overflow-y-hidden">
                    <table className="w-full text-left font-sans text-xs">
                      <thead>
                        <tr className="bg-neutral-50 dark:bg-neutral-900 text-neutral-450 uppercase tracking-widest text-[9px] font-bold border-b border-neutral-200/60 dark:border-neutral-800">
                          <th className="p-4">Invoice ID / Date</th>
                          <th className="p-4">Patron Purchaser</th>
                          <th className="p-4">Country</th>
                          <th className="p-4">Valuation Volume</th>
                          <th className="p-4">Workflow Progress</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100 dark:divide-neutral-900 text-xs">
                        {orders.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-12 text-center text-neutral-500 font-sans">No synchronous transactional ledgers logged in files yet.</td>
                          </tr>
                        ) : (
                          orders.map((ord) => (
                            <tr key={ord.id} className="hover:bg-neutral-900/5 dark:hover:bg-neutral-900/30">
                              <td className="p-4 text-left">
                                <span className="font-bold text-amber-500 font-mono block text-[11px]">{ord.id}</span>
                                <span className="text-[10px] text-neutral-500 block">{ord.orderDate ? new Date(ord.orderDate).toLocaleDateString() : 'N/A'}</span>
                              </td>
                              <td className="p-4 text-left">
                                <span className="font-serif font-bold text-neutral-850 dark:text-stone-150 block">{ord.customerName}</span>
                                <span className="text-[10px] text-neutral-500 block">{ord.email}</span>
                              </td>
                              <td className="p-4 font-bold text-stone-300">{ord.country}</td>
                              <td className="p-4 font-mono font-bold text-emerald-400 text-left">
                                <span>₹{ord.totalPrice?.toLocaleString()}</span>
                                <span className="text-neutral-500 text-[10px] font-light block">Mode: {ord.paymentStatus}</span>
                              </td>
                              <td className="p-4">
                                <span className={`text-[9px] font-bold tracking-wider uppercase py-0.5 px-2 bg-neutral-950 w-fit block rounded ${
                                  ord.orderStatus === 'pending' ? 'text-amber-400 border border-amber-500/15' :
                                  ord.orderStatus === 'processed' ? 'text-indigo-400 border border-indigo-505/15' :
                                  ord.orderStatus === 'shipped' ? 'text-sky-400 border border-sky-505/15 animate-pulse' :
                                  ord.orderStatus === 'delivered' ? 'text-emerald-400 border border-emerald-505/15' :
                                  'text-neutral-500 border border-neutral-805/10'
                                }`}>
                                  {ord.orderStatus}
                                </span>
                              </td>
                              <td className="p-4 text-right">
                                <button 
                                  onClick={() => { setSelectedOrder(ord); setOrderTrackingNum(ord.trackingNumber || ''); }}
                                  className="p-1 px-3 bg-neutral-900 border border-neutral-800 hover:border-amber-400 text-amber-400 font-sans text-[10px] font-bold uppercase tracking-wider rounded cursor-pointer select-none"
                                >
                                  Invoice Details
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* 4. VISUAL PORTFOLIO SHOWCASE MANAGEMST TAB */}
            {activeTab === 'showcase' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex justify-between items-center border-b border-neutral-200 dark:border-neutral-850 pb-4">
                  <div className="text-left">
                    <h2 className="text-xl font-serif font-light tracking-tight text-neutral-900 dark:text-stone-100">Visual Portfolio Showcase</h2>
                    <p className="text-xs text-neutral-400 font-sans mt-0.5">Publish high-resolution photo rolls of statement staging projects live.</p>
                  </div>
                  {!showShowcaseForm && (
                     <button 
                       onClick={() => handleOpenShowcaseForm(null)}
                       className="bg-amber-400 text-neutral-950 hover:brightness-110 px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase font-sans flex items-center gap-1.5 cursor-pointer shadow-md"
                     >
                       <PlusCircle className="h-4 w-4" /> Curate Showcase
                     </button>
                  )}
                </div>

                {/* SHOWCASE CREATION FORM */}
                {showShowcaseForm ? (
                  <form onSubmit={handleShowcaseSubmit} className="space-y-6 bg-neutral-50 dark:bg-neutral-950/50 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-900 text-stone-100 text-left">
                    <div className="flex justify-between items-center border-b border-neutral-250 dark:border-neutral-850 pb-2 mb-2">
                      <h3 className="font-serif text-sm font-semibold tracking-wide text-neutral-900 dark:text-amber-400">
                        {editingShowcase ? `Edit Showcase: ${editingShowcase.title}` : `Curate New Staging Showcase`}
                      </h3>
                      <button 
                        type="button" 
                        onClick={() => setShowShowcaseForm(false)} 
                        className="text-[10px] tracking-wider uppercase font-sans font-bold text-neutral-400 hover:text-white cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="space-y-4 text-xs font-sans text-neutral-800 dark:text-neutral-300">
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Staging Project Title</label>
                          <input 
                            type="text" 
                            value={showcaseTitle} 
                            onChange={(e) => setShowcaseTitle(e.target.value)} 
                            placeholder="E.g. Worli Penthouse Living Room" 
                            required 
                            className="w-full bg-white dark:bg-neutral-900 text-neutral-800 dark:text-stone-100 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 outline-none font-bold"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Gallery Placement Folder</label>
                          <select 
                            value={showcaseCategory} 
                            onChange={(e) => setShowcaseCategory(e.target.value)} 
                            className="w-full bg-white dark:bg-neutral-900 text-neutral-800 dark:text-stone-100 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 font-semibold outline-none"
                          >
                            <option value="Living Room Installations">Living Room Installations</option>
                            <option value="Hotel Projects">Hotel Projects</option>
                            <option value="Villa Projects">Villa Projects</option>
                            <option value="Office Projects">Office Projects</option>
                            <option value="Luxury Interior Projects">Luxury Interior Projects</option>
                          </select>
                        </div>
                      </div>

                      <div className="pt-2">
                        <ImageUpload 
                          label="Photography Roll Upload (High-Density Base64 Canvas)"
                          currentImage={showcaseImage}
                          onImageUploaded={(b64) => setShowcaseImage(b64)}
                          onClear={() => setShowcaseImage('')}
                        />
                      </div>

                      <div className="space-y-1.5 col-span-2">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Staging Architectural Curation Summary</label>
                        <textarea 
                          value={showcaseDescription} 
                          onChange={(e) => setShowcaseDescription(e.target.value)} 
                          rows={3} 
                          placeholder="Describe the architectural grid, colors, and specific statements created by the custom rug..." 
                          className="w-full bg-white dark:bg-neutral-900 text-neutral-800 dark:text-stone-100 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 outline-none"
                        />
                      </div>

                    </div>

                    <button 
                      type="submit" 
                      disabled={showcaseSubmitting}
                      className="w-full bg-gradient-to-r from-amber-400 to-yellow-600 text-neutral-950 font-serif text-[11px] font-bold tracking-widest uppercase py-3 rounded-xl shadow-lg transition duration-200 hover:brightness-110 disabled:opacity-50 cursor-pointer"
                    >
                      {showcaseSubmitting ? 'curating staging photograph...' : 'DEPLOY SHOWCASE DIRECTORY'}
                    </button>
                  </form>
                ) : (
                  /* SHOWCASE LIST GRID */
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    {showcaseProjects.length === 0 ? (
                      <div className="col-span-2 py-12 bg-neutral-950 text-center text-neutral-500 text-xs rounded-xl font-sans">No visual installations staged yet.</div>
                    ) : (
                      showcaseProjects.map((proj) => (
                        <div key={proj.id} className="bg-neutral-50 dark:bg-neutral-950/40 rounded-xl overflow-hidden border border-neutral-200/60 dark:border-neutral-900 flex flex-col justify-between">
                          <div className="relative aspect-video bg-neutral-900">
                            <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                            <span className="absolute top-2.5 left-2.5 bg-black/80 text-amber-500 text-[8px] font-mono font-bold tracking-widest uppercase py-1 px-2.5 rounded">
                              {proj.category}
                            </span>
                          </div>
                          
                          <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                            <div className="space-y-1">
                              <h4 className="font-serif font-bold text-neutral-850 dark:text-stone-150 uppercase leading-snug">{proj.title}</h4>
                              <p className="text-[11px] font-sans font-light leading-relaxed text-neutral-400 truncate-3-lines">{proj.description}</p>
                            </div>

                            <div className="pt-3.5 border-t border-neutral-200 dark:border-neutral-900 flex justify-end gap-1.5">
                              <button 
                                onClick={() => handleOpenShowcaseForm(proj)} 
                                className="bg-neutral-900/10 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-850 text-neutral-450 hover:border-amber-400 hover:text-amber-400 font-sans text-[10px] font-bold px-2.5 py-1 rounded cursor-pointer"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={async () => {
                                  if (confirm(`Do you wish to delete staged setup: ${proj.title}?`)) {
                                    await deleteShowcaseProject(proj.id);
                                  }
                                }} 
                                className="bg-red-950 text-red-400 border border-red-500/10 hover:bg-red-500 hover:text-white font-sans text-[10px] font-bold px-2.5 py-1 rounded cursor-pointer transition"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 5. CLIENT LEADS LIST TAB */}
            {activeTab === 'leads' && (
              <div className="space-y-4 animate-fadeIn text-left">
                <div className="border-b border-neutral-200 dark:border-neutral-850 pb-4">
                  <h2 className="text-xl font-serif font-light tracking-tight text-neutral-900 dark:text-stone-100">Client Inquiries & Coordinates</h2>
                  <p className="text-xs text-neutral-400 font-sans mt-0.5">Active leads syncing from physical WhatsApp showrooms and details listings.</p>
                </div>
                
                <div className="bg-white dark:bg-neutral-950 border border-neutral-200/70 dark:border-neutral-900 rounded-2xl overflow-hidden shadow">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-sans text-xs">
                      <thead>
                        <tr className="bg-neutral-50 dark:bg-neutral-900 text-neutral-450 uppercase tracking-widest text-[9px] font-bold border-b border-neutral-200 dark:border-neutral-800">
                          <th className="p-4">Lead Information</th>
                          <th className="p-4">Territory</th>
                          <th className="p-4">Interest Summary</th>
                          <th className="p-4">Progress State</th>
                          <th className="p-4 text-right">Workflow Change</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100 dark:divide-neutral-900 text-xs">
                        {inquiries.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="p-12 text-center text-neutral-500">No client catalogs requested. No records registered in files.</td>
                          </tr>
                        ) : (
                          inquiries.map((inq) => (
                            <tr key={inq.id} className="hover:bg-neutral-900/5 dark:hover:bg-neutral-900/30">
                              <td className="p-4 text-left">
                                <span className="font-serif font-bold text-amber-500 block text-[13px]">{inq.name}</span>
                                <span className="text-[10px] text-stone-400 block font-mono">{inq.phone}</span>
                                <span className="text-[10px] text-neutral-500 block">{inq.email}</span>
                              </td>
                              <td className="p-4 font-bold text-stone-300">{inq.country}</td>
                              <td className="p-4">
                                {inq.productInterest && <span className="bg-neutral-900 border border-neutral-800 text-amber-300 rounded font-mono text-[9px] py-0.5 px-2 block w-fit mb-1 uppercase font-semibold">SKU: {inq.productInterest}</span>}
                                <p className="text-[11px] text-neutral-455 max-w-sm font-sans font-light leading-relaxed">{inq.message}</p>
                                <span className="text-[9px] text-neutral-550 block mt-1 font-mono">{inq.createdAt ? new Date(inq.createdAt).toLocaleString() : 'N/A'}</span>
                              </td>
                              <td className="p-4">
                                <span className={`text-[9px] uppercase font-bold tracking-wider py-0.5 px-2.5 rounded ${
                                  inq.status === 'new' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/10' :
                                  inq.status === 'contacted' ? 'bg-amber-955 text-amber-500 border border-amber-500/10' :
                                  inq.status === 'qualified' ? 'bg-indigo-950 text-indigo-400 border border-indigo-500/10' :
                                  'bg-neutral-900 text-neutral-500 border border-neutral-800'
                                }`}>
                                  {inq.status}
                                </span>
                              </td>
                              <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                                <button onClick={() => updateInquiryStatus(inq.id!, 'contacted')} className="text-[9px] font-bold uppercase tracking-wider bg-amber-400 hover:brightness-110 text-neutral-950 px-2 py-1 rounded cursor-pointer">Inquire Partner</button>
                                <button onClick={() => updateInquiryStatus(inq.id!, 'qualified')} className="text-[9px] font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-555 text-white px-2 py-1 rounded cursor-pointer">Qualify</button>
                                <button onClick={() => updateInquiryStatus(inq.id!, 'closed')} className="text-[9px] font-bold uppercase tracking-wider bg-neutral-900 border border-neutral-800 hover:bg-red-950 hover:text-red-400 text-neutral-400 px-2 py-1 rounded cursor-pointer">Dismiss</button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* 6. BESPOKE CUSTOM COMMISSION LOOMS DATA TAB */}
            {activeTab === 'bespoke' && (
              <div className="space-y-4 animate-fadeIn text-left">
                <div className="border-b border-neutral-200 dark:border-neutral-850 pb-4">
                  <h2 className="text-xl font-serif font-light tracking-tight text-neutral-900 dark:text-stone-100">Bespoke Architectural Weaving Commissions</h2>
                  <p className="text-xs text-neutral-400 font-sans mt-0.5">Track loom deployments, approval of high-precision dynamic CAD models, and active stager milestones.</p>
                </div>
                
                <div className="bg-white dark:bg-neutral-950 border border-neutral-200/75 dark:border-neutral-900 rounded-2xl overflow-hidden shadow">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-sans text-xs">
                      <thead>
                        <tr className="bg-neutral-50 dark:bg-neutral-900 text-neutral-450 uppercase tracking-widest text-[9px] font-bold border-b border-neutral-200 dark:border-neutral-800">
                          <th className="p-4">VIP Patron Curation</th>
                          <th className="p-4">Form Silhouette</th>
                          <th className="p-4">Color Palette Requested</th>
                          <th className="p-4 font-bold">Image Board / Specs</th>
                          <th className="p-4">Loom Status</th>
                          <th className="p-4 text-right">Loom Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100 dark:divide-neutral-900 text-xs">
                        {customRugRequests.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-12 text-center text-neutral-500 font-sans">No bespoke CAD designs requested. Loom registry cleared.</td>
                          </tr>
                        ) : (
                          customRugRequests.map((req) => (
                            <tr key={req.id} className="hover:bg-neutral-900/5 dark:hover:bg-neutral-900/30">
                              <td className="p-4 text-left">
                                <span className="font-serif font-bold text-amber-500 block text-[13px]">{req.name}</span>
                                <span className="text-[10px] text-neutral-400 block font-mono">{req.phone}</span>
                                <span className="text-[10px] text-neutral-500 block">{req.email}</span>
                                <span className="text-[10px] text-neutral-600 block underline">{req.country}</span>
                              </td>
                              <td className="p-4 text-left">
                                <span className="font-bold text-stone-250 block text-[11px]">{req.desiredSize}</span>
                                <span className="text-[9px] text-amber-500 block font-bold leading-normal uppercase">{req.desiredShape}</span>
                              </td>
                              <td className="p-4 font-bold text-stone-300">{req.desiredColor}</td>
                              <td className="p-4 text-neutral-450 text-[11.5px] max-w-xs text-left">
                                {req.referenceImage && (
                                  <div className="space-y-1.5">
                                    <span className="text-[9px] font-mono font-bold text-neutral-450 uppercase block">Board Asset:</span>
                                    <div className="h-14 w-24 bg-neutral-900 rounded overflow-hidden border border-neutral-850 shadow">
                                      <img src={req.referenceImage} alt="Reference blueprint" className="h-full w-full object-cover" />
                                    </div>
                                    <a href={req.referenceImage} target="_blank" rel="noopener noreferrer" className="text-amber-500 text-[10px] font-bold hover:underline block font-sans">
                                      Expand Design Board ↗
                                    </a>
                                  </div>
                                )}
                                <p className="whitespace-pre-line leading-relaxed font-sans mt-2 text-[10.5px] text-neutral-400 font-light">{req.projectDetails}</p>
                              </td>
                              <td className="p-4">
                                <span className={`text-[9px] font-bold tracking-wider uppercase py-0.5 px-2 rounded ${
                                  req.status === 'pending' ? 'bg-amber-955 text-amber-500 border border-amber-500/10' :
                                  req.status === 'design_phase' ? 'bg-indigo-955 text-indigo-400 border border-indigo-500/10' :
                                  req.status === 'active_weaving' ? 'bg-emerald-955 text-emerald-400 border border-emerald-500/20 animate-pulse' :
                                  'bg-neutral-900 text-neutral-500 border border-neutral-805'
                                }`}>
                                  {req.status === 'active_weaving' ? 'weaving on loom' : req.status}
                                </span>
                              </td>
                              <td className="p-4 text-right space-y-1 whitespace-nowrap">
                                <button onClick={() => updateCustomRugStatus(req.id!, 'design_phase')} className="text-[9px] font-bold uppercase tracking-wider bg-indigo-600 hover:bg-indigo-550 text-white block w-full px-2.5 py-1 rounded cursor-pointer leading-tight">Design CAD</button>
                                <button onClick={() => updateCustomRugStatus(req.id!, 'active_weaving')} className="text-[9px] font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-555 text-white block w-full px-2.5 py-1 rounded cursor-pointer leading-tight">Weaving Loom</button>
                                <button onClick={() => updateCustomRugStatus(req.id!, 'completed')} className="text-[9px] font-bold uppercase tracking-wider bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-400 block w-full px-2.5 py-1 rounded cursor-pointer leading-tight">Complete</button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* 7. STAR REVIEW TESTIMONIAL MODERATION TAB */}
            {activeTab === 'reviews' && (
              <div className="space-y-4 animate-fadeIn text-left">
                <div className="border-b border-neutral-200 dark:border-neutral-850 pb-4">
                  <h2 className="text-xl font-serif font-light tracking-tight text-neutral-900 dark:text-stone-100">Testimonial Curation</h2>
                  <p className="text-xs text-neutral-400 font-sans mt-0.5">Approve patron review statements to display onto our home Visual Diary stanzas.</p>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {reviews.length === 0 ? (
                    <div className="py-12 bg-neutral-950 text-center text-neutral-550 text-xs rounded-xl font-sans">No review records in database.</div>
                  ) : (
                    reviews.map((rev) => (
                      <div key={rev.id} className="bg-neutral-50 dark:bg-neutral-950 p-5 rounded-xl border border-neutral-200/60 dark:border-neutral-905 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-left">
                        <div className="space-y-2 max-w-2xl font-sans text-xs">
                          <div className="flex text-amber-400">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`h-3.5 w-3.5 ${i < rev.rating ? 'fill-current' : 'opacity-25'}`} />
                            ))}
                          </div>
                          <p className="font-serif text-neutral-800 dark:text-stone-300 italic text-[12.5px] leading-relaxed">"{rev.comment}"</p>
                          
                          <div className="text-[10px] text-neutral-450 uppercase font-sans font-bold flex items-center gap-1.5">
                            <span className="text-amber-500 font-extrabold">{rev.name}</span> • <span>{rev.location}</span>
                          </div>
                        </div>

                        <div className="space-y-2 shrink-0 flex flex-col items-end md:justify-center pt-1 w-full md:w-auto">
                          <span className={`text-[9px] tracking-wider uppercase font-extrabold py-0.5 px-2 bg-neutral-900 rounded ${
                            rev.status === 'approved' ? 'text-emerald-400 border border-emerald-500/10' : 'text-red-400 border border-red-500/5'
                          }`}>
                            {rev.status === 'approved' ? 'Approved on Gallery' : 'Pending Verification'}
                          </span>
                          <div className="flex gap-2">
                            {rev.status !== 'approved' && (
                              <button 
                                onClick={() => approveClientReview(rev.id!)} 
                                className="bg-emerald-600 hover:bg-emerald-555 text-white font-sans text-[10px] font-bold tracking-wider uppercase py-1 px-3.5 rounded cursor-pointer"
                              >
                                Approve Live
                              </button>
                            )}
                            <button 
                              onClick={() => {
                                if (confirm("Do you wish to delete this patron review statement?")) {
                                  deleteClientReview(rev.id!);
                                }
                              }} 
                              className="bg-neutral-900 hover:bg-red-950 hover:text-red-400 border border-neutral-800 text-neutral-400 font-sans text-[10px] font-bold tracking-wider uppercase py-1 px-3 rounded cursor-pointer transition"
                              title="Delete review"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* 8. NEWSLETTER SUBSCRIBERS ROSTER TAB */}
            {activeTab === 'subscribers' && (
              <div className="space-y-4 animate-fadeIn text-left">
                <div className="flex justify-between items-center border-b border-neutral-200 dark:border-neutral-850 pb-4">
                  <div className="text-left">
                    <h2 className="text-xl font-serif font-light tracking-tight text-neutral-900 dark:text-stone-100">VIP Subscribers Register</h2>
                    <p className="text-xs text-neutral-400 font-sans mt-0.5">Coordinates list of elite patrons registered for priority catalogs.</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-950 border border-neutral-200/70 dark:border-neutral-900 rounded-2xl overflow-hidden shadow">
                  <table className="w-full text-left font-sans text-xs">
                    <thead>
                      <tr className="bg-neutral-50 dark:bg-neutral-900 text-neutral-450 uppercase tracking-widest text-[9px] font-bold border-b border-neutral-200/60 dark:border-neutral-800">
                        <th className="p-4">VIP Subscriber Coordinates</th>
                        <th className="p-4">Authorized Registry Date</th>
                        <th className="p-4">Marketing Protection</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 dark:divide-neutral-900 font-mono text-[11px] leading-relaxed">
                      {newsletterSubscribers.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="p-12 text-center text-neutral-500 font-sans">No private registrees cataloged in database yet.</td>
                        </tr>
                      ) : (
                        newsletterSubscribers.map((sub, j) => (
                          <tr key={j} className="hover:bg-neutral-900/5 dark:hover:bg-neutral-900/25">
                            <td className="p-4 text-left">
                              <span className="text-amber-500 font-bold select-all text-xs font-mono">{sub.email}</span>
                            </td>
                            <td className="p-4 text-stone-400">{sub.subscribedAt ? new Date(sub.subscribedAt).toLocaleString() : 'N/A'}</td>
                            <td className="p-4 text-emerald-400 font-bold font-sans">✓ Authenticated & GDPR Shielded</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 9. GLOBAL BRAND SETTINGS & ENTERPRISE POLICIES TAB */}
            {activeTab === 'settings' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-left border-b border-neutral-200 dark:border-neutral-850 pb-4">
                  <h2 className="text-xl font-serif font-light tracking-tight text-neutral-900 dark:text-stone-100">Global Website Configuration</h2>
                  <p className="text-xs text-neutral-400 font-sans mt-0.5">Control contact lines and legal policies dynamically across the visual front portal.</p>
                </div>

                {settingsStatusMsg && (
                  <div className="p-3 bg-emerald-950/45 border border-emerald-500/20 text-emerald-400 font-sans text-xs rounded-xl leading-normal text-left">
                    <span>{settingsStatusMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSettingsSubmit} className="space-y-6 text-left font-sans text-xs text-neutral-800 dark:text-neutral-300">
                  
                  {/* BRAND DETAILS GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Business Name</label>
                      <input 
                        type="text"
                        value={settingsForm.businessName}
                        onChange={(e) => setSettingsForm(prev => ({ ...prev, businessName: e.target.value }))}
                        className="w-full bg-white dark:bg-neutral-950 text-neutral-800 dark:text-stone-150 border border-neutral-200 dark:border-neutral-850 px-4 py-3 rounded-xl outline-none focus:border-amber-400"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Founder Curation Trustee</label>
                      <input 
                        type="text"
                        value={settingsForm.founder}
                        onChange={(e) => setSettingsForm(prev => ({ ...prev, founder: e.target.value }))}
                        className="w-full bg-white dark:bg-neutral-950 text-neutral-800 dark:text-stone-150 border border-neutral-200 dark:border-neutral-850 px-4 py-3 rounded-xl outline-none focus:border-amber-400"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Showroom Location Address</label>
                      <input 
                        type="text"
                        value={settingsForm.location}
                        onChange={(e) => setSettingsForm(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full bg-white dark:bg-neutral-950 text-neutral-800 dark:text-stone-150 border border-neutral-200 dark:border-neutral-850 px-4 py-3 rounded-xl outline-none focus:border-amber-400"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Concierge Helpline</label>
                      <input 
                        type="text"
                        value={settingsForm.phone}
                        onChange={(e) => setSettingsForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-white dark:bg-neutral-950 text-neutral-800 dark:text-stone-150 border border-neutral-200 dark:border-neutral-850 px-4 py-3 rounded-xl outline-none focus:border-amber-400"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">WhatsApp Concierge Link Line</label>
                      <input 
                        type="text"
                        value={settingsForm.whatsapp}
                        onChange={(e) => setSettingsForm(prev => ({ ...prev, whatsapp: e.target.value }))}
                        className="w-full bg-white dark:bg-neutral-950 text-neutral-800 dark:text-stone-150 border border-neutral-200 dark:border-neutral-850 px-4 py-3 rounded-xl outline-none focus:border-amber-400"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Private Registry Inbox</label>
                      <input 
                        type="email"
                        value={settingsForm.contactEmail}
                        onChange={(e) => setSettingsForm(prev => ({ ...prev, contactEmail: e.target.value }))}
                        className="w-full bg-white dark:bg-neutral-950 text-neutral-800 dark:text-stone-150 border border-neutral-200 dark:border-neutral-850 px-4 py-3 rounded-xl outline-none focus:border-amber-400"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Instagram URL Override</label>
                      <input 
                        type="text"
                        value={settingsForm.instagramUrl}
                        onChange={(e) => setSettingsForm(prev => ({ ...prev, instagramUrl: e.target.value }))}
                        className="w-full bg-white dark:bg-neutral-950 text-stone-150 border border-neutral-200 dark:border-neutral-850 px-4 py-3 rounded-xl outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Facebook URL Override</label>
                      <input 
                        type="text"
                        value={settingsForm.facebookUrl}
                        onChange={(e) => setSettingsForm(prev => ({ ...prev, facebookUrl: e.target.value }))}
                        className="w-full bg-white dark:bg-neutral-950 text-stone-150 border border-neutral-200 dark:border-neutral-850 px-4 py-3 rounded-xl outline-none"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Global SEO Homepage Title Tag</label>
                      <input 
                        type="text"
                        value={settingsForm.seoTitle}
                        onChange={(e) => setSettingsForm(prev => ({ ...prev, seoTitle: e.target.value }))}
                        className="w-full bg-white dark:bg-neutral-950 text-stone-150 border border-neutral-200 dark:border-neutral-850 px-4 py-3 rounded-xl outline-none"
                        placeholder="Meta SEO Curation tag title..."
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Global SEO Homepage Short Curation description</label>
                      <textarea 
                        value={settingsForm.seoDescription}
                        onChange={(e) => setSettingsForm(prev => ({ ...prev, seoDescription: e.target.value }))}
                        rows={2}
                        className="w-full bg-white dark:bg-neutral-950 text-stone-150 border border-neutral-200 dark:border-neutral-850 px-4 py-3 rounded-xl outline-none"
                        placeholder="Define description keywords for meta results..."
                      />
                    </div>

                    {/* POLICY OVERRIDES */}
                    <div className="space-y-1.5 md:col-span-2 border-t border-neutral-200 dark:border-neutral-900 pt-4 mt-2">
                      <label className="text-[10px] uppercase font-bold text-amber-500 tracking-widest block mb-2">Corporate Policies & Covenants</label>
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Shipping & Freight Covenants</label>
                      <textarea 
                        value={settingsForm.shippingPolicy}
                        onChange={(e) => setSettingsForm(prev => ({ ...prev, shippingPolicy: e.target.value }))}
                        rows={3}
                        className="w-full bg-white dark:bg-neutral-950 text-stone-150 border border-neutral-200 dark:border-neutral-850 px-4 py-3 rounded-xl outline-none text-xs leading-normal"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Returns & Commisions Guarantees</label>
                      <textarea 
                        value={settingsForm.refundPolicy}
                        onChange={(e) => setSettingsForm(prev => ({ ...prev, refundPolicy: e.target.value }))}
                        rows={3}
                        className="w-full bg-white dark:bg-neutral-950 text-stone-150 border border-neutral-200 dark:border-neutral-850 px-4 py-3 rounded-xl outline-none text-xs leading-normal"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Elite Patron Privacy rules</label>
                      <textarea 
                        value={settingsForm.privacyPolicy}
                        onChange={(e) => setSettingsForm(prev => ({ ...prev, privacyPolicy: e.target.value }))}
                        rows={3}
                        className="w-full bg-white dark:bg-neutral-950 text-stone-150 border border-neutral-200 dark:border-neutral-850 px-4 py-3 rounded-xl outline-none text-xs leading-normal"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Atelier Terms & Deposits Conditions</label>
                      <textarea 
                        value={settingsForm.termsConditions}
                        onChange={(e) => setSettingsForm(prev => ({ ...prev, termsConditions: e.target.value }))}
                        rows={3}
                        className="w-full bg-white dark:bg-neutral-950 text-stone-150 border border-neutral-200 dark:border-neutral-850 px-4 py-3 rounded-xl outline-none text-xs leading-normal"
                      />
                    </div>

                  </div>

                  <button 
                    type="submit"
                    disabled={settingsSaving}
                    className="w-full bg-gradient-to-r from-amber-400 to-yellow-600 text-neutral-950 font-serif text-[11px] font-bold tracking-widest uppercase py-3.5 rounded-xl shadow-lg transition duration-205 hover:brightness-110 disabled:opacity-50 cursor-pointer"
                  >
                    {settingsSaving ? 'syncing corporate profiles...' : 'COMMIT WEBSITE CONFIGURATION'}
                  </button>

                </form>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
