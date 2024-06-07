import React, { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
  LiteralUnion,
  MRT_TableInstance
} from 'material-react-table';
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GrnItem, Product } from '@/types';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { demoData } from './demoItems';
const App = ({ handleAddData, products, data }) => {
  // The main component that uses MaterialReactTable to display and manage GrnItems
  const [grnItems, setGrnItems] = useState<GrnItem[]>(data);

  useEffect(() => {
    // This method will run whenever 'myState' is update.
    handleAddData(grnItems);
  }, [grnItems]);

  const GrnItemsTable = () => {
    const [validationErrors, setValidationErrors] = useState<
      Record<string, string | undefined>
    >({});

    const options = products.map(type => ({
      value: type.id,
      label: type.name
    }));

    const totalAmount = useMemo(() => {
      //handleAddData(grnItems);
      return grnItems.reduce((acc, curr) => acc + curr.amount, 0);
    }, []);

    // Define the columns based on the GrnItem interface
    const columns = useMemo<MRT_ColumnDef<GrnItem>[]>(
      () => [
        {
          accessorKey: 'product_id',
          header: 'Product Name',
          size: 80,
          editVariant: 'select',
          //editSelectOptions: options,
          Cell: ({ cell, table }) => {
            // Find the label that corresponds to the value
            const stateLabel = products.find(
              product => product.id == cell.getValue()
            )?.name;
            return stateLabel || cell.getValue();
          },
          Edit: ({ cell, column, row, table }) => {
            const handleSelectChange = (event, newValue) => {
              //console.log(column, row, newValue, table, row._valuesCache);
              row._valuesCache[column.id] = newValue.id;
            };

            return (
              <Autocomplete
                onChange={handleSelectChange}
                id="combo-box-demo"
                options={products}
                value={
                  products.filter(product => product.id === cell.getValue())[0]
                }
                sx={{ width: 300 }}
                getOptionLabel={option => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Products"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search'
                    }}
                    error={!!validationErrors.product_id}
                    helperText={
                      validationErrors.product_id
                        ? validationErrors.product_id
                        : ''
                    }
                  />
                )}
              />
            );
          },
          muiEditTextFieldProps: {
            required: true,
            error: !!validationErrors?.product_id,
            helperText: validationErrors?.product_id
          }
        },

        {
          accessorKey: 'pack',
          header: 'Pack',
          size: 10,
          muiEditTextFieldProps: {
            required: true,
            error: !!validationErrors?.pack,
            helperText: validationErrors?.pack
          }
        },
        {
          accessorKey: 'batch_no',
          header: 'Batch No',
          size: 10,
          muiEditTextFieldProps: {
            required: true,
            error: !!validationErrors?.batchNo,
            helperText: validationErrors?.batchNo
          }
        },
        {
          accessorKey: 'expiry_date',
          header: 'Expiry Date',
          size: 80,
          muiEditTextFieldProps: {
            required: true,
            error: !!validationErrors?.expiryDate,
            helperText: validationErrors?.expiryDate,
            type: 'date' // Use the date picker for date fields
          }
        },
        {
          accessorKey: 'mrp',
          header: 'MRP',
          size: 30,
          muiEditTextFieldProps: {
            required: true,
            error: !!validationErrors?.mrp,
            helperText: validationErrors?.mrp,
            type: 'number'
          }
        },
        {
          accessorKey: 'quantity',
          header: 'Quantity',
          size: 20,
          muiEditTextFieldProps: {
            required: true,
            error: !!validationErrors?.quantity,
            helperText: validationErrors?.quantity,
            type: 'number'
          }
        },
        {
          accessorKey: 'free',
          header: 'Free',
          size: 20,
          muiEditTextFieldProps: {
            error: !!validationErrors?.free,
            helperText: validationErrors?.free,
            type: 'number'
          }
        },
        {
          accessorKey: 'unit_price',
          header: 'Unit Price',
          size: 50,
          muiEditTextFieldProps: {
            required: true,
            error: !!validationErrors?.unit_price,
            helperText: validationErrors?.unit_price,
            type: 'number'
          }
        },
        {
          accessorKey: 'discount_percentage',
          header: 'Discount %',
          size: 30,
          muiEditTextFieldProps: {
            error: !!validationErrors?.discountPercentage,
            helperText: validationErrors?.discountPercentage,
            type: 'number'
          }
        },
        {
          accessorKey: 'gst',
          header: 'GST %',
          size: 10,
          enableEditing: false,
          Cell: ({ cell, row }) => {
            // Find the label that corresponds to the value
            const gst = products.find(
              product => product.id == row.original.product_id
            )?.gst_category;
            return gst || '0%';
          }
        },
        {
          accessorKey: 'amount',
          header: 'Amount',
          size: 30,
          enableEditing: false,
          Footer: () => (
            <Stack>
              Total Amount:
              <Box color="warning.main">₹{totalAmount.toFixed(2)}</Box>
            </Stack>
          )
        }
      ],
      [validationErrors, totalAmount]
    );

    const validateGrnItem = (item: GrnItem) => {
      const errors: Record<string, string> = {};
      if (!item.pack) errors.pack = 'Pack is required';
      if (!item.batch_no) errors.batchNo = 'Batch number is required';
      if (!item.expiry_date) errors.expiryDate = 'Expiry date is required';
      if (item.mrp <= 0) errors.mrp = 'MRP should be greater than 0';
      if (item.quantity <= 0)
        errors.quantity = 'Quantity should be greater than 0';
      if (item.free < 0) errors.free = 'Free cannot be negative';
      if (item.unit_price <= 0)
        errors.unit_price = 'Unit price should be greater than 0';
      if (
        item.discount_percentage &&
        (item.discount_percentage < 0 || item.discount_percentage > 100)
      )
        errors.discountPercentage =
          'Discount percentage must be between 0 and 100';
      return errors;
    };

    const newValidationErrors = (values: Record<keyof GrnItem, any>) => {
      const newValidationErrors = validateGrnItem(values);
      if (Object.values(newValidationErrors).some(error => error)) {
        setValidationErrors(newValidationErrors);
        return true;
      }
      setValidationErrors({});
      return false;
    };

    const createOrUpdateData = (
      values: Record<keyof GrnItem, any>,
      row: MRT_Row<GrnItem> | null,
      table: MRT_TableInstance<GrnItem> | null
    ) => {
      values.amount =
        parseFloat(values.unit_price) * parseFloat(values.quantity);
      let result = [values, ...grnItems];
      if (table) {
        const updatedData = table.options.data.map(item =>
          item.id == row?.original.id ? values : item
        );
        console.log(updatedData, 'updatedData');
        result = [...updatedData];
      }
      setGrnItems(result);
    };

    // CREATE action for grnitems
    const handleCreateGrnItem: MRT_TableOptions<GrnItem>['onCreatingRowSave'] =
      async ({ row, values, table }) => {
        console.log('creatingss', row, values);
        if (newValidationErrors(values)) return;
        const temporaryId = Date.now().toString();
        values.id = temporaryId;
        createOrUpdateData(values, null, null);
        table.setCreatingRow(null); // Exit creating mode
      };

    // UPDATE action for grnitems
    const handleSaveGrnItem: MRT_TableOptions<GrnItem>['onEditingRowSave'] =
      async ({ row, values, table }) => {
        console.log('saving', values, row);
        if (newValidationErrors(values)) return;
        values.id = row.id;
        console.log(values);
        createOrUpdateData(values, row, table);
        table.setEditingRow(null); // Exit editing mode
      };

    //DELETE action
    const openDeleteConfirmModal = (row: MRT_Row<GrnItem>) => {
      if (window.confirm('Are you sure you want to delete this Item?')) {
        setGrnItems(() => grnItems.filter(item => item.id !== row.original.id));
      }
    };

    // Setup the table instance
    const table = useMaterialReactTable({
      columns,
      data: grnItems,
      createDisplayMode: 'row',
      editDisplayMode: 'row',
      enableEditing: true,
      enableStickyFooter: true,
      getRowId: row => row.id,
      positionActionsColumn: 'last',
      muiToolbarAlertBannerProps: validationErrors
        ? {
            color: 'error',
            children: 'Error loading data'
          }
        : undefined,
      muiTableContainerProps: {
        sx: {
          maxHeight: '300px'
        }
      },
      onCreatingRowCancel: () => setValidationErrors({}),
      onCreatingRowSave: handleCreateGrnItem,
      onEditingRowCancel: () => setValidationErrors({}),
      onEditingRowSave: handleSaveGrnItem,
      renderRowActions: ({ row, table }) => (
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Tooltip title="Edit">
            <IconButton onClick={() => table.setEditingRow(row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              color="error"
              onClick={() => openDeleteConfirmModal(row)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
      renderTopToolbarCustomActions: ({ table }) => (
        <Button variant="contained" onClick={() => table.setCreatingRow(true)}>
          Add Item
        </Button>
      ),
      state: {
        isLoading: false, // Set your loading state here
        isSaving: false, // Set your saving state here
        showAlertBanner: false, // Set your error state here
        showProgressBars: false // Set your fetching state here
      }
    });

    return <MaterialReactTable table={table} />;
  };

  // Wrap the main component in QueryClientProvider for react-query

  //const queryClient = new QueryClient();

  return (
    <>
      <GrnItemsTable />
    </>
  );
};

export default App;
