import React, { useEffect, useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Grid,
  Autocomplete
} from '@mui/material';
import BillingItemTable from './Components/PharmacyItemBillTable';
import { usePharmacyBillingForm } from './Components/Util';
import { Patient } from '@/types';

const PharmacyBillingEditPage = () => {
  const {
    data,
    setData,
    errors,
    processing,
    handleAddBillingItem,
    handleSubmit,
    patients,
    products,
    grnItems,
    pharmacistName,
    activeVisits
  } = usePharmacyBillingForm(); // Pass the existing bill data to the form
  return (
    <div>
      <form onSubmit={e => handleSubmit(e, 'update')}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
          <Typography variant="h5" gutterBottom>
            Edit Pharmacy Billing
          </Typography>
          <div className="py-4">
            <h2 className="text-lg font-bold text-gray-700 py-4">
              Patient Details
            </h2>
            <div className="flex space-x-4">
              <TextField
                label="Pharmacist Name"
                name="pharmacist_id"
                defaultValue={pharmacistName}
                InputProps={{
                  readOnly: true
                }}
                error={!!errors.pharmacist_id}
                helperText={errors.pharmacist_id ? errors.pharmacist_id : ''}
              />
              <TextField
                label="Patient Name"
                name="visit_id"
                defaultValue={activeVisits[0].patient_name}
                InputProps={{
                  readOnly: true
                }}
                error={!!errors.visit_id}
                helperText={errors.visit_id ? errors.visit_id : ''}
              />

              <TextField
                label="Billing Date"
                type="date"
                name="billing_date"
                defaultValue={data.billing_date.split(' ')[0]}
                onChange={e => setData('billing_date', e.target.value)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  readOnly: true
                }}
                error={!!errors.billing_date}
                helperText={errors.billing_date ? errors.billing_date : ''}
              />
              {/* Add more patient-specific fields as needed */}
            </div>
          </div>

          <div className="py-2">
            <h2 className="text-lg font-bold text-gray-700 py-4">
              Prescription Items
            </h2>
            <BillingItemTable
              handleAddBillingItem={handleAddBillingItem}
              products={products}
              grnItems={grnItems}
              data={data.billing_items}
            ></BillingItemTable>
          </div>

          <div className="py-2">
            <h2 className="text-lg font-bold text-gray-700 py-4">
              Billing Summary
            </h2>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Total Amount"
                  name="total_amount"
                  value={data.total_amount}
                  InputProps={{
                    readOnly: true
                  }}
                  variant="filled"
                />
                <TextField
                  label="GST"
                  name="gst"
                  value={data.gst}
                  InputProps={{
                    readOnly: true
                  }}
                  variant="filled"
                />
                <TextField
                  label="Notes"
                  name="notes"
                  value={data.notes}
                  onChange={e => setData('notes', e.target.value)}
                  multiline
                />
                {/* Add more summary fields as needed */}
              </Grid>
            </Grid>
          </div>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={processing}
          >
            Update
          </Button>
        </Paper>
      </form>
    </div>
  );

};

export default PharmacyBillingEditPage;
