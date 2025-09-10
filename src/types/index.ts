// User Types
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  phone?: string
  birthDate?: string
  gender?: 'male' | 'female' | 'other'
  preferences: UserPreferences
  addresses: Address[]
  paymentMethods: PaymentMethod[]
  createdAt: string
  updatedAt: string
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'cyber'
  language: 'pt' | 'en' | 'es'
  currency: 'BRL' | 'USD' | 'EUR'
  notifications: NotificationSettings
  privacy: PrivacySettings
}

export interface NotificationSettings {
  email: boolean
  sms: boolean
  push: boolean
  whatsapp: boolean
  priceAlerts: boolean
  newProducts: boolean
  promotions: boolean
  orderUpdates: boolean
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends'
  dataSharing: boolean
  analytics: boolean
  marketing: boolean
}

// Product Types
export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  price: number
  originalPrice?: number
  discount?: number
  images: ProductImage[]
  category: Category
  subcategory?: string
  brand: string
  sku: string
  stock: number
  isDigital: boolean
  isActive: boolean
  isFeatured: boolean
  tags: string[]
  specifications: ProductSpecification[]
  reviews: ProductReview[]
  rating: number
  reviewCount: number
  variants?: ProductVariant[]
  relatedProducts: string[]
  createdAt: string
  updatedAt: string
}

export interface ProductImage {
  id: string
  url: string
  alt: string
  isPrimary: boolean
  order: number
}

export interface ProductSpecification {
  name: string
  value: string
  group: string
}

export interface ProductVariant {
  id: string
  name: string
  type: 'color' | 'size' | 'storage' | 'model'
  value: string
  priceModifier: number
  stock: number
  sku: string
}

export interface ProductReview {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  title: string
  comment: string
  images?: string[]
  isVerified: boolean
  helpful: number
  createdAt: string
}

// Category Types
export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  icon: string
  parentId?: string
  children?: Category[]
  isActive: boolean
  order: number
  productCount: number
}

// Cart Types
export interface Cart {
  id: string
  userId?: string
  sessionId?: string
  items: CartItem[]
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
  coupon?: Coupon
  createdAt: string
  updatedAt: string
}

export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  variant?: ProductVariant
  price: number
  addedAt: string
}

// Order Types
export interface Order {
  id: string
  userId: string
  orderNumber: string
  status: OrderStatus
  items: OrderItem[]
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
  payment: Payment
  shipping: Shipping
  tracking?: Tracking
  notes?: string
  createdAt: string
  updatedAt: string
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

export interface OrderItem {
  id: string
  productId: string
  product: Product
  quantity: number
  price: number
  variant?: ProductVariant
}

// Payment Types
export interface Payment {
  id: string
  orderId: string
  method: PaymentMethod
  status: PaymentStatus
  amount: number
  currency: string
  transactionId?: string
  gatewayResponse?: any
  paidAt?: string
  createdAt: string
}

export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'refunded'

export interface PaymentMethod {
  id: string
  type: 'credit_card' | 'debit_card' | 'pix' | 'boleto' | 'paypal'
  name: string
  isDefault: boolean
  details: CreditCardDetails | PixDetails | BoletoDetails
  createdAt: string
}

export interface CreditCardDetails {
  last4: string
  brand: string
  expiryMonth: number
  expiryYear: number
  holderName: string
}

export interface PixDetails {
  key: string
  type: 'cpf' | 'cnpj' | 'email' | 'phone' | 'random'
}

export interface BoletoDetails {
  bankCode: string
  dueDate: string
}

// Shipping Types
export interface Shipping {
  id: string
  method: ShippingMethod
  address: Address
  cost: number
  estimatedDays: number
  trackingCode?: string
  status: ShippingStatus
  events: ShippingEvent[]
}

export interface ShippingMethod {
  id: string
  name: string
  description: string
  cost: number
  estimatedDays: number
  isActive: boolean
}

export type ShippingStatus = 
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'in_transit'
  | 'delivered'
  | 'failed'

export interface ShippingEvent {
  date: string
  status: string
  location: string
  description: string
}

export interface Tracking {
  code: string
  carrier: string
  status: string
  events: TrackingEvent[]
  estimatedDelivery?: string
}

export interface TrackingEvent {
  date: string
  time: string
  status: string
  location: string
  description: string
}

// Address Types
export interface Address {
  id: string
  userId: string
  type: 'billing' | 'shipping'
  name: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
  createdAt: string
}

// Coupon Types
export interface Coupon {
  id: string
  code: string
  name: string
  description: string
  type: 'percentage' | 'fixed' | 'free_shipping'
  value: number
  minAmount?: number
  maxDiscount?: number
  usageLimit?: number
  usedCount: number
  isActive: boolean
  validFrom: string
  validUntil: string
  applicableProducts?: string[]
  applicableCategories?: string[]
}

// Wishlist Types
export interface Wishlist {
  id: string
  userId: string
  name: string
  items: WishlistItem[]
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

export interface WishlistItem {
  id: string
  productId: string
  product: Product
  addedAt: string
  notes?: string
}

// Price Alert Types
export interface PriceAlert {
  id: string
  userId: string
  productId: string
  product: Product
  targetPrice: number
  currentPrice: number
  isActive: boolean
  notificationMethods: ('email' | 'sms' | 'whatsapp' | 'push')[]
  createdAt: string
  triggeredAt?: string
}

// Analytics Types
export interface UserAnalytics {
  userId: string
  totalOrders: number
  totalSpent: number
  averageOrderValue: number
  favoriteCategories: CategoryStats[]
  purchaseHistory: PurchaseHistory[]
  browsingHistory: BrowsingHistory[]
  lastActivity: string
}

export interface CategoryStats {
  categoryId: string
  categoryName: string
  orderCount: number
  totalSpent: number
}

export interface PurchaseHistory {
  date: string
  orderId: string
  total: number
  items: number
}

export interface BrowsingHistory {
  productId: string
  productName: string
  viewedAt: string
  duration: number
}

// Search Types
export interface SearchFilters {
  category?: string
  brand?: string
  priceRange?: [number, number]
  rating?: number
  inStock?: boolean
  isDigital?: boolean
  tags?: string[]
}

export interface SearchResult {
  products: Product[]
  total: number
  page: number
  limit: number
  filters: SearchFilters
  suggestions: string[]
}

// Notification Types
export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  data?: any
  isRead: boolean
  createdAt: string
}

export type NotificationType = 
  | 'order_update'
  | 'price_alert'
  | 'new_product'
  | 'promotion'
  | 'review_request'
  | 'system'

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Form Types
export interface LoginForm {
  email: string
  password: string
  rememberMe: boolean
}

export interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
  phone?: string
  acceptTerms: boolean
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

// Theme Types
export interface Theme {
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    textSecondary: string
  }
  fonts: {
    primary: string
    secondary: string
  }
}

// App State Types
export interface AppState {
  user: User | null
  cart: Cart | null
  wishlist: Wishlist | null
  theme: Theme
  isLoading: boolean
  error: string | null
}

// Mobile Specific Types
export interface MobileConfig {
  enableBiometrics: boolean
  enablePushNotifications: boolean
  enableLocation: boolean
  enableCamera: boolean
  enableMicrophone: boolean
}

export interface DeviceInfo {
  platform: 'ios' | 'android'
  version: string
  model: string
  uniqueId: string
  isTablet: boolean
  hasNotch: boolean
}
