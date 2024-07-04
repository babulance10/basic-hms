import React from 'react';
import { Typography } from '@mui/material';

const ItemDetails = ({ itemData }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Items
      </Typography>
      {itemData.map((item, index) => (
        <div key={index}>
          <Typography variant="body1">Item ID: {item.grn_item_id}</Typography>
          <Typography variant="body1">Quantity: {item.quantity}</Typography>
          <Typography variant="body1">Unit Price: {item.unit_price}</Typography>
          <Typography variant="body1">
            Total Price: {item.total_price}
          </Typography>
        </div>
      ))}
    </>
  );
};

export default ItemDetails;
