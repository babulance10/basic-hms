import React from 'react';
import { Typography } from '@mui/material';
import { PharmacyBilling } from '@/types';

const BillingDetails = ({ billingData }) => {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Pharmacy Billing Details
      </Typography>
      <Typography variant="subtitle1">
        Billing Date: {billingData.billing_date}
      </Typography>
      <Typography variant="subtitle1">
        Total Amount: {billingData.total_amount}
      </Typography>
      <Typography variant="subtitle1">GST: {billingData.gst}</Typography>
      <Typography variant="subtitle1">
        Notes: {billingData.notes || 'N/A'}
      </Typography>
    </>
  );
};

export default BillingDetails;
