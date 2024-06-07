import { Config } from 'ziggy-js';

export interface User {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  owner: string;
  photo: string;
  deleted_at: string;
  //account: Account;
}

export interface Account {
  id: number;
  name: string;
  users: User[];
  contacts: Contact[];
  organizations: Organization[];
}

export interface Contact {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  country: string;
  postal_code: string;
  deleted_at: string;
  organization_id: number;
  organization: Organization;
}

export interface Organization {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  country: string;
  postal_code: string;
  deleted_at: string;
  contacts: Contact[];
}

export interface Menu {
  id: number;
  name: string;
  icon?: string;
  url: string;
  children?: Menu[];
}

export interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  gender: 'male' | 'female' | 'other';
  birth_date: Date;
  deleted_at: string;
}

export interface ProductType {
  id: number;
  name: string;
  description: string | null;
  deleted_at: string;
}

export interface Supplier {
  id: number;
  name: string;
  contact_person: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  pan_no: string;
  dl_no: string;
  cst_no: string;
  gst_no: string;
  deleted_at: string;
  products: Product[];
}

export interface Product {
  id: number;
  name: string;
  hsn_code: number;
  scheduled_drug: 'H' | 'H1' | 'X' | 'G' | 'I' | 'J' | 'None';
  gst_category: '0%' | '5%' | '12%' | '18%' | '28%';
  product_type_id: number;
  manufacturer_id: number;
  product_type: {
    id: number;
    name: string;
  };
  manufacturer: {
    id: number;
    name: string;
  };
  deleted_at: string;
  // Include any other properties that are relevant to your Product model
}

export interface Manufacturer {
  id: number;
  mfr_code: string; // Unique manufacturer code
  name: string; // Name of the manufacturer
  address?: string; // Address of the manufacturer, optional
  contact_number?: string; // Contact number of the manufacturer, optional
  email?: string; // Email of the manufacturer, unique and optional
}

export interface GrnItem {
  id: string;
  product_id: number;
  pack: string;
  batch_no: string;
  expiry_date: string;
  mrp: number;
  quantity: number;
  free: number;
  unit_price: number;
  discount_percentage: number;
  amount: number;
  gst?: number;
}

export interface Grn {
  id:number;
  grn_no: string;
  received_date: string;
  bill_no: string;
  payment_mode: string;
  remarks: string;
  supplier_id: number;
  adjustment: string;
  grn_items: GrnItem[];
}

export interface TaxData {
  rate: number;
  amount: number;
  cgst: number;
  sgst: number;
}
export interface TotalTaxData {
  grossAmount: number;
  totalDiscount: number;
  totalAmount: number;
  totalCgst: number;
  totalSgst: number;
  roundOff: number;
  netAmount: number;
}

export type PaginatedData<T> = {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };

  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;

    links: {
      url: null | string;
      label: string;
      active: boolean;
    }[];
  };
};

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    user: User;
  };
  flash: {
    success: string | null;
    error: string | null;
  };
  ziggy: Config & { location: string };
};
