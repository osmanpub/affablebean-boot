export interface CartItemState {
  qty: number;
}

export interface CheckoutState {
  address: string;
  creditcard: string;
  email: string;
  name1: string;
  phone: string;
}

export interface ContactState {
  email: string;
  name1: string;
  msg: string;
  subjectId: string;
}

export interface ErrorBoundaryState {
  error: any;
  errorInfo: any;
}
