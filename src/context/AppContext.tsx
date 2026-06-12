import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  where,
  increment,
  getDocFromServer
} from 'firebase/firestore';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import { db, auth, handleFirestoreError, OperationType } from '../firebase';
import { 
  Product, 
  Category, 
  Order, 
  CustomerReview, 
  CustomerInquiry, 
  CustomRugRequest, 
  NewsletterSubscriber, 
  WebsiteSetting, 
  AdminUser, 
  WebsiteVisitorLog,
  ShowcaseProject
} from '../types';
import { 
  INITIAL_CATEGORIES, 
  INITIAL_PRODUCTS, 
  INITIAL_REVIEWS, 
  GLOBAL_SETTING_DEFAULT,
  SHOWCASE_PROJECTS
} from '../data/seedData';

interface AppContextType {
  // Navigation & Theme
  currentPage: string;
  setCurrentPage: (page: string) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  adminSubTab: string;
  setAdminSubTab: (tab: string) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;

  // Currency & Location
  currency: 'INR' | 'USD';
  setCurrency: (currency: 'INR' | 'USD') => void;
  detectedCountry: string;
  setDetectedCountry: (country: string) => void;

  // Real-time Data
  products: Product[];
  categories: Category[];
  reviews: CustomerReview[];
  settings: WebsiteSetting;
  
  // Real-time Admin Records (Protected)
  inquiries: CustomerInquiry[];
  customRequests: CustomRugRequest[];
  orders: Order[];
  subscribers: NewsletterSubscriber[];
  adminUsers: AdminUser[];
  visitorLogs: WebsiteVisitorLog[];

  // Cart Storage (Quick patron inquiries checkout)
  cart: { product: Product; quantity: number; selectedSize: string; selectedColor: string }[];
  addToCart: (product: Product, quantity: number, size: string, color: string) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;

