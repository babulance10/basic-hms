import React from 'react';
import { Button } from '@mui/material';
import ReactToPrint from 'react-to-print';

const PrintButton = ({ contentRef }) => {
  return (
    <ReactToPrint
      trigger={() => <Button className='p-8' variant="contained">Print</Button>}
      content={() => contentRef.current}
    />
  );
};

export default PrintButton;
