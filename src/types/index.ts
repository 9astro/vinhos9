export type ProductCategory = 'tinto' | 'branco' | 'rose' | 'espumante' | 'kit';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  tasting_notes: string | null;
  pairing: string | null;
  category: ProductCategory;
  country: string;
  region: string | null;
  grape: string | null;
  vintage: number | null;
  alcohol: number | null;
  volume: number;
  price: number;
  promo_price: number | null;
  stock: number;
  featured: boolean;
  active: boolean;
  images: ProductImage[];
  created_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt: string | null;
  order: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
}

export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: Product;
}

export interface Address {
  id: string;
  user_id: string;
  name: string;
  street: string;
  number: string;
  complement: string | null;
  neighborhood: string;
  city: string;
  state: string;
  zip: string;
  is_default: boolean;
}

export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  subtotal: number;
  shipping_cost: number;
  discount: number;
  coupon_code: string | null;
  stripe_session_id: string | null;
  shipping_label_url: string | null;
  tracking_code: string | null;
  address: Address;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  product: Pick<Product, 'name' | 'images'>;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  min_order: number | null;
  max_uses: number | null;
  uses: number;
  active: boolean;
  expires_at: string | null;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  cta_text: string | null;
  cta_url: string | null;
  active: boolean;
  order: number;
}

export interface ShippingOption {
  id: number;
  name: string;
  price: string;
  delivery_time: number;
  company: { name: string; picture: string };
}
