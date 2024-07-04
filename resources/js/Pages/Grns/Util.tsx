// useGrnForm.js
import { useEffect, useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import {
  Grn,
  GrnItem,
  Product,
  Supplier,
  TaxData,
  TotalTaxData
} from '@/types';
import cloneDeep from 'lodash/cloneDeep';

const initialTaxData = [
  { rate: 0, amount: 0, cgst: 0, sgst: 0 },
  { rate: 5, amount: 0, cgst: 0, sgst: 0 },
  { rate: 12, amount: 0, cgst: 0, sgst: 0 },
  { rate: 18, amount: 0, cgst: 0, sgst: 0 },
  { rate: 28, amount: 0, cgst: 0, sgst: 0 }
];
const initialTotalTaxData = {
  grossAmount: 0,
  totalDiscount: 0,
  totalAmount: 0,
  totalCgst: 0,
  totalSgst: 0,
  roundOff: 0,
  netAmount: 0
};

// Utility function to get initial form data
const getInitialFormData = (grns?: Grn, grn_items?: GrnItem[]): Grn => {
  if (grns && grn_items) {
    // Editing an existing GRN
    return {
      id: grns.id,
      grn_no: grns.grn_no,
      received_date: grns.received_date,
      bill_no: grns.bill_no,
      payment_mode: grns.payment_mode,
      remarks: grns.remarks,
      supplier_id: grns.supplier_id,
      adjustment: grns.adjustment,
      grn_items: grn_items.map(item => ({
        ...item,
        amount: Math.ceil(item.unit_price) * item.quantity
      }))
    };
  } else {
    // Creating a new GRN
    return {
      grn_no: '',
      received_date: '',
      bill_no: '',
      payment_mode: 'Credit',
      remarks: '',
      supplier_id: 0,
      adjustment: '0.00',
      grn_items: []
    };
  }
};

export const useGrnForm = (mode: 'create' | 'edit') => {
  const { grns, grn_items, products, suppliers } = usePage<{
    grns?: Grn;
    grn_items?: GrnItem[];
    products: Product[];
    suppliers: Supplier[];
  }>().props;

  const [taxData, setTaxData] = useState<TaxData[]>(() =>
    cloneDeep(initialTaxData)
  );
  const [totalTaxData, setTotalTaxData] =
    useState<TotalTaxData>(initialTotalTaxData);
  const { data, setData, errors, post, put, processing } = useForm<Grn>(
    getInitialFormData(grns, grn_items)
  );

  const clearTaxState = () => {
    setTaxData(cloneDeep(initialTaxData));
    setTotalTaxData({ ...initialTotalTaxData });
  };

  const handleAddData = (items: GrnItem[]) => {
    //clearTaxState();
    let newTaxData = cloneDeep(initialTaxData);
    let newTotalTaxData = { ...initialTotalTaxData };

    items.forEach(row => {
      let gstRate =
        products.find(
          product => product.id.toString() === row.product_id.toString()
        )?.gst_category || '0';
      gstRate = gstRate.replace('%', '');
      let currentIndex = newTaxData.findIndex(
        data => data.rate.toString() === gstRate
      );

      if (currentIndex !== -1) {
        const amount = row.amount || 0;
        const discount = parseFloat(
          ((amount * row.discount_percentage) / 100).toFixed(2)
        );
        const cgst = parseFloat(
          (((newTaxData[currentIndex].rate / 2) * amount) / 100).toFixed(2)
        );
        const sgst = cgst;

        newTaxData[currentIndex].amount += amount;
        newTaxData[currentIndex].cgst += cgst;
        newTaxData[currentIndex].sgst += sgst;

        newTotalTaxData.totalDiscount += discount;
        newTotalTaxData.grossAmount += amount;
        newTotalTaxData.totalCgst += cgst;
        newTotalTaxData.totalSgst += sgst;
      }
    });

    newTotalTaxData.totalAmount =
      newTotalTaxData.grossAmount - newTotalTaxData.totalDiscount;
    newTotalTaxData.netAmount =
      newTotalTaxData.totalAmount +
      newTotalTaxData.totalCgst +
      newTotalTaxData.totalSgst +
      newTotalTaxData.roundOff;
    Object.keys(newTotalTaxData).forEach(key => {
      newTotalTaxData[key] = parseFloat(newTotalTaxData[key].toFixed(2));
    });
    
    setTaxData([...newTaxData]);
    setTotalTaxData(newTotalTaxData);
    setData('grn_items', items);
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    routeName: string
  ) => {
    e.preventDefault();
    if (routeName === 'update') {
      put(route('grns.update', data.id));
    } else {
      post(route('grns.store'), data);
    }
  };

  const paymentModes = [
    'Credit',
    'Cash',
    'Debit Card',
    'Credit Card',
    'Online',
    'Cheque'
  ];

  return {
    data,
    setData,
    errors,
    post,
    put,
    processing,
    taxData,
    setTaxData,
    totalTaxData,
    setTotalTaxData,
    products,
    suppliers,
    handleAddData,
    handleSubmit,
    clearTaxState,
    paymentModes
  };
};
