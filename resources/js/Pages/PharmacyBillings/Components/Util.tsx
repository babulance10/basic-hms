import { useEffect, useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import {
  PharmacyBilling,
  BillingItem,
  Product,
  Patient,
  User,
  PageProps,
  GrnItem
} from '@/types';
import cloneDeep from 'lodash/cloneDeep';
import padStart from 'lodash';
import { Console } from 'console';

const today = new Date();

const getInitialBillingData = (
  billing?: PharmacyBilling,
  billingItems?: BillingItem[],
  userId: number
): PharmacyBilling => {
  const today = new Date();
  if (billing && billingItems) {
    const data = {
      id: billing.id,
      visit_id: billing.visit_id,
      gst: parseFloat(billing.gst),
      pharmacist_id: billing.pharmacist_id,
      billing_date: billing.billing_date,
      notes: billing.notes,
      total_amount: billing.total_amount,
      billing_items: billingItems.map(item => ({
        ...item,
        // Assuming you have a calculation for the item total
        total: calculateItemTotal(item.unit_price, item.quantity, 0)
      }))
    };
    // Editing an existing billing record
    return data;
  } else {
    // Creating a new billing record
    return {
      id: -1,
      visit_id: -1,
      pharmacist_id: userId,
      billing_date: `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`,
      notes: '',
      gst: 0.0,
      total_amount: 0,
      billing_items: []
    };
  }
};

// Helper function to calculate the total for a billing item
function calculateItemTotal(price: number, quantity: number, discount: number) {
  // Include your calculation logic here
  // For example:
  const discountAmount = price * (discount / 100);
  const total = (price - discountAmount) * quantity;
  return Math.ceil(total);
}

export const usePharmacyBillingForm = () => {
  const { auth } = usePage<PageProps>().props;

  const {
    pharmacyBilling,
    billing_items,
    patients,
    activeVisits,
    pharmacists,
    products,
    grnItems
  } = usePage<{
    pharmacyBilling: PharmacyBilling;
    billing_items: BillingItem[];
    patients: Patient[];
    pharmacists: User[];
    products: Product[];
    grnItems: GrnItem[];
    activeVisits: { id: number; patient_name: string }[];
  }>().props;
  const { data, setData, errors, post, put, processing } =
    useForm<PharmacyBilling>(
      cloneDeep(
        getInitialBillingData(pharmacyBilling, billing_items, auth.user.id)
      )
    );

  const handleAddBillingItem = (items: BillingItem[]) => {
    let newTotalAmount = 0;
    let gstValue = 0;
    items.forEach(item => {
      const total_price = item.unit_price * item.quantity;
      item.total_price = parseFloat(total_price.toFixed(2));
      newTotalAmount += total_price;
      const gstCategory =
        grnItems
          .find((grnItem: GrnItem) => grnItem.id === item.grn_item_id)
          ?.gst?.replace('%', '') || '0';
      item.gst = item.gst ? item.gst : parseInt(gstCategory);
      gstValue += parseFloat(
        ((total_price * (item.gst || 0)) / 100).toFixed(2)
      );
    });
    const netAmount = newTotalAmount + gstValue;

    setData(prevData => ({
      ...prevData,
      total_amount: parseFloat(newTotalAmount.toFixed(2)),
      gst: parseFloat(gstValue.toFixed(2)),
      billing_items: items
    }));
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    routeName: string
  ) => {
    e.preventDefault();
    if (routeName === 'update') {
      put(route('pharmacy-bills.update', data.id));
    } else {
      post(route('pharmacy-bills.store'), data);
    }
  };

  return {
    data,
    setData,
    errors,
    post,
    put,
    processing,
    handleAddBillingItem,
    handleSubmit,
    patients,
    pharmacists,
    products,
    grnItems,
    activeVisits,
    pharmacistName: auth.user.name,
    pharmacistId: auth.user.id
  };
};
