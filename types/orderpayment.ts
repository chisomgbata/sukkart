export {};

declare global {
  interface OrderPayment {
    data: Datum[];
  }
}

interface Datum {
  date_created: Date;
  total: number;
  reference: string;
  total_delivery: number;
  status: string;
  user: string;
  payment_url: string;
  date_updated: Date;
  id: string;
  items: Item[];
  address: Address;
}

interface Address {
  id: string;
  phone: string;
  lodge: string;
  area: string;
}

interface Item {
  price: number;
  quantity: number;
  order: string;
  product: Product;
}

interface Product {
  id: string;
  status: string;
  date_created: Date;
  date_updated: null;
  name: string;
  stock: number;
  slug: string;
  description: string;
  image: null | string;
  price: number;
}