  // Form Submissions
  submitInquiry: (name: string, phone: string, email: string, country: string, source: string, msg: string, productInterest?: string) => Promise<void>;
  submitCustomRugRequest: (req: Omit<CustomRugRequest, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  submitReview: (name: string, rating: number, comment: string, location: string) => Promise<void>;
  submitNewsletter: (email: string) => Promise<boolean>;
  submitOrderEstimate: (name: string, phone: string, email: string, country: string, address: string, notes: string) => Promise<void>;

  // Authentication & Role
  currentUser: User | null;
  isAdminUser: boolean;
  adminProfile: AdminUser | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  mockAdminLogin: (email: string) => Promise<void>; // Developer bypass for easy playground checks

  // Admin Management Actions
  addProduct: (p: Omit<Product, 'id' | 'createdAt'>) => Promise<void>;
  editProduct: (id: string, p: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateInquiryStatus: (id: string, status: CustomerInquiry['status'], notes?: string) => Promise<void>;
  updateCustomRequestStatus: (id: string, status: CustomRugRequest['status'], notes?: string) => Promise<void>;
  updateOrderStatus: (id: string, status: Order['orderStatus'], trackingNumber?: string) => Promise<void>;
  updateReviewStatus: (id: string, status: CustomerReview['status']) => Promise<void>;
  updateGlobalSettings: (s: Partial<WebsiteSetting>) => Promise<void>;
  
  // Custom Admin Page Compatibility Helpers
  loginAdminUser: (email: string, pass: string) => Promise<boolean>;
  logoutAdmin: () => void;
  customRugRequests: CustomRugRequest[];
  newsletterSubscribers: NewsletterSubscriber[];
  updateCustomRugStatus: (id: string, status: CustomRugRequest['status'], notes?: string) => Promise<void>;
  approveClientReview: (id: string) => Promise<void>;
  deleteClientReview: (id: string) => Promise<void>;
  createOrUpdateProduct: (prod: Partial<Product>) => Promise<void>;
  deleteProductById: (id: string) => Promise<void>;

  // Showcase projects
  showcaseProjects: ShowcaseProject[];
  addShowcaseProject: (p: Omit<ShowcaseProject, 'id' | 'createdAt'>) => Promise<void>;
  editShowcaseProject: (id: string, p: Partial<ShowcaseProject>) => Promise<void>;
  deleteShowcaseProject: (id: string) => Promise<void>;

  // Seed functions
  seedDatabase: () => Promise<void>;
  isDbSeeded: boolean;
  isFirebaseLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Navigation & Theme
  const [currentPage, setCurrentPageUi] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [adminSubTab, setAdminSubTab] = useState<string>('overview');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Currency & Location
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [detectedCountry, setDetectedCountry] = useState<string>('India');

  // Datasets (Defaulted with local SeedData as reactive failover)
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [reviews, setReviews] = useState<CustomerReview[]>(INITIAL_REVIEWS);
  const [settings, setSettings] = useState<WebsiteSetting>(GLOBAL_SETTING_DEFAULT);
  
  // Showcase projects state
  const [showcaseProjects, setShowcaseProjects] = useState<ShowcaseProject[]>(
    SHOWCASE_PROJECTS.map((proj, i) => ({
      id: `showcase-00${i+1}`,
      title: proj.title,
      category: proj.category,
      image: proj.image,
      description: proj.description,
      createdAt: new Date().toISOString()
    }))
  );

  // Admin datasets (Empty for visitors, bound dynamically when admin signs in)
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([]);
  const [customRequests, setCustomRequests] = useState<CustomRugRequest[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [visitorLogs, setVisitorLogs] = useState<WebsiteVisitorLog[]>([]);

  // Cart
  const [cart, setCart] = useState<{ product: Product; quantity: number; selectedSize: string; selectedColor: string }[]>([]);

  // Authentication
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdminUser, setIsAdminUser] = useState<boolean>(false);
  const [adminProfile, setAdminProfile] = useState<AdminUser | null>(null);
  const [isFirebaseLoading, setIsFirebaseLoading] = useState<boolean>(true);
  const [isDbSeeded, setIsDbSeeded] = useState<boolean>(false);

  const isSandboxMode = isAdminUser && (!currentUser || currentUser.uid === 'mock_admin_uid');

  // Synchronize dynamic URL page navigation for robust SEO back-buttons
  const setCurrentPage = (page: string) => {
    setCurrentPageUi(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const params = new URLSearchParams(window.location.search);
    params.set('page', page);
    if (page !== 'product-details') {
      params.delete('id');
    }
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  // 1. Initial Browser URL Detection & Tracking Setup
  useEffect(() => {
    // Detect page from URL query
    const params = new URLSearchParams(window.location.search);
    const urlPage = params.get('page');
    const urlId = params.get('id');
    if (urlPage) {
      setCurrentPageUi(urlPage);
      if (urlPage === 'product-details' && urlId) {
        setSelectedProductId(urlId);
      }
    }

    // Auto-detect visitor location / currency based on time zone
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz && (tz.includes('Calcutta') || tz.includes('Kolkata') || tz.includes('Asia/Kolkata') || tz.includes('India'))) {
        setCurrency('INR');
        setDetectedCountry('India');
      } else {
        setCurrency('USD');
        setDetectedCountry('United States');
      }
    } catch (e) {
      console.warn("Location detection unavailable, defaulted to India.", e);
    }

    // Load theme from localStorage
    const savedTheme = localStorage.getItem('prc_theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
    }

    // Increment anonymous local visit logger & write aggregate database visitor log
    try {
      const todayString = new Date().toISOString().split('T')[0];
      const storedVisits = localStorage.getItem('prc_visits');
      let visits = storedVisits ? JSON.parse(storedVisits) : { count: 0, lastVisit: '' };
      
      if (visits.lastVisit !== todayString) {
        visits.count += 1;
        visits.lastVisit = todayString;
        localStorage.setItem('prc_visits', JSON.stringify(visits));

        // Increment aggregate counter in Firestore
        const visitorDocRef = doc(db, 'website_visitors', todayString);
        setDoc(visitorDocRef, {
          date: todayString,
          count: increment(1),
          whatsappInquiries: increment(0)
        }, { merge: true }).catch(() => {});
      }
    } catch (err) {
      console.warn("Visitor analytics tracking offline.", err);
    }
  }, []);

  // Sync theme changes to HTML element class list for Tailwind v4 compatibility
  useEffect(() => {
    localStorage.setItem('prc_theme', theme);
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Handle Firebase connection validation
  useEffect(() => {
    async function validateAndListen() {
      try {
        await getDocFromServer(doc(db, 'test_con', 'status')).catch(() => {});
      } catch (e) {
        console.warn("Active Cloud connection pending. Working in luxury offline-sync buffer.");
      }
    }
    validateAndListen();
  }, []);

  // 2. Real-time Listeners for Public Collections (Products, Categories, Settings, Approved Reviews)
  useEffect(() => {
    setIsFirebaseLoading(true);

    const sanitizeUrl = (url: string | undefined): string => {
      if (!url) return '';
      const REPLACEMENTS: Record<string, string> = {
        "photo-1594498259853-6444d3e71c15": "photo-1600607687939-ce8a6c25118c",
        "photo-1590490360182-c33d57733427": "photo-1616486338812-3dadae4b4ace",
        "photo-1613490493576-7fde63acd811": "photo-1618219908412-a29a1bb7b86e",
        "photo-1628592102751-ba83b02d42d6": "photo-1583847268964-b28dc8f51f92",
        "photo-1575414003591-ece8d0416c7a": "photo-1586023492125-27b2c045efd7",
        "photo-1535043934128-cf0b28d52f95": "photo-1600607687939-ce8a6c25118c",
        "photo-1518156677180-95a2893f3e9f": "photo-1513694203232-719a280e022f",
        "photo-1562540000-7190aec4c22b": "photo-1586023492125-27b2c045efd7"
      };

      for (const [badId, goodId] of Object.entries(REPLACEMENTS)) {
        if (url.includes(badId)) {
          return url.replace(badId, goodId);
        }
      }
      return url;
    };

    // Watch website settings
    const settingsSub = onSnapshot(doc(db, 'website_settings', 'default_config'), (snapshot) => {
      if (snapshot.exists()) {
        const rawSettings = snapshot.data() as WebsiteSetting;
        if (rawSettings.homepageImages) {
          const sanitizedImages: Record<string, string> = {};
          for (const [k, v] of Object.entries(rawSettings.homepageImages)) {
            sanitizedImages[k] = sanitizeUrl(v);
          }
          rawSettings.homepageImages = sanitizedImages;
        }
        setSettings(rawSettings);
      }
    }, (error) => {
      console.warn("Using offline brand definitions. Error: ", error.message);
    });

    // Watch categories
    const categoriesSub = onSnapshot(collection(db, 'categories'), (snapshot) => {
      if (!snapshot.empty) {
        const list: Category[] = [];
        snapshot.forEach(doc => {
          const cat = doc.data() as Category;
          if (cat.image) {
            cat.image = sanitizeUrl(cat.image);
          }
          list.push(cat);
        });
        setCategories(list);
      }
    }, (error) => {
      console.warn("Categories fetching offline feed. Status: fallback ready. Error:", error.message);
    });

    // Watch products
    const productsSub = onSnapshot(collection(db, 'products'), (snapshot) => {
      if (!snapshot.empty) {
        const list: Product[] = [];
        snapshot.forEach(doc => {
          const prod = doc.data() as Product;
          if (prod.images) {
            prod.images = prod.images.map(img => sanitizeUrl(img));
          }
          list.push(prod);
        });
        // Sort products by date
        list.sort((a,b) => b.createdAt.localeCompare(a.createdAt));
        setProducts(list);
        setIsDbSeeded(true);
      } else {
        setIsDbSeeded(false);
      }
      setIsFirebaseLoading(false);
    }, (error) => {
      console.warn("Products fetching offline feed. Status: fallback ready. Error:", error.message);
      setIsDbSeeded(false);
      setIsFirebaseLoading(false);
    });

    // Watch approved reviews
    const reviewsQuery = query(collection(db, 'customer_reviews'), where('status', '==', 'approved'));
    const reviewsSub = onSnapshot(reviewsQuery, (snapshot) => {
      if (!snapshot.empty) {
        const list: CustomerReview[] = [];
        snapshot.forEach(doc => list.push(doc.data() as CustomerReview));
        setReviews(list);
      }
    }, (error) => {
      console.warn("Reviews fetching offline feed. Status: fallback ready. Error:", error.message);
    });

    // Watch showcase projects
    const showcaseSub = onSnapshot(collection(db, 'showcase_projects'), (snapshot) => {
      if (!snapshot.empty) {
        const list: ShowcaseProject[] = [];
        snapshot.forEach(doc => {
          const proj = doc.data() as ShowcaseProject;
          if (proj.image) {
            proj.image = sanitizeUrl(proj.image);
          }
          list.push(proj);
        });
        setShowcaseProjects(list);
      }
    }, (error) => {
      console.warn("Showcase projects fetching offline feed. Status: fallback ready. Error:", error.message);
    });

    return () => {
      settingsSub();
      categoriesSub();
      productsSub();
      reviewsSub();
      showcaseSub();
    };
  }, []);

  // 3. User Auth & Role Synchronization
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, async (user: User | null) => {
      setCurrentUser(user);
      if (user) {
        const userEmail = user.email || '';
        
        // Bootstrapped master checker
        if (userEmail === 'ssuoshri@gmail.com') {
          setIsAdminUser(true);
          setAdminProfile({
            email: userEmail,
            role: 'Super Admin',
            name: user.displayName || 'Mohd Sarik'
          });
        } else {
          // Check admin collection
          try {
            const adminDoc = await getDoc(doc(db, 'admin_users', userEmail));
            if (adminDoc.exists()) {
              setIsAdminUser(true);
              setAdminProfile(adminDoc.data() as AdminUser);
            } else {
              setIsAdminUser(false);
              setAdminProfile(null);
            }
          } catch (e) {
            console.error("Privilege check failed: ", e);
            setIsAdminUser(false);
            setAdminProfile(null);
          }
        }
      } else {
        setIsAdminUser(false);
        setAdminProfile(null);
      }
    });
    return unsubAuth;
  }, []);

  // 4. Real-time Admin Data Sync (Only if isAdminUser is true)
  useEffect(() => {
    if (!isAdminUser) {
      // Clear admin datasets when logged out
      setInquiries([]);
      setCustomRequests([]);
      setOrders([]);
      setSubscribers([]);
      setAdminUsers([]);
      setVisitorLogs([]);
      return;
    }

    if (isSandboxMode) {
      // --- LOAD SANDBOX SESSIONS FROM LOCALSTORAGE OR HIGH-FIDELITY DEFAULT SEED VALUES ---
      
      // 1. Inquiries
      const savedInq = localStorage.getItem('sandbox_inquiries');
      if (savedInq) {
        setInquiries(JSON.parse(savedInq));
      } else {
        const defaultInq = [
          {
            id: "inq-001",
            name: "Ananya Sharma",
            phone: "+91 83568 64659",
            email: "ananya.sharma@example.com",
            country: "India",
            source: "Website Product Inquiry",
            productInterest: "Aurelia Gold Silk Weave",
            message: "Interested in a customized size of Aurelia Gold Silk Weave for our duplex in Bandra.",
            createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
            status: "new"
          },
          {
            id: "inq-002",
            name: "David K.",
            phone: "+1 415 555 2671",
            email: "david.k@example.net",
            country: "United States",
            source: "Showroom Inquiry",
            productInterest: "Emperor's Obsidian Mandala",
            message: "Can we have this shipped to California? Is there any local custom duties fee?",
            createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
            status: "contacted",
            notes: "Sent quote via email on air cargo shipping."
          }
        ];
        setInquiries(defaultInq);
        localStorage.setItem('sandbox_inquiries', JSON.stringify(defaultInq));
      }

      // 2. Custom rug requests
      const savedCust = localStorage.getItem('sandbox_custom_requests');
      if (savedCust) {
        setCustomRequests(JSON.parse(savedCust));
      } else {
        const defaultCust = [
          {
            id: "req-001",
            name: "Vikram Malhotra",
            phone: "+91 91234 56789",
            email: "vikram.malhotra@yahoo.com",
            country: "India",
            desiredSize: "10x14 ft",
            desiredColor: "Emerald Green & Champagne Gold",
            desiredShape: "Rectangular",
            projectDetails: "Want raised silk patterns for the emerald color wash backdrop.",
            createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
            status: "pending"
          },
          {
            id: "req-002",
            name: "Elena Rostova",
            phone: "+1 646 555 9012",
            email: "elena.r@luxuryinteriors.com",
            country: "United States",
            desiredSize: "Circular 12ft",
            desiredColor: "Sand Dunes Beige & Off-white",
            desiredShape: "Circular",
            projectDetails: "Textured shag rug similar to Marrakesh, but in custom beige tones.",
            createdAt: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
            status: "design_phase",
            notes: "Artisans in Bhadohi are currently working on physical loop sample."
          }
        ];
        setCustomRequests(defaultCust);
        localStorage.setItem('sandbox_custom_requests', JSON.stringify(defaultCust));
      }

      // 3. Orders/Estimates
      const savedOrd = localStorage.getItem('sandbox_orders');
      if (savedOrd) {
        setOrders(JSON.parse(savedOrd));
      } else {
        const defaultOrd = [
          {
            id: "ord-001",
            customerName: "Sanjay Singhania",
            phone: "+91 99887 76655",
            email: "sanjay@singhania.co",
            country: "India",
            address: "Flat 42B, Oberoi Towers, Worli, Mumbai - 400018",
            orderStatus: "processed",
            paymentStatus: "paid",
            orderDate: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
            totalPrice: 145000,
            currency: "INR",
            items: [
              {
                productId: "prc-001",
                productName: "Aurelia Gold Silk Weave",
                quantity: 1,
                selectedSize: "6x9 ft (180x270 cm)",
                selectedColor: "Gold & Ivory",
                price: 145000
              }
            ]
          },
          {
            id: "ord-002",
            customerName: "Charles Dupont",
            phone: "+1 202 555 0143",
            email: "charles.dupont@embassy.org",
            country: "United States",
            address: "3100 Massachusetts Ave NW, Washington, DC 20008",
            orderStatus: "pending",
            paymentStatus: "pending",
            orderDate: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
            totalPrice: 1100,
            currency: "USD",
            items: [
              {
                productId: "prc-002",
                productName: "Emperor's Obsidian Mandala",
                quantity: 1,
                selectedSize: "5x8 ft (150x240 cm)",
                selectedColor: "Obsidian Black & Gold",
                price: 1100
              }
            ]
          }
        ];
        setOrders(defaultOrd);
        localStorage.setItem('sandbox_orders', JSON.stringify(defaultOrd));
      }

      // 4. Newsletter Subscribers Roster
      const savedSubs = localStorage.getItem('sandbox_subscribers');
      if (savedSubs) {
        setSubscribers(JSON.parse(savedSubs));
      } else {
        const defaultSubs = [
          { email: "patron1@example.com", subscribedAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString() },
          { email: "designer@mumbaiinteriors.in", subscribedAt: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString() }
        ];
        setSubscribers(defaultSubs);
        localStorage.setItem('sandbox_subscribers', JSON.stringify(defaultSubs));
      }

      // 5. Admin Users List
      const savedAdms = localStorage.getItem('sandbox_admin_users');
      if (savedAdms) {
        setAdminUsers(JSON.parse(savedAdms));
      } else {
        const defaultAdms = [
          { email: "ssuoshri@gmail.com", role: "Super Admin", name: "Mohd Sarik" },
          { email: "manager@premiumrugcollection.com", role: "Manager", name: "Amit Joshi" }
        ];
        setAdminUsers(defaultAdms);
        localStorage.setItem('sandbox_admin_users', JSON.stringify(defaultAdms));
      }

      // 6. Analytics Visitor Logs
      const savedLogs = localStorage.getItem('sandbox_visitor_logs');
      if (savedLogs) {
        setVisitorLogs(JSON.parse(savedLogs));
      } else {
        const defaultLogs = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(Date.now() - i * 24 * 3600 * 1000).toISOString().split('T')[0];
          return {
            date,
            count: 140 + Math.floor(Math.random() * 80),
            whatsappInquiries: 3 + Math.floor(Math.random() * 5)
          };
        });
        setVisitorLogs(defaultLogs);
        localStorage.setItem('sandbox_visitor_logs', JSON.stringify(defaultLogs));
      }

      return; // Stop here, do not create Firestore subscriptions
    }

    // Real-time synchronization of inquiries, orders, etc. directly from live Firestore database
    // Listen to inquiries
    const inqSub = onSnapshot(collection(db, 'customer_inquiries'), (snapshot) => {
      const list: CustomerInquiry[] = [];
      snapshot.forEach(doc => list.push(doc.data() as CustomerInquiry));
      list.sort((a,b) => b.createdAt.localeCompare(a.createdAt));
      setInquiries(list);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'customer_inquiries'));

    // Listen to custom requests
    const custSub = onSnapshot(collection(db, 'custom_rug_requests'), (snapshot) => {
      const list: CustomRugRequest[] = [];
      snapshot.forEach(doc => list.push(doc.data() as CustomRugRequest));
      list.sort((a,b) => b.createdAt.localeCompare(a.createdAt));
      setCustomRequests(list);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'custom_rug_requests'));

    // Listen to orders
    const ordSub = onSnapshot(collection(db, 'orders'), (snapshot) => {
      const list: Order[] = [];
      snapshot.forEach(doc => list.push(doc.data() as Order));
      list.sort((a,b) => b.orderDate.localeCompare(a.orderDate));
      setOrders(list);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'orders'));

    // Listen to newsletter subscribers
    const subSub = onSnapshot(collection(db, 'newsletter_subscribers'), (snapshot) => {
      const list: NewsletterSubscriber[] = [];
      snapshot.forEach(doc => list.push(doc.data() as NewsletterSubscriber));
      setSubscribers(list);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'newsletter_subscribers'));

    // Listen to admin users list
    const admSub = onSnapshot(collection(db, 'admin_users'), (snapshot) => {
      const list: AdminUser[] = [];
      snapshot.forEach(doc => list.push(doc.data() as AdminUser));
      setAdminUsers(list);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'admin_users'));

    // Listen to website visitor analytics logs
    const visSub = onSnapshot(collection(db, 'website_visitors'), (snapshot) => {
      const list: WebsiteVisitorLog[] = [];
      snapshot.forEach(doc => list.push(doc.data() as WebsiteVisitorLog));
      list.sort((a,b) => b.date.localeCompare(a.date));
      setVisitorLogs(list);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'website_visitors'));

    return () => {
      inqSub();
      custSub();
      ordSub();
      subSub();
      admSub();
      visSub();
    };
  }, [isAdminUser, currentUser]);

  // --- GOOGLE AUTHENTICATION FLOWS ---
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google popup blocked/refused:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setIsAdminUser(false);
      setAdminProfile(null);
    } catch (e) {
      console.error("Signout failed:", e);
    }
  };

  // Mock Admin Login (Passcode/Bypass for testing convenience)
  const mockAdminLogin = async (email: string) => {
    setIsAdminUser(true);
    setAdminProfile({
      email: email,
      role: 'Super Admin',
      name: email === 'ssuoshri@gmail.com' ? 'Mohd Sarik' : 'Manager Incharge'
    });
    setCurrentUser({
      email: email,
      displayName: email === 'ssuoshri@gmail.com' ? 'Mohd Sarik' : 'Manager Incharge',
      uid: 'mock_admin_uid',
      emailVerified: true
    } as any);
    // Create local stub in localStorage
    localStorage.setItem('prc_mock_admin', email);
  };

  useEffect(() => {
    const savedMockAdmin = localStorage.getItem('prc_mock_admin');
    if (savedMockAdmin) {
      mockAdminLogin(savedMockAdmin);
    }
  }, []);

  // --- CART PERSISTENCE UTILS ---
  const addToCart = (product: Product, quantity: number, size: string, color: string) => {
    setCart(prev => {
      // Avoid duplicate lines in cart for exact size combo
      const existingIdx = prev.findIndex(item => 
        item.product.id === product.id && 
        item.selectedSize === size && 
        item.selectedColor === color
      );
      if (existingIdx !== -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }
      return [...prev, { product, quantity, selectedSize: size, selectedColor: color }];
    });
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, idx) => idx !== index));
  };

  const clearCart = () => setCart([]);

  // --- FORM SUBMISSION PIPELINES (Stored securely in Firebase) ---
  const submitInquiry = async (
    name: string, 
    phone: string, 
    email: string, 
    country: string, 
    source: string, 
    msg: string, 
    productInterest?: string
  ) => {
    const id = doc(collection(db, 'customer_inquiries')).id;
    const item: CustomerInquiry = {
      id,
      name,
      phone,
      email,
      country,
      source,
      productInterest: productInterest || 'General Luxury Line',
      message: msg,
      createdAt: new Date().toISOString(),
      status: 'new'
    };

    if (isSandboxMode) {
      const updated = [item, ...inquiries];
      setInquiries(updated);
      localStorage.setItem('sandbox_inquiries', JSON.stringify(updated));
      return;
    }

    try {
      await setDoc(doc(db, 'customer_inquiries', id), item);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `customer_inquiries/${id}`);
    }
  };

  const submitCustomRugRequest = async (req: Omit<CustomRugRequest, 'id' | 'createdAt' | 'status'>) => {
    const id = doc(collection(db, 'custom_rug_requests')).id;
    const item: CustomRugRequest = {
      ...req,
      id,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    if (isSandboxMode) {
      const updated = [item, ...customRequests];
      setCustomRequests(updated);
      localStorage.setItem('sandbox_custom_requests', JSON.stringify(updated));
      return;
    }

    try {
      await setDoc(doc(db, 'custom_rug_requests', id), item);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `custom_rug_requests/${id}`);
    }
  };

  const submitReview = async (name: string, rating: number, comment: string, location: string) => {
    const id = doc(collection(db, 'customer_reviews')).id;
    const item: CustomerReview = {
      id,
      name,
      rating,
      comment,
      location,
      verified: true,
      createdAt: new Date().toISOString(),
      status: 'pending' // Admin must approve it inside dashboard
    };

    if (isSandboxMode) {
      const updated = [item, ...reviews];
      setReviews(updated);
      return;
    }

    try {
      await setDoc(doc(db, 'customer_reviews', id), item);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `customer_reviews/${id}`);
    }
  };

  const submitNewsletter = async (email: string): Promise<boolean> => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) return false;
    
    if (isSandboxMode) {
      const item = { email: cleanEmail, subscribedAt: new Date().toISOString() };
      const updated = [item, ...subscribers];
      setSubscribers(updated);
      localStorage.setItem('sandbox_subscribers', JSON.stringify(updated));
      return true;
    }

    try {
      await setDoc(doc(db, 'newsletter_subscribers', cleanEmail), {
        email: cleanEmail,
        subscribedAt: new Date().toISOString()
      });
      return true;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `newsletter_subscribers/${cleanEmail}`);
      return false;
    }
  };

  const submitOrderEstimate = async (name: string, phone: string, email: string, country: string, address: string, notes: string) => {
    if (cart.length === 0) return;
    
    const id = doc(collection(db, 'orders')).id;
    const total = cart.reduce((acc, item) => {
      const price = currency === 'INR' ? item.product.priceINR : item.product.priceUSD;
      return acc + (price * item.quantity);
    }, 0);

    const order: Order = {
      id,
      customerName: name,
      phone,
      email,
      country,
      address,
      items: cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
        price: currency === 'INR' ? item.product.priceINR : item.product.priceUSD
      })),
      totalPrice: total,
      currency,
      paymentStatus: 'pending',
      orderStatus: 'pending',
      orderDate: new Date().toISOString(),
      notes
    };

    if (isSandboxMode) {
      const updated = [order, ...orders];
      setOrders(updated);
      localStorage.setItem('sandbox_orders', JSON.stringify(updated));
      clearCart();
      return;
    }

    try {
      await setDoc(doc(db, 'orders', id), order);
      clearCart();
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `orders/${id}`);
    }
  };

  // --- ADMINISTRATOR BUSINESS ACTIONS ---
  const addProduct = async (p: Omit<Product, 'id' | 'createdAt'>) => {
    const id = doc(collection(db, 'products')).id;
    const complete: Product = {
      ...p,
      id,
      createdAt: new Date().toISOString()
    };
    if (isSandboxMode) {
      setProducts([complete, ...products]);
      return;
    }
    try {
      await setDoc(doc(db, 'products', id), complete);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `products/${id}`);
    }
  };

  const editProduct = async (id: string, p: Partial<Product>) => {
    if (isSandboxMode) {
      setProducts(products.map(item => item.id === id ? { ...item, ...p } as Product : item));
      return;
    }
    try {
      await updateDoc(doc(db, 'products', id), p);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `products/${id}`);
    }
  };

  const deleteProduct = async (id: string) => {
    if (isSandboxMode) {
      setProducts(products.filter(item => item.id !== id));
      return;
    }
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `products/${id}`);
    }
  };

  const updateInquiryStatus = async (id: string, status: CustomerInquiry['status'], notes?: string) => {
    if (isSandboxMode) {
      const updated = inquiries.map(item => {
        if (item.id === id) {
          const fields: CustomerInquiry = { ...item, status };
          if (notes !== undefined) fields.notes = notes;
          return fields;
        }
        return item;
      });
      setInquiries(updated);
      localStorage.setItem('sandbox_inquiries', JSON.stringify(updated));
      return;
    }
    try {
      const fields: Partial<CustomerInquiry> = { status };
      if (notes !== undefined) fields.notes = notes;
      await updateDoc(doc(db, 'customer_inquiries', id), fields);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `customer_inquiries/${id}`);
    }
  };

  const updateCustomRequestStatus = async (id: string, status: CustomRugRequest['status'], notes?: string) => {
    if (isSandboxMode) {
      const updated = customRequests.map(item => {
        if (item.id === id) {
          const fields: CustomRugRequest = { ...item, status };
          if (notes !== undefined) fields.notes = notes;
          return fields;
        }
        return item;
      });
      setCustomRequests(updated);
      localStorage.setItem('sandbox_custom_requests', JSON.stringify(updated));
      return;
    }
    try {
      const fields: Partial<CustomRugRequest> = { status };
      if (notes !== undefined) fields.notes = notes;
      await updateDoc(doc(db, 'custom_rug_requests', id), fields);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `custom_rug_requests/${id}`);
    }
  };

  const updateOrderStatus = async (id: string, status: Order['orderStatus'], trackingNumber?: string) => {
    if (isSandboxMode) {
      const updated = orders.map(item => {
        if (item.id === id) {
          const fields: Order = { ...item, orderStatus: status };
          if (trackingNumber !== undefined) fields.trackingNumber = trackingNumber;
          return fields;
        }
        return item;
      });
      setOrders(updated);
      localStorage.setItem('sandbox_orders', JSON.stringify(updated));
      return;
    }
    try {
      const fields: Partial<Order> = { orderStatus: status };
      if (trackingNumber !== undefined) fields.trackingNumber = trackingNumber;
      await updateDoc(doc(db, 'orders', id), fields);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `orders/${id}`);
    }
  };

  const updateReviewStatus = async (id: string, status: CustomerReview['status']) => {
    if (isSandboxMode) {
      setReviews(reviews.map(item => item.id === id ? { ...item, status } as CustomerReview : item));
      return;
    }
    try {
      await updateDoc(doc(db, 'customer_reviews', id), { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `customer_reviews/${id}`);
    }
  };

  const updateGlobalSettings = async (s: Partial<WebsiteSetting>) => {
    if (isSandboxMode) {
      setSettings(prev => ({ ...prev, ...s }));
      return;
    }
    try {
      await updateDoc(doc(db, 'website_settings', 'default_config'), s);
      setSettings(prev => ({ ...prev, ...s }));
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'website_settings/default_config');
    }
  };

  const addShowcaseProject = async (p: Omit<ShowcaseProject, 'id' | 'createdAt'>) => {
    const id = doc(collection(db, 'showcase_projects')).id;
    const complete: ShowcaseProject = {
      ...p,
      id,
      createdAt: new Date().toISOString()
    };
    if (isSandboxMode) {
      setShowcaseProjects([complete, ...showcaseProjects]);
      return;
    }
    try {
      await setDoc(doc(db, 'showcase_projects', id), complete);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `showcase_projects/${id}`);
    }
  };

  const editShowcaseProject = async (id: string, p: Partial<ShowcaseProject>) => {
    if (isSandboxMode) {
      setShowcaseProjects(showcaseProjects.map(item => item.id === id ? { ...item, ...p } as ShowcaseProject : item));
      return;
    }
    try {
      await updateDoc(doc(db, 'showcase_projects', id), p);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `showcase_projects/${id}`);
    }
  };

  const deleteShowcaseProject = async (id: string) => {
    if (isSandboxMode) {
      setShowcaseProjects(showcaseProjects.filter(item => item.id !== id));
      return;
    }
    try {
      await deleteDoc(doc(db, 'showcase_projects', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `showcase_projects/${id}`);
    }
  };

  // Dynamic Database Seeding Procedure
  const seedDatabase = async () => {
    try {
      // 1. Seed website default configuration
      await setDoc(doc(db, 'website_settings', 'default_config'), GLOBAL_SETTING_DEFAULT);
      
      // 2. Seed default categories
      for (const cat of INITIAL_CATEGORIES) {
        await setDoc(doc(db, 'categories', cat.id), cat);
      }

      // 3. Seed default products
      for (const prod of INITIAL_PRODUCTS) {
        await setDoc(doc(db, 'products', prod.id), prod);
      }

      // 4. Seed reviews
      for (const rev of INITIAL_REVIEWS) {
        await setDoc(doc(db, 'customer_reviews', rev.id), rev);
      }

      // 5. Create basic bootstrapped admin reference
      await setDoc(doc(db, 'admin_users', 'ssuoshri@gmail.com'), {
        email: 'ssuoshri@gmail.com',
        role: 'Super Admin',
        name: 'Mohd Sarik'
      });

      // 6. Seed default showcase projects
      for (let i = 0; i < SHOWCASE_PROJECTS.length; i++) {
        const proj = SHOWCASE_PROJECTS[i];
        const pId = `showcase-00${i+1}`;
        await setDoc(doc(db, 'showcase_projects', pId), {
          id: pId,
          title: proj.title,
          category: proj.category,
          image: proj.image,
          description: proj.description,
          createdAt: new Date().toISOString()
        });
      }

      setIsDbSeeded(true);
      console.log("Database initialized with prestige seed data successfully!");
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'seed_operation');
    }
  };

  return (
    <AppContext.Provider value={{
      currentPage,
      setCurrentPage,
      selectedProductId,
      setSelectedProductId,
      adminSubTab,
      setAdminSubTab,
      theme,
      setTheme,
      currency,
      setCurrency,
      detectedCountry,
      setDetectedCountry,
      products,
      categories,
      reviews,
      settings,
      inquiries,
      customRequests,
      orders,
      subscribers,
      adminUsers,
      visitorLogs,
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      submitInquiry,
      submitCustomRugRequest,
      submitReview,
      submitNewsletter,
      submitOrderEstimate,
      currentUser,
      isAdminUser,
      adminProfile,
      signInWithGoogle,
      signOut,
      mockAdminLogin,
      addProduct,
      editProduct,
      deleteProduct,
      updateInquiryStatus,
      updateCustomRequestStatus,
      updateOrderStatus,
      updateReviewStatus,
      updateGlobalSettings,
      showcaseProjects,
      addShowcaseProject,
      editShowcaseProject,
      deleteShowcaseProject,
      
      // Custom Admin Compatibility Implementation
      loginAdminUser: async (email, pass) => {
        if (!email.trim() || !pass.trim()) return false;
        if (pass !== 'admin@2026') return false;
        try {
          await mockAdminLogin(email);
          return true;
        } catch (e) {
          return false;
        }
      },
      logoutAdmin: () => {
        localStorage.removeItem('prc_mock_admin');
        setCurrentUser(null);
        setIsAdminUser(false);
        setAdminProfile(null);
        signOut();
      },
      customRugRequests: customRequests,
      newsletterSubscribers: subscribers,
      updateCustomRugStatus: async (id, status, notes) => {
        return updateCustomRequestStatus(id, status, notes);
      },
      approveClientReview: async (id) => {
        return updateReviewStatus(id, 'approved');
      },
      deleteClientReview: async (id) => {
        return updateReviewStatus(id, 'rejected');
      },
      createOrUpdateProduct: async (prod) => {
        if (prod.id) {
          const { id, ...rest } = prod;
          return editProduct(id, rest);
        } else {
          return addProduct(prod as Omit<Product, 'id' | 'createdAt'>);
        }
      },
      deleteProductById: async (id) => {
        return deleteProduct(id);
      },

      seedDatabase,
      isDbSeeded,
      isFirebaseLoading
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used inside an AppProvider context.');
  }
  return context;
}
