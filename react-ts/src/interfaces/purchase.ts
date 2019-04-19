import { Product } from "./categories";

export interface Customer {
  name: string;
  address: string;
  cityRegion: string;
  email: string;
  phone: string;
}
export interface Order {
  customer: Customer;
  orderedProducts: OrderedProduct[];
  orderRecord: OrderRecord;
  products: Product[];
}

export interface Purchase {
  order: Order;
}

interface OrderedProduct {
  quantity: number;
}

interface OrderRecord {
  amount: number;
  confirmationNumber: string;
  dateCreated: string;
}
