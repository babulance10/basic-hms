import {
  TextField,
  MenuItem,
  Button,
  Autocomplete,
  Paper,
  Typography,
  Grid,
  styled,
  Card,
  CardContent
} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Supplier } from '@/types';
import React, { useEffect, useState } from 'react';
import GrnItemTable from '@/Components/DataPage/GrnItemTable';
import Box from '@mui/material/Box';
import TaxTable from '@/Components/DataPage/TaxTable';
import { useGrnForm } from './Util';

const EditGRNPage = () => {
  const {
    data,
    setData,
    errors,
    processing,
    taxData,
    totalTaxData,
    handleAddData,
    handleSubmit,
    suppliers,
    products,
    clearTaxState,
    paymentModes
  } = useGrnForm('edit');

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }));

  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>();
  return (
    <div>
      {/* GRN Details TextFields */}
      <div>
        <form onSubmit={e => handleSubmit(e, 'update')}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                // disabled={processing} Uncomment this line if you have a 'processing' state
              >
                Save
              </Button>
            </Box>
            <Typography variant="h5" gutterBottom>
              Goods Received Note
            </Typography>
            <div className="py-4">
              <h2 className="text-lg font-bold text-gray-700 py-4">Details</h2>
              <div className="flex space-x-4">
                <TextField
                  label="GRN No"
                  name="grn_no"
                  value={data.grn_no || ''}
                  InputProps={{
                    readOnly: true
                  }}
                  variant="filled"
                />
                <Autocomplete
                  onChange={(event, newValue) => {
                    setData('supplier_id', newValue?.id || 0);
                    setSelectedSupplier(newValue);
                  }}
                  id="combo-box-demo"
                  options={suppliers}
                  value={
                    suppliers.filter(
                      supplier => supplier.id === data.supplier_id
                    )[0]
                  }
                  sx={{ width: 300 }}
                  getOptionLabel={option => option.name}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Supplier"
                      InputProps={{
                        ...params.InputProps,
                        type: 'search'
                      }}
                      error={!!errors.supplier_id}
                      helperText={errors.supplier_id ? errors.supplier_id : ''}
                    />
                  )}
                />
                <TextField
                  label="Received Date"
                  type="date"
                  name="received_date"
                  value={data.received_date}
                  onChange={e => setData('received_date', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.received_date}
                  helperText={errors.received_date ? errors.received_date : ''}
                />
                <TextField
                  label="Bill No"
                  name="bill_no"
                  value={data.bill_no}
                  onChange={e => setData('bill_no', e.target.value)}
                  error={!!errors.bill_no}
                  helperText={errors.bill_no ? errors.bill_no : ''}
                />
                <TextField
                  select
                  label="Payment Mode"
                  name="payment_mode"
                  value={data.payment_mode}
                  onChange={e => setData('payment_mode', e.target.value)}
                  error={!!errors.payment_mode}
                  helperText={errors.payment_mode ? errors.payment_mode : ''}
                >
                  {paymentModes.map(mode => (
                    <MenuItem key={mode} value={mode}>
                      {mode}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Adjustment"
                  name="adjustment"
                  type="number"
                  value={data.adjustment}
                  onChange={e => setData('adjustment', e.target.value)}
                  InputProps={{ step: '0.01' }}
                  error={!!errors.adjustment}
                  helperText={errors.adjustment ? errors.adjustment : ''}
                />
                <TextField
                  label="Remarks"
                  name="remarks"
                  value={data.remarks || ''}
                  onChange={e => setData('remarks', e.target.value)}
                  multiline
                />
              </div>
              {selectedSupplier && (
                <Box mt={2}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom fontWeight="bold">
                        Supplier Details
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            Name:
                          </Typography>
                          <Typography>{selectedSupplier.name}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            Address:
                          </Typography>
                          <Typography>{selectedSupplier.address}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            Phone:
                          </Typography>
                          <Typography>{selectedSupplier.phone}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            DL.Nos:
                          </Typography>
                          <Typography>{selectedSupplier.dl_no}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            GSTN:
                          </Typography>
                          <Typography>{selectedSupplier.gst_no}</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Box>
              )}
            </div>

            <div className="py-2">
              <h2 className="text-lg font-bold text-gray-700 py-4">Items</h2>
              <GrnItemTable
                handleAddData={handleAddData}
                products={products}
                data={data.grn_items}
              ></GrnItemTable>
            </div>
            <h2 className="text-lg font-bold text-gray-700 py-4">
              Tax Details
            </h2>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Item>
                  <TaxTable data={taxData} />
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    padding={1}
                  >
                    <TextField
                      id="filled-read-only-input"
                      label="Gross Amount"
                      defaultValue={totalTaxData.grossAmount}
                      InputProps={{
                        readOnly: true
                      }}
                      variant="filled"
                      size="small" // Set the size to small
                      sx={{ width: 'auto', marginBottom: 1 }} // Adjust width as needed
                    />
                    <TextField
                      id="filled-read-only-input"
                      label="Total Discount"
                      defaultValue={totalTaxData.totalDiscount}
                      InputProps={{
                        readOnly: true
                      }}
                      variant="filled"
                      size="small" // Set the size to small
                      sx={{ width: 'auto', marginBottom: 1 }} // Adjust width as needed
                    />
                    <TextField
                      id="filled-read-only-input"
                      label="Total Taxable Amount"
                      defaultValue={totalTaxData.totalAmount}
                      InputProps={{
                        readOnly: true
                      }}
                      variant="filled"
                      size="small" // Set the size to small
                      sx={{ width: 'auto', marginBottom: 1 }} // Adjust width as needed
                    />
                    <TextField
                      id="filled-read-only-input"
                      label="Total CGST"
                      defaultValue={totalTaxData.totalCgst}
                      InputProps={{
                        readOnly: true
                      }}
                      variant="filled"
                      size="small" // Set the size to small
                      sx={{ width: 'auto', marginBottom: 1 }} // Adjust width as needed
                    />
                    <TextField
                      id="filled-read-only-input"
                      label="Total SGST"
                      defaultValue={totalTaxData.totalSgst}
                      InputProps={{
                        readOnly: true
                      }}
                      variant="filled"
                      size="small" // Set the size to small
                      sx={{ width: 'auto', marginBottom: 1 }} // Adjust width as needed
                    />
                    <TextField
                      id="filled-read-only-input"
                      label="Roundoff"
                      defaultValue={totalTaxData.roundOff}
                      InputProps={{
                        readOnly: true
                      }}
                      variant="filled"
                      size="small" // Set the size to small
                      sx={{ width: 'auto', marginBottom: 1 }} // Adjust width as needed
                    />
                    <TextField
                      id="filled-read-only-input"
                      label="Net Amount"
                      defaultValue={totalTaxData.netAmount}
                      InputProps={{
                        readOnly: true
                      }}
                      variant="filled"
                      size="small" // Set the size to small
                      sx={{ width: 'auto', marginBottom: 1 }} // Adjust width as needed
                    />
                  </Box>
                </Item>
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={processing}
            >
              Save
            </Button>
          </Paper>
        </form>
      </div>
    </div>
  );
};

export default EditGRNPage;
