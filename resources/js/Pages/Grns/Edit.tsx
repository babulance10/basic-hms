import { Link, useForm, usePage } from '@inertiajs/react';
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
import {
  Grn,
  GrnItem,
  Product,
  Supplier,
  TaxData,
  TotalTaxData
} from '@/types';
import React, { useState } from 'react';
import GrnItemTable from '@/Components/DataPage/GrnItemTable';
import Box from '@mui/material/Box';
import TaxTable from '@/Components/DataPage/TaxTable';

const EditGRNPage = () => {
  const { grns, grn_items, products, suppliers } = usePage<{
    grns: Grn;
    grn_items: GrnItem[];
    products: Product[];
    suppliers: Supplier[];
  }>().props;
  const { data, setData, errors, put, processing } = useForm<Grn>({
    id: grns.id,
    grn_no: grns.grn_no,
    received_date: grns.received_date,
    bill_no: grns.bill_no,
    payment_mode: grns.payment_mode, // Default to 'Credit' or any other default value you prefer
    remarks: grns.remarks,
    supplier_id: grns.supplier_id, // Assuming this is a string; adjust if it's a number
    adjustment: grns.adjustment,
    grn_items: grn_items.map(item => {
      item.amount = Math.ceil(item.unit_price) * item.quantity;
      return item;
    }) // Start with an empty array for GRN items
  });

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

  const [taxData, setTaxData] = useState<TaxData[]>(initialTaxData);

  const [totalTaxData, setTotalTaxData] =
    useState<TotalTaxData>(initialTotalTaxData);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }));

  const paymentModes = [
    'Credit',
    'Cash',
    'Debit Card',
    'Credit Card',
    'Online',
    'Cheque'
  ];

  const clearTaxState = () => {
    setTotalTaxData({ ...initialTotalTaxData });
    setTaxData([...initialTaxData]);
  };

  const handleAddData = (items: GrnItem[]) => {
    // Clear the state first
    clearTaxState();

    // Create new copies of the state objects
    let newTaxData = [...initialTaxData];
    let newTotalTaxData = { ...initialTotalTaxData };

    // Use a single loop to calculate all totals
    items.forEach(row => {
      let gstRate =
        products.find(product => product.id.toString() == row.product_id)
          ?.gst_category || '0';
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
        const sgst = cgst; // SGST is equal to CGST
        // Update the tax data for the current rate
        newTaxData[currentIndex].amount += amount;
        newTaxData[currentIndex].cgst = parseFloat(
          (newTaxData[currentIndex].cgst + cgst).toFixed(2)
        );
        newTaxData[currentIndex].sgst = newTaxData[currentIndex].cgst;

        // Update the total tax data
        newTotalTaxData.totalDiscount += discount;
        newTotalTaxData.grossAmount += amount;
        newTotalTaxData.totalCgst += cgst;
        newTotalTaxData.totalSgst = newTotalTaxData.totalCgst;
      }
    });

    // Calculate the final totals
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

    // Set the new state
    setTaxData(newTaxData);
    setTotalTaxData(newTotalTaxData);
    // Continue with setting 'grn_items'
    setData('grn_items', items);
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const finalData = {
      ...data,
      grn_items: data.grn_items
    };
    put(route('grns.update', grns.id));
  }

  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>();

  return (
    <div>
      {/* GRN Details TextFields */}
      <div>
        <form onSubmit={handleSubmit}>
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
                  value={data.grn_no}
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
                  value={data.remarks}
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
