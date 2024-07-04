import React, { forwardRef } from 'react';
import BillingDetails from './BillingDetails';
import ItemDetails from './ItemDetails';

const ComponentToPrint = forwardRef(({ billingData, itemData }, ref) => {
  return (
    <div ref={ref}>
      <BillingDetails billingData={billingData} />
      <ItemDetails itemData={itemData} />
    </div>
  );
});

export default ComponentToPrint;
