export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  description: string;
  features: string[];
  material: string;
  sizes: string[]; // e.g. ["5x8 ft", "6x9 ft", "8x10 ft"]
  colors: string[]; // e.g. ["Gold", "Beige", "Charcoal", "Ivory"]
  priceINR: number;
  priceUSD: number;
  images: string[];
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  shippingInfo: string;
  seoTitle: string;
  seoDescription: string;
  rating: number;
  isFeatured: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  price: number; // in current currency
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  country: string;
  address: string;
  items: OrderItem[];
  totalPrice: number;
  currency: 'INR' | 'USD';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  orderStatus: 'pending' | 'processed' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  orderDate: string;
  notes?: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  rating: number;
  comment: string;
  location: string;
  verified: boolean;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface CustomerInquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  country: string;
  source: string; // e.g. "Product Page", "Contact Page"
  productInterest?: string; // Product name or SKU
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  notes?: string;
}

export interface CustomRugRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  country: string;
  desiredSize: string;
  desiredColor: string;
  desiredShape: string;
  referenceImage?: string; // Base64 or URL
  projectDetails: string;
  createdAt: string;
  status: 'pending' | 'design_phase' | 'active_weaving' | 'completed' | 'cancelled';
  notes?: string;
}

export interface NewsletterSubscriber {
  email: string;
  subscribedAt: string;
}

export interface WebsiteSetting {
  id: string;
  businessName: string;
  founder: string;
  location: string;
  phone: string;
  whatsapp: string;
  contactEmail: string;
  instagramUrl: string;
  facebookUrl: string;
  pinterestUrl: string;
  youtubeUrl: string;
  linkedinUrl: string;
  shippingPolicy: string;
  refundPolicy: string;
  privacyPolicy: string;
  termsConditions: string;
  seoTitle: string;
  seoDescription: string;
  homepageImages?: Record<string, string>;
}

export interface AdminUser {
  email: string;
  role: 'Super Admin' | 'Manager' | 'Sales Team';
  name: string;
}

export interface WebsiteVisitorLog {
  date: string; // YYYY-MM-DD
  count: number;
  whatsappInquiries: number;
}

export interface ShowcaseProject {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  createdAt: string;
}
