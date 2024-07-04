import { useForm, usePage } from '@inertiajs/react';
import {
  TextField,
  MenuItem,
  Button,
  Paper,
  Typography,
  Grid,
  styled,
  Card,
  CardContent,
  Autocomplete
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import BillingItemTable from './Components/PharmacyItemBillTable';
import Box from '@mui/material/Box';
import { usePharmacyBillingForm } from './Components/Util';
import { PageProps, Patient } from '@/types';

const PharmacyBillingPage = () => {
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
    activeVisits,
    pharmacistName,
    pharmacistId
  } = usePharmacyBillingForm();

  // Styled component for layout
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }));
  return (
    <div>
      <form onSubmit={e => handleSubmit(e, 'store')}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
          <Typography variant="h5" gutterBottom>
            Pharmacy Billing
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
              <Autocomplete
                onChange={(event, newValue) => {
                  setData('visit_id', newValue?.id || 0);
                }}
                id="combo-box-demo"
                options={activeVisits}
                sx={{ width: 300 }}
                getOptionLabel={option => `${option.patient_name} `}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Patient Name"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search'
                    }}
                    error={!!errors.visit_id}
                    helperText={errors.visit_id ? errors.visit_id : ''}
                  />
                )}
              />

              <TextField
                label="Billing Date"
                type="date"
                name="billing_date"
                value={data.billing_date}
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
              data={[]}
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
            Submit
          </Button>
        </Paper>
      </form>
    </div>
  );
};

export default PharmacyBillingPage;
