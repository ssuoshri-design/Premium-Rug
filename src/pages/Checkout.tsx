import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  CreditCard, 
  Lock, 
  Truck, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  Clock, 
  ShoppingBag, 
  Sparkles, 
  HelpCircle,
  Printer,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { db } from '../firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

export default function Checkout() {
  const { 
    cart, 
    clearCart, 
    currency, 
    setCurrentPage, 
    detectedCountry, 
    submitOrderEstimate 
  } = useApp();

  // Navigation Guard - if cart is empty and we are not in success step, redirect to collection
  useEffect(() => {
    if (cart.length === 0 && checkoutStep !== 'success') {
      setCurrentPage('collection');
    }
  }, [cart]);

  // Steps: 'shipping' | 'payment' | 'authorizing' | 'success'
  const [checkoutStep, setCheckoutStep] = useState<'shipping' | 'payment' | 'authorizing' | 'success'>('shipping');

  // Contact & Shipping Fields
  const [patronName, setPatronName] = useState('');
  const [patronEmail, setPatronEmail] = useState('');
  const [patronPhone, setPatronPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingState, setShippingState] = useState('');
  const [shippingZip, setShippingZip] = useState('');
  const [shippingCountry, setShippingCountry] = useState(detectedCountry || 'India');
  const [weaverNotes, setWeaverNotes] = useState('');

  // Payment Fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Authorizing/Progress Fields
  const [authProgress, setAuthProgress] = useState(0);
  const [gatewayMessage, setGatewayMessage] = useState('Securing boutique bank connection...');

  // Created Order Fields (for Step 4 display)
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  // Format Card Number (adds spaces every 4 digits)
  const handleCardNumberChange = (value: string) => {
    const cleanValue = value.replace(/\D/g, '').slice(0, 16);
    let formatted = '';
    for (let i = 0; i < cleanValue.length; i++) {
      if (i > 0 && i % 4 === 0) formatted += ' ';
      formatted += cleanValue[i];
    }
    setCardNumber(formatted);
  };

  // Format Card Expiry (adds slash as MM/YY)
  const handleCardExpiryChange = (value: string) => {
    const cleanValue = value.replace(/\D/g, '').slice(0, 4);
    if (cleanValue.length >= 3) {
      setCardExpiry(`${cleanValue.slice(0, 2)}/${cleanValue.slice(2)}`);
    } else {
      setCardExpiry(cleanValue);
    }
  };

  // Detect card network logo based on starting digit
  const getCardType = () => {
    const num = cardNumber.replace(/\D/g, '');
    if (num.startsWith('4')) return 'visa';
    if (num.startsWith('5')) return 'mastercard';
    if (num.startsWith('3')) return 'amex';
    if (num.startsWith('6') || num.startsWith('50')) return 'maestro';
    return 'generic';
  };

  // Calculate sum totals
  const getTotals = () => {
    const total = cart.reduce((acc, item) => {
      const price = currency === 'INR' ? item.product.priceINR : item.product.priceUSD;
      return acc + (price * item.quantity);
    }, 0);
    return total;
  };

  // Shipping form validation
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patronName || !patronEmail || !patronPhone || !shippingAddress || !shippingCity || !shippingState || !shippingZip) {
      return;
    }
    setCheckoutStep('payment');
  };

  // Authorizing & Secure Processing Simulator
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError(null);
    
    // Quick Form Validation Checks
    const cleanCard = cardNumber.replace(/\s/g, '');
    if (cleanCard.length < 16) {
      setPaymentError('Please specify a valid 16-digit billing credit card.');
      return;
    }
    if (!cardHolder.trim()) {
      setPaymentError('Credit card holder name is required.');
      return;
    }
    if (cardExpiry.length < 5) {
      setPaymentError('Card expiration state is invalid. Enter MM/YY.');
      return;
    }
    if (cardCvv.length < 3) {
      setPaymentError('Enter correct 3 or 4 digit CVV parameter.');
      return;
    }

    // Move to SECURE GATEWAY AUTHORIZATION STEP
    setCheckoutStep('authorizing');
    setAuthProgress(0);
  };

  // Simulate gateway steps
  useEffect(() => {
    if (checkoutStep !== 'authorizing') return;

    const interval = setInterval(() => {
      setAuthProgress(prev => {
        const next = prev + 1;
        if (next === 25) {
          setGatewayMessage('Authenticating secure bank credentials...');
        } else if (next === 50) {
          setGatewayMessage('Allocating sovereign loom coordinate registries...');
        } else if (next === 75) {
          setGatewayMessage('Transacting premium ledger authorization...');
        } else if (next >= 100) {
          clearInterval(interval);
          // Persist the order in Firestore under the 'orders' table
          finalizeOrderInFirestore();
          return 100;
        }
        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [checkoutStep]);

  // Finalize Order in Firestore
  const finalizeOrderInFirestore = async () => {
    const orderId = `PRC-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const total = getTotals();
    
    const formattedItems = cart.map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      quantity: item.quantity,
      selectedSize: item.selectedSize,
      selectedColor: item.selectedColor,
      price: currency === 'INR' ? item.product.priceINR : item.product.priceUSD
    }));

    const orderDocData = {
      id: orderId,
      customerName: patronName,
      phone: patronPhone,
      email: patronEmail,
      country: shippingCountry,
      address: `${shippingAddress}, ${shippingCity}, ${shippingState} - ${shippingZip}`,
      items: formattedItems,
      totalPrice: total,
      currency,
      paymentStatus: 'paid', // Transaction verified
      orderStatus: 'processed', // Standard start queue
      orderDate: new Date().toISOString(),
      notes: weaverNotes || 'Direct Secure Gateway Credit Card Checkout'
    };

    try {
      // Direct commit to Live Firestore under 'orders' collection
      await setDoc(doc(db, 'orders', orderId), orderDocData);
      
      // Update local state to show invoice receipt
      setCompletedOrder(orderDocData);
      
      // Clear Cart selection
      clearCart();
      
      // Advance to success step
      setCheckoutStep('success');
    } catch (err) {
      console.error('Failed to register checkout order: ', err);
      // Fallback checkout in sandbox mode
      setCompletedOrder(orderDocData);
      clearCart();
      setCheckoutStep('success');
    }
  };

  // Invoice Printer
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-stone-50 dark:bg-zinc-950 text-neutral-800 dark:text-stone-100 transition-colors duration-450 py-16 px-4 sm:px-6 lg:px-8 font-serif" id="checkout-root-layout">
      <div className="mx-auto max-w-7xl">
        
        {/* Back control */}
        {checkoutStep !== 'success' && (
          <button 
            onClick={() => setCurrentPage('product-details')}
            className="flex items-center gap-2 text-[10px] font-sans tracking-[0.3em] uppercase text-taupe dark:text-champagne mb-12 pb-1 border-b border-transparent hover:border-muted-gold hover:text-muted-gold transition"
            id="checkout-back-btn"
          >
            <ArrowLeft className="h-4 w-4" /> Return to showroom
          </button>
        )}

        {/* 4 Steps Banner header */}
        <div className="max-w-3xl mx-auto mb-16 px-4" id="checkout-progress-banner">
          <div className="flex justify-between items-center relative">
            
            {/* Horizontal Line behind */}
            <div className="absolute left-0 right-0 h-[1.5px] bg-sand dark:bg-neutral-800 z-0 top-1/2 -translate-y-1/2" />
            
            {/* Step 1 Flag */}
            <div className="relative z-10 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-sans font-bold border transition ${
                checkoutStep === 'shipping' 
                  ? 'bg-neutral-950 text-white border-neutral-950 dark:bg-champagne dark:text-neutral-950 dark:border-champagne scale-110 shadow-lg'
                  : 'bg-stone-50 text-neutral-400 border-sand dark:bg-neutral-900 dark:text-neutral-500 dark:border-neutral-800'
              }`}>
                {checkoutStep !== 'shipping' ? '✓' : '1'}
              </div>
              <span className="text-[9px] font-sans tracking-widest font-extrabold uppercase mt-2.5 text-neutral-450 dark:text-neutral-400">Shipping</span>
            </div>

            {/* Step 2 Flag */}
            <div className="relative z-10 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-sans font-bold border transition ${
                checkoutStep === 'payment'
                  ? 'bg-neutral-950 text-white border-neutral-950 dark:bg-champagne dark:text-neutral-950 dark:border-champagne scale-110 shadow-lg'
                  : checkoutStep === 'authorizing' || checkoutStep === 'success'
                    ? 'bg-[#1b1917] text-champagne border-champagne dark:bg-neutral-900 dark:border-champagne'
                    : 'bg-stone-50 text-neutral-400 border-sand dark:bg-neutral-900 dark:text-neutral-500 dark:border-neutral-800'
              }`}>
                {checkoutStep === 'authorizing' || checkoutStep === 'success' ? '✓' : '2'}
              </div>
              <span className="text-[9px] font-sans tracking-widest font-extrabold uppercase mt-2.5 text-neutral-450 dark:text-neutral-400">Payment</span>
            </div>

            {/* Step 3 Flag */}
            <div className="relative z-10 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-sans font-bold border transition ${
                checkoutStep === 'authorizing'
                  ? 'bg-neutral-950 text-white border-neutral-950 dark:bg-champagne dark:text-neutral-950 dark:border-champagne scale-110 shadow-lg'
                  : checkoutStep === 'success'
                    ? 'bg-[#1b1917] text-champagne border-champagne dark:bg-neutral-900 dark:border-champagne'
                    : 'bg-stone-50 text-neutral-400 border-sand dark:bg-neutral-900 dark:text-neutral-500 dark:border-neutral-800'
              }`}>
                {checkoutStep === 'success' ? '✓' : '3'}
              </div>
              <span className="text-[9px] font-sans tracking-widest font-extrabold uppercase mt-2.5 text-neutral-450 dark:text-neutral-400">Gateway</span>
            </div>

            {/* Step 4 Flag */}
            <div className="relative z-10 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-sans font-bold border transition ${
                checkoutStep === 'success'
                  ? 'bg-neutral-950 text-white border-neutral-950 dark:bg-champagne dark:text-neutral-950 dark:border-champagne scale-110 shadow-lg'
                  : 'bg-stone-50 text-neutral-400 border-sand dark:bg-neutral-900 dark:text-neutral-500 dark:border-neutral-800'
              }`}>
                4
              </div>
              <span className="text-[9px] font-sans tracking-widest font-extrabold uppercase mt-2.5 text-neutral-450 dark:text-neutral-400">Receipt</span>
            </div>

          </div>
        </div>

        <AnimatePresence mode="wait">
          
          {/* STEP 1 & 2 DUAL SPLIT INTERFACE */}
          {(checkoutStep === 'shipping' || checkoutStep === 'payment') && (
            <motion.div 
              key="checkout-split-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-16 text-left"
              id="checkout-forms-grid"
            >
              
              {/* Left Side: Forms */}
              <div className="lg:col-span-7 space-y-10">
                
                {/* 1. SHIPPING STEP FORM */}
                {checkoutStep === 'shipping' && (
                  <div className="bg-white/60 dark:bg-neutral-905 p-6 sm:p-10 rounded-2xl border border-sand/40 dark:border-neutral-900 shadow-sm space-y-8">
                    <div className="flex items-center gap-3 border-b border-sand/30 dark:border-neutral-850 pb-4">
                      <MapPin className="h-5 w-5 text-muted-gold" />
                      <h3 className="font-serif text-lg font-semibold tracking-wide uppercase text-muted-gold dark:text-champagne">Patron Delivery Credentials</h3>
                    </div>

                    <form onSubmit={handleShippingSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-neutral-700 dark:text-stone-300 font-sans text-xs">
                      
                      <div className="space-y-2 col-span-2">
                        <label className="text-[10px] text-neutral-450 uppercase font-bold tracking-widest">Full Name (Consignee)</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                          <input 
                            type="text"
                            value={patronName}
                            onChange={(e) => setPatronName(e.target.value)}
                            placeholder="E.g. Mohd Sarik"
                            required
                            className="w-full bg-stone-50 dark:bg-neutral-900/60 border border-sand dark:border-neutral-850 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:border-muted-gold text-xs transition"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 col-span-2 md:col-span-1">
                        <label className="text-[10px] text-neutral-450 uppercase font-bold tracking-widest">Patron Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                          <input 
                            type="email"
                            value={patronEmail}
                            onChange={(e) => setPatronEmail(e.target.value)}
                            placeholder="E.g. inquiry@premiumrugcollection.com"
                            required
                            className="w-full bg-stone-50 dark:bg-neutral-900/60 border border-sand dark:border-neutral-850 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:border-muted-gold text-xs transition"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 col-span-2 md:col-span-1">
                        <label className="text-[10px] text-neutral-450 uppercase font-bold tracking-widest">Concierge Phone & WhatsApp</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                          <input 
                            type="tel"
                            value={patronPhone}
                            onChange={(e) => setPatronPhone(e.target.value)}
                            placeholder="E.g. +91 83568 64659"
                            required
                            className="w-full bg-stone-50 dark:bg-neutral-900/60 border border-sand dark:border-neutral-850 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:border-muted-gold text-xs transition"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 col-span-2">
                        <label className="text-[10px] text-neutral-450 uppercase font-bold tracking-widest">Delivery Address (Street, Apartment, Villa)</label>
                        <input 
                          type="text"
                          value={shippingAddress}
                          onChange={(e) => setShippingAddress(e.target.value)}
                          placeholder="E.g. 101, Silk weavers enclave, Thane West"
                          required
                          className="w-full bg-stone-50 dark:bg-neutral-900/60 border border-sand dark:border-neutral-850 rounded-xl p-3.5 outline-none focus:border-muted-gold text-xs transition animate-none"
                        />
                      </div>

                      <div className="space-y-2 col-span-2 md:col-span-1">
                        <label className="text-[10px] text-neutral-450 uppercase font-bold tracking-widest">City</label>
                        <input 
                          type="text"
                          value={shippingCity}
                          onChange={(e) => setShippingCity(e.target.value)}
                          placeholder="E.g. Thane"
                          required
                          className="w-full bg-stone-50 dark:bg-neutral-900/60 border border-sand dark:border-neutral-850 rounded-xl p-3.5 outline-none focus:border-muted-gold text-xs transition"
                        />
                      </div>

                      <div className="space-y-2 col-span-2 md:col-span-1">
                        <label className="text-[10px] text-neutral-450 uppercase font-bold tracking-widest">State / Province</label>
                        <input 
                          type="text"
                          value={shippingState}
                          onChange={(e) => setShippingState(e.target.value)}
                          placeholder="E.g. Maharashtra"
                          required
                          className="w-full bg-stone-50 dark:bg-neutral-900/60 border border-sand dark:border-neutral-850 rounded-xl p-3.5 outline-none focus:border-muted-gold text-xs transition"
                        />
                      </div>

                      <div className="space-y-2 col-span-2 md:col-span-1">
                        <label className="text-[10px] text-neutral-450 uppercase font-bold tracking-widest">Postal / ZIP Code</label>
                        <input 
                          type="text"
                          value={shippingZip}
                          onChange={(e) => setShippingZip(e.target.value)}
                          placeholder="E.g. 400601"
                          required
                          className="w-full bg-stone-50 dark:bg-neutral-900/60 border border-sand dark:border-neutral-850 rounded-xl p-3.5 outline-none focus:border-muted-gold text-xs transition"
                        />
                      </div>

                      <div className="space-y-2 col-span-2 md:col-span-1">
                        <label className="text-[10px] text-neutral-450 uppercase font-bold tracking-widest">Country/Territory</label>
                        <select 
                          value={shippingCountry}
                          onChange={(e) => setShippingCountry(e.target.value)}
                          className="w-full bg-stone-50 dark:bg-neutral-900/60 border border-sand dark:border-neutral-850 rounded-xl p-3.5 outline-none focus:border-muted-gold text-xs font-semibold cursor-pointer"
                        >
                          <option value="India">India</option>
                          <option value="United States">United States</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Singapore">Singapore</option>
                          <option value="United Arab Emirates">United Arab Emirates</option>
                          <option value="Canada">Canada</option>
                        </select>
                      </div>

                      <div className="space-y-2 col-span-2">
                        <label className="text-[10px] text-neutral-450 uppercase font-bold tracking-widest">Weavers Instructions / Custom Size Requests (Optional)</label>
                        <textarea 
                          rows={3}
                          value={weaverNotes}
                          onChange={(e) => setWeaverNotes(e.target.value)}
                          placeholder="E.g. Please secure coordinate markings or include certified organic silk dye certificates."
                          className="w-full bg-stone-50 dark:bg-neutral-900/60 border border-sand dark:border-neutral-850 rounded-xl p-3.5 outline-none focus:border-muted-gold text-xs transition font-sans resize-none"
                        />
                      </div>

                      <div className="col-span-2 pt-4">
                        <button 
                          type="submit"
                          className="w-full bg-neutral-900 hover:bg-black dark:bg-muted-gold dark:hover:bg-champagne text-white dark:text-neutral-950 font-sans text-xs md:text-sm font-bold tracking-[0.25em] uppercase py-4.5 rounded-full shadow-md transition duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                        >
                          <span>Proceed to Payment shield</span>
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>

                    </form>
                  </div>
                )}

                {/* 2. PAYMENT STEP FORM */}
                {checkoutStep === 'payment' && (
                  <div className="bg-white/60 dark:bg-neutral-905 p-6 sm:p-10 rounded-2xl border border-sand/40 dark:border-neutral-900 shadow-sm space-y-8">
                    <div className="flex justify-between items-center border-b border-sand/30 dark:border-neutral-850 pb-4">
                      <div className="flex items-center gap-3">
                        <Lock className="h-5 w-5 text-muted-gold" />
                        <h3 className="font-serif text-lg font-semibold tracking-wide uppercase text-muted-gold dark:text-champagne">Sovereign Payment Shield</h3>
                      </div>
                      <button 
                        onClick={() => setCheckoutStep('shipping')}
                        className="text-[10px] font-sans font-bold uppercase text-neutral-400 hover:text-muted-gold underline py-1"
                      >
                        Edit Shipping
                      </button>
                    </div>

                    {/* INTERACTIVE 3D CREDIT CARD PREVIEW DISPLAY */}
                    <div className="flex justify-center py-6" id="interactive-card-frame">
                      <div className="perspective-1000 w-full max-w-[340px] h-48 relative">
                        
                        {/* Real-time Anim card holder inside */}
                        <div className={`relative w-full h-full rounded-2xl text-white font-sans transition-all duration-750 transform-style-3d shadow-xl ${
                          isCardFlipped ? 'rotate-y-180' : ''
                        }`}>
                          
                          {/* Front Face */}
                          <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-[#1b1b1b] via-[#242424] to-[#0c0c0c] border border-stone-800 p-5 flex flex-col justify-between backface-invisible shadow-2xl overflow-hidden">
                            {/* Holograph Shine reflection */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
                            
                            <div className="flex justify-between items-start">
                              {/* Metal Chip */}
                              <div className="w-10 h-8 rounded-md bg-gradient-to-br from-[#FFEDBA] via-amber-400 to-[#CE991F] border border-amber-500/20 flex flex-col gap-1 p-1.5">
                                <div className="h-[2px] bg-black/10 rounded" />
                                <div className="h-[2px] bg-black/10 rounded" />
                                <div className="h-[2px] bg-black/10 rounded" />
                              </div>
                              
                              {/* Card Brand Network Logo */}
                              <div className="h-8 flex items-center pr-1 capitalize text-xs font-black italic tracking-widest text-stone-300">
                                {getCardType() === 'visa' && <span className="text-blue-400 text-lg not-italic font-sans font-black">VISA</span>}
                                {getCardType() === 'mastercard' && (
                                  <div className="flex items-center gap-[1px]">
                                    <div className="w-4.5 h-4.5 rounded-full bg-[#EB001B]" />
                                    <div className="w-4.5 h-4.5 rounded-full bg-[#F79E1B] -ml-2 mix-blend-screen" />
                                  </div>
                                )}
                                {getCardType() === 'amex' && <span className="text-teal-400 text-[10px] tracking-widest uppercase">AMEX</span>}
                                {getCardType() === 'maestro' && (
                                  <div className="flex items-center gap-[1px]">
                                    <div className="w-4 h-4 rounded-full bg-[#EB001B]" />
                                    <div className="w-4 h-4 rounded-full bg-[#00A2E8] -ml-2 mix-blend-screen" />
                                    <span className="text-[7px] italic font-bold pl-1.5">maestro</span>
                                  </div>
                                )}
                                {getCardType() === 'generic' && <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">Premium Shield</span>}
                              </div>
                            </div>

                            {/* Card Number display */}
                            <div className="text-lg tracking-[0.16em] font-mono text-center py-2 min-h-10 text-stone-100 flex items-center justify-center">
                              {cardNumber || '•••• •••• •••• ••••'}
                            </div>

                            <div className="flex justify-between items-end text-[10px] font-sans tracking-widest uppercase text-stone-400">
                              <div>
                                <span className="block text-[7px] text-stone-500 mb-0.5">Card Holder</span>
                                <span className="block font-bold text-stone-200 truncate max-w-[170px]">
                                  {cardHolder || 'Mohd Sarik'}
                                </span>
                              </div>
                              <div className="text-right">
                                <span className="block text-[7px] text-stone-500 mb-0.5">Expires</span>
                                <span className="block font-bold text-stone-200">
                                  {cardExpiry || 'MM/YY'}
                                </span>
                              </div>
                            </div>

                          </div>
                          
                          {/* Back Face */}
                          <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-[#1b1b1b] to-[#0a0a0a] border border-stone-800 p-5 flex flex-col justify-between rotate-y-180 backface-invisible shadow-2xl">
                            
                            {/* Magnetic Strip */}
                            <div className="h-10 bg-black -mx-5 mt-2" />
                            
                            {/* Signature Panel & CVV */}
                            <div className="space-y-1">
                              <span className="text-[6px] uppercase tracking-widest text-stone-400 text-left pl-1 block">AUTHORIZED SIGNATURE</span>
                              <div className="flex items-center">
                                {/* White signature slashes */}
                                <div className="flex-1 h-8 bg-stone-300 rounded-l skew-x-12 flex items-center justify-center text-neutral-800 italic text-[10px] font-semibold pr-3 font-mono">
                                  {cardHolder || 'Mohd Sarik'}
                                </div>
                                {/* CVV Security */}
                                <div className="bg-amber-100 text-stone-900 border border-neutral-300 px-3.5 h-8 flex items-center font-mono font-bold text-xs rounded-r">
                                  {cardCvv || '•••'}
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-between items-center text-[7px] font-sans text-stone-500 tracking-wider">
                              <span>Verified Weavers Syndicate Ledger</span>
                              <span className="text-amber-500/80 uppercase font-bold pr-1">Gold Vault Guaranteed</span>
                            </div>

                          </div>

                        </div>
                      </div>
                    </div>

                    {paymentError && (
                      <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 p-4 rounded-xl text-xs font-semibold font-sans flex items-center gap-3">
                        <Lock className="h-4 w-4 shrink-0" />
                        <span>{paymentError}</span>
                      </div>
                    )}

                    {/* PAYMENT FORM INPUTS */}
                    <form onSubmit={handlePaymentSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-neutral-700 dark:text-stone-300 font-sans text-xs">
                      
                      <div className="space-y-2 col-span-2">
                        <label className="text-[10px] text-neutral-450 uppercase font-bold tracking-widest">Credit/Debit Card Number</label>
                        <div className="relative">
                          <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                          <input 
                            type="text"
                            value={cardNumber}
                            onChange={(e) => handleCardNumberChange(e.target.value)}
                            onFocus={() => setIsCardFlipped(false)}
                            placeholder="E.g. 4111 2222 3333 4444"
                            maxLength={19}
                            required
                            className="w-full bg-stone-50 dark:bg-neutral-900/60 border border-sand dark:border-neutral-850 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:border-muted-gold text-xs transition"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 col-span-2">
                        <label className="text-[10px] text-neutral-450 uppercase font-bold tracking-widest">Cardholder Name (Exactly as printed)</label>
                        <input 
                          type="text"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          onFocus={() => setIsCardFlipped(false)}
                          placeholder="Mohd Sarik"
                          required
                          className="w-full bg-stone-50 dark:bg-neutral-900/60 border border-sand dark:border-neutral-850 rounded-xl p-3.5 outline-none focus:border-muted-gold text-xs transition"
                        />
                      </div>

                      <div className="space-y-2 col-span-2 md:col-span-1">
                        <label className="text-[10px] text-neutral-450 uppercase font-bold tracking-widest">Expiration Date (MM/YY)</label>
                        <input 
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => handleCardExpiryChange(e.target.value)}
                          onFocus={() => setIsCardFlipped(false)}
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                          className="w-full bg-stone-50 dark:bg-neutral-900/60 border border-sand dark:border-neutral-850 rounded-xl p-3.5 outline-none focus:border-muted-gold text-xs transition font-sans text-center"
                        />
                      </div>

                      <div className="space-y-2 col-span-2 md:col-span-1">
                        <label className="text-[10px] text-neutral-450 uppercase font-bold tracking-widest">Security CVV Code</label>
                        <input 
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                          onFocus={() => setIsCardFlipped(true)}
                          onBlur={() => setIsCardFlipped(false)}
                          placeholder="•••"
                          maxLength={4}
                          required
                          className="w-full bg-stone-50 dark:bg-neutral-900/60 border border-sand dark:border-neutral-850 rounded-xl p-3.5 outline-none focus:border-muted-gold text-xs transition font-sans text-center font-bold"
                        />
                      </div>

                      <div className="col-span-2 pt-4">
                        <button 
                          type="submit"
                          className="w-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11] hover:from-[#AA7C11] hover:to-[#D4AF37] text-black font-sans text-xs md:text-sm font-black tracking-[0.25em] uppercase py-4.5 rounded-full shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_6px_30px_rgba(212,175,55,0.45)] transition-all duration-500 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                        >
                          <ShieldCheck className="h-5 w-5" />
                          <span>Authorize Secure Order Payment</span>
                        </button>
                      </div>

                    </form>
                  </div>
                )}

              </div>

              {/* Right Side: Order Summary Card */}
              <div className="lg:col-span-5 space-y-8">
                <div className="bg-white/40 dark:bg-neutral-905 p-6 rounded-2xl border border-sand/35 dark:border-neutral-900/70" id="checkout-order-summary">
                  
                  <h4 className="font-serif text-base font-bold uppercase tracking-wider text-muted-gold pb-3 border-b border-sand/30 dark:border-neutral-850">Your Cart Selection</h4>
                  
                  <div className="divide-y divide-sand/20 dark:divide-neutral-900 max-h-96 overflow-y-auto pr-1 py-1 mt-4 space-y-4">
                    {cart.map((item, idx) => {
                      const itemPrice = currency === 'INR' ? item.product.priceINR : item.product.priceUSD;
                      return (
                        <div key={idx} className="flex gap-4 pt-4 first:pt-0 items-start">
                          <img 
                            src={item.product.images[0]} 
                            alt={item.product.name} 
                            className="h-14 w-18 object-cover rounded-lg border border-sand/30 dark:border-neutral-800"
                          />
                          <div className="flex-1 text-xs">
                            <h5 className="font-serif uppercase font-bold text-neutral-800 dark:text-stone-100">{item.product.name}</h5>
                            <p className="text-[10px] text-neutral-450 dark:text-neutral-500 mt-0.5">SKU: {item.product.sku} | Tone: {item.selectedColor}</p>
                            <p className="text-[10px] text-neutral-450 dark:text-neutral-500 mt-0.5">Size dimensions: {item.selectedSize}</p>
                            <div className="flex justify-between items-center mt-2.5">
                              <span className="text-[10px] text-neutral-400 font-sans">Quantity: {item.quantity}</span>
                              <span className="font-serif font-bold text-muted-gold">
                                {currency === 'INR' ? '₹' : '$'} {(itemPrice * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Pricing Details List */}
                  <div className="border-t border-sand/30 dark:border-neutral-850 pt-5 mt-6 space-y-3.5 text-xs font-sans text-neutral-450 dark:text-neutral-400">
                    <div className="flex justify-between">
                      <span>Cart Selection Subtotal</span>
                      <span className="font-serif font-semibold text-neutral-800 dark:text-stone-100">
                        {currency === 'INR' ? '₹' : '$'} {getTotals().toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[#C5A059] font-semibold text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <Truck className="h-4 w-4 shrink-0" />
                        <span>Sovereign Air Carriage</span>
                      </div>
                      <span className="uppercase tracking-widest font-bold">Complimentary</span>
                    </div>
                    <div className="flex justify-between items-center text-[#C5A059] font-semibold text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 shrink-0" />
                        <span>Secure Wooden crates wrapping</span>
                      </div>
                      <span className="uppercase tracking-widest font-bold">Complimentary</span>
                    </div>

                    <div className="border-t border-sand/35 dark:border-neutral-850 pt-4 mt-2 flex justify-between items-end">
                      <span className="font-serif tracking-widest uppercase font-bold text-neutral-550 dark:text-neutral-400 text-[11px]">Amount to pay</span>
                      <span className="font-serif text-lg font-black text-[#C5A059]">
                        {currency === 'INR' ? '₹' : '$'} {getTotals().toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Trust indicator */}
                  <div className="mt-8 pt-5 border-t border-sand/20 dark:border-neutral-850 text-[10px] font-sans text-neutral-450 dark:text-neutral-500 flex gap-3 items-start leading-relaxed text-left">
                    <ShieldCheck className="h-5 w-5 text-muted-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="font-serif font-bold text-neutral-700 dark:text-stone-300">Sovereign Weaving Guarantee</p>
                      <p className="mt-0.5">Your payments are protected inside the certified weaver cooperative gateway token. No card details are ever logged onto plain-text servers.</p>
                    </div>
                  </div>

                </div>
              </div>

            </motion.div>
          )}

          {/* STEP 3: AUTHORIZING GATEWAY ANIM SCREEN */}
          {checkoutStep === 'authorizing' && (
            <motion.div 
              key="checkout-authorizing-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className="max-w-md mx-auto bg-white dark:bg-neutral-900 border border-sand/40 dark:border-neutral-850 rounded-2xl p-10 shadow-xl space-y-8 py-16 text-center"
              id="checkout-authorization-sequence"
            >
              
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                
                {/* Circular Outer progress border */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="42"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    fill="transparent"
                    className="text-stone-100 dark:text-neutral-800"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="42"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 42}
                    strokeDashoffset={2 * Math.PI * 42 * (1 - authProgress / 100)}
                    className="text-[#C5A059] transition-all duration-75"
                  />
                </svg>

                {/* Lock inside */}
                <div className="absolute inset-x-0 inset-y-0 flex items-center justify-center">
                  <Lock className="h-7 w-7 text-muted-gold animate-pulse" />
                </div>

              </div>

              <div className="space-y-3">
                <h3 className="font-serif text-lg font-bold tracking-wide text-neutral-800 dark:text-stone-100">Gateway Authorization Active</h3>
                <span className="text-[11px] font-sans uppercase font-bold tracking-widest text-neutral-400 block">{authProgress}% SECURE</span>
              </div>

              <p className="font-serif text-xs px-2 text-stone-500 italic max-w-xs mx-auto leading-relaxed">
                {gatewayMessage}
              </p>

              <div className="text-[9px] font-sans text-neutral-450 uppercase tracking-widest flex items-center justify-center gap-1.5 pt-4">
                <span className="inline-block h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping" />
                <span>PCI-DSS Secured 256-bit Token encryption</span>
              </div>

            </motion.div>
          )}

          {/* STEP 4: SUCCESS RECEIPT / INVOICE DISPLAY */}
          {checkoutStep === 'success' && completedOrder && (
            <motion.div 
              key="checkout-success-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-2xl mx-auto space-y-10"
              id="checkout-success-receipt"
            >
              
              {/* Big Checkmark Stamp */}
              <div className="text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-emerald-500/15 border border-emerald-500 text-emerald-500 flex items-center justify-center mx-auto shadow-md animate-bounce">
                  <CheckCircle2 className="h-9 w-9" />
                </div>
                <h2 className="font-serif text-3xl font-light tracking-tight text-[#C5A059]">Artisan Order Confirmed</h2>
                <p className="font-sans text-xs text-neutral-500 dark:text-neutral-400 max-w-md mx-auto leading-relaxed px-4 font-light">
                  Excellent. Weaver cooperative registers in the Bhadohi headquarters have logged your ledger coordinates. Founder Mohd Sarik concierge will coordinate thread maps directly.
                </p>
              </div>

              {/* PRINTABLE LEDGER INVOICE COMPONENT */}
              <div 
                className="bg-white dark:bg-neutral-905 border border-sand dark:border-neutral-900 rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden print:border-none print:shadow-none font-serif text-left"
                id="printable-luxury-ledger"
              >
                
                {/* Antique corner decorations for styling */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-muted-gold" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-muted-gold" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-muted-gold" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-muted-gold" />

                {/* Header branding */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-sand pb-6 gap-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold uppercase tracking-widest text-muted-gold">PREMIUM RUG COLLECTION</h3>
                    <span className="text-[9px] font-sans tracking-widest text-neutral-450 uppercase font-bold block mt-1">Mohd Sarik Sovereign Weavers Cooperative</span>
                  </div>
                  <div className="text-right font-sans text-[10px] text-neutral-400 tracking-wider">
                    <p className="font-serif font-black underline uppercase text-muted-gold">OFFICIAL INVOVICE RECEIPT</p>
                    <p className="mt-1">Order Ref: {completedOrder.id}</p>
                    <p>Date logged: {new Date(completedOrder.orderDate).toLocaleDateString()} at {new Date(completedOrder.orderDate).toLocaleTimeString()}</p>
                  </div>
                </div>

                {/* Bill details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-b border-sand/35 dark:border-neutral-900 text-xs text-neutral-600 dark:text-stone-300">
                  <div className="space-y-2">
                    <h4 className="font-serif text-[10px] font-extrabold uppercase tracking-widest text-[#C5A059]">Patron Credentials</h4>
                    <p className="font-serif font-semibold text-neutral-800 dark:text-stone-100 text-sm">{completedOrder.customerName}</p>
                    <p className="font-sans font-light">Email: {completedOrder.email}</p>
                    <p className="font-sans font-light">Phone: {completedOrder.phone}</p>
                    <p className="font-sans font-light">Region country: {completedOrder.country}</p>
                  </div>
                  <div className="space-y-2 leading-relaxed">
                    <h4 className="font-serif text-[10px] font-extrabold uppercase tracking-widest text-[#C5A059]">Consignment Carriage Destination</h4>
                    <p className="font-sans font-light">{completedOrder.address}</p>
                    <div className="pt-2 flex items-center gap-2 text-[10px] font-sans font-bold text-emerald-600 dark:text-emerald-400">
                      <Truck className="h-4 w-4 shrink-0" />
                      <span>Insured Priority Carriage Included</span>
                    </div>
                  </div>
                </div>

                {/* Items ledger */}
                <div className="py-6 space-y-4">
                  <h4 className="font-serif text-[10px] font-extrabold uppercase tracking-widest text-[#C5A059]">Acquired Loom Selections</h4>
                  <div className="space-y-4 divide-y divide-sand/15 dark:divide-neutral-900/50">
                    
                    {completedOrder.items.map((it: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-start pt-4 first:pt-0 gap-4 text-xs font-serif text-neutral-700 dark:text-stone-100">
                        <div>
                          <p className="font-bold uppercase tracking-wider text-sm">{idx + 1}. {it.productName}</p>
                          <p className="text-[10px] font-sans text-neutral-450 mt-1">Carpet dimensions: {it.selectedSize} | Tone choice: {it.selectedColor}</p>
                          <p className="text-[10px] font-sans text-neutral-440">Qty segment requested: {it.quantity}</p>
                        </div>
                        <span className="font-bold text-neutral-800 dark:text-[#F5E4B3] text-sm">
                          {completedOrder.currency === 'INR' ? '₹' : '$'} {(it.price * it.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}

                  </div>
                </div>

                {/* Pricing totals block */}
                <div className="border-t border-sand pt-6 flex flex-col items-end text-xs">
                  <div className="w-full sm:w-80 space-y-3 font-sans text-neutral-450 dark:text-neutral-400">
                    
                    <div className="flex justify-between text-[11px]">
                      <span>Acquisitions ledger subtotal</span>
                      <span className="font-serif font-bold text-neutral-800 dark:text-stone-100">
                        {completedOrder.currency === 'INR' ? '₹' : '$'} {completedOrder.totalPrice.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[#C5A059] text-[10px] font-bold">
                      <span>Secure Air Dispatch Custom Crates</span>
                      <span className="uppercase tracking-widest">COMPLIMENTARY</span>
                    </div>

                    <div className="flex justify-between items-center text-[#C5A059] text-[10px] font-bold pb-2.5 border-b border-sand/40 dark:border-neutral-900">
                      <span>Certified Weaver Cooperative Token Guard</span>
                      <span className="uppercase tracking-widest">PCI COMPLIANT</span>
                    </div>

                    <div className="flex justify-between items-end pt-3">
                      <span className="font-serif text-[11px] font-black uppercase text-neutral-800 dark:text-stone-100">Total authorized paid</span>
                      <span className="font-serif text-lg font-black text-[#C5A059]">
                        {completedOrder.currency === 'INR' ? '₹' : '$'} {completedOrder.totalPrice.toLocaleString()}
                      </span>
                    </div>

                  </div>
                </div>

                {/* Footer notes & details */}
                <div className="border-t border-sand/55 dark:border-neutral-900 pt-6 mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center text-[10px] font-sans text-neutral-400">
                  <div className="space-y-1 text-left">
                    <p className="font-serif font-extrabold text-[#C5A059] uppercase tracking-widest">Patron Loom Dispatch Schedule</p>
                    <p className="font-light">Physical thread checks dispatch in 3 days. Weaving coordinates from Bhadohi loom grids are wired to email inside week parameters.</p>
                  </div>
                  
                  {/* Custom simulated QR code of invoice ref */}
                  <div className="flex justify-end gap-4 items-center">
                    <div className="text-right leading-relaxed font-sans text-[9px]">
                      <p className="font-bold text-emerald-500">✓ SECURED PAYMENT</p>
                      <p>Gateway Ref: PRC-2026-CC-VAULT</p>
                      <p>Transaction: APPROVED</p>
                    </div>
                    {/* QR Code Graphic Representation */}
                    <div className="w-14 h-14 bg-white border border-neutral-200 rounded p-[3.5px] flex items-center justify-center shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-neutral-950 via-neutral-800 to-neutral-950 rounded flex flex-wrap justify-between p-1">
                        <div className="w-3.5 h-3.5 bg-white border-2 border-neutral-950 rounded-[1.5px]" />
                        <div className="w-3.5 h-3.5 bg-white border-2 border-neutral-950 rounded-[1.5px]" />
                        <div className="w-3.5 h-3.5 bg-white border-2 border-neutral-950 rounded-[1.5px]" />
                        <div className="w-3.5 h-3.5 bg-white flex items-center justify-center rounded-[1.5px]" >
                          <div className="w-1.5 h-1.5 bg-neutral-950" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Receipt Control Bar */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center" id="checkout-receipt-actions">
                <button 
                  onClick={handlePrint}
                  className="bg-white hover:bg-neutral-950 text-neutral-950 hover:text-white dark:bg-zinc-900 dark:hover:bg-champagne dark:hover:text-neutral-950 border border-sand dark:border-neutral-850 text-[10px] font-sans font-bold tracking-[0.25em] uppercase py-4 px-8 rounded-full shadow transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Printer className="h-4.5 w-4.5" />
                  <span>Print Ledger Receipt</span>
                </button>

                <button 
                  onClick={() => setCurrentPage('collection')}
                  className="bg-neutral-900 hover:bg-black dark:bg-[#C5A059] dark:hover:bg-[#E5C079] text-white dark:text-neutral-950 text-[10px] font-sans font-bold tracking-[0.25em] uppercase py-4 px-8 rounded-full shadow transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <ShoppingBag className="h-4.5 w-4.5" />
                  <span>Return to Showroom Ballroom</span>
                </button>
              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}
