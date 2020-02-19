import {Product} from './categories';

export interface Customer {
  name: string;
  address: string;
  cityRegion: string;
  email: string;
  phone: string;
}
export interface Order {
  customer: Customer;
  orderedProducts: Array<OrderedProduct>;
  orderRecord: OrderRecord;
  products: Array<Product>;
}

export interface Purchase {
  didInvalidate: boolean;
  isPosting: boolean;
  order: Order;
}

export interface OrderedProduct {
  quantity: number;
}

export interface OrderRecord {
  amount: number;
  confirmationNumber: string;
  dateCreated: string;
}
