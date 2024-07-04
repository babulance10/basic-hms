import React, { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
  useMaterialReactTable,
  MRT_TableOptions,
  MRT_TableInstance
} from 'material-react-table';
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { BillingItem, Product, GrnItem } from '@/types';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { cloneDeep } from 'lodash';

const PharmacyBillingApp = ({
  handleAddBillingItem,
  products,
  data,
  grnItems
}) => {
  const [billingItems, setBillingItems] = useState<BillingItem[]>(() =>
    cloneDeep(data)
  );

  useEffect(() => {
    handleAddBillingItem(billingItems);
  }, [billingItems]);

  const BillingItemsTable = () => {
    const [validationErrors, setValidationErrors] = useState<
      Record<string, string | undefined>
    >({});

    const totalAmount = useMemo(() => {
      return billingItems?.reduce(
        (acc, curr) => acc + parseFloat(curr.total_price),
        0
      );
    }, []);
    const columns = useMemo<MRT_ColumnDef<BillingItem>[]>(
      () => [
        {
          accessorKey: 'grn_item_id',
          header: 'Product Name',
          size: 80,
          editVariant: 'select',
          //editSelectOptions: options,
          Cell: ({ cell, table }) => {
            // Find the label that corresponds to the value
            const data = grnItems.find(
              grnItem => grnItem.id == cell.getValue()
            );
            const label = `${data.name} - ${data.batch_no} - ${data.expiry_date}`;
            return label || cell.getValue();
          },
          Edit: ({ cell, column, row, table }) => {
            const handleSelectChange = (event, newValue) => {
              row._valuesCache[column.id] = newValue.id;
            };

            return (
              <Autocomplete
                onChange={handleSelectChange}
                id="combo-box-demo"
                options={grnItems}
                value={
                  grnItems.filter(grnItem => grnItem.id === cell.getValue())[0]
                }
                sx={{ width: 300 }}
                getOptionLabel={option =>
                  `${option.name} - ${option.batch_no} - ${option.expiry_date}`
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Products"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search'
                    }}
                    error={!!validationErrors.grn_item_id}
                    helperText={
                      validationErrors.grn_item_id
                        ? validationErrors.grn_item_id
                        : ''
                    }
                  />
                )}
              />
            );
          },
          muiEditTextFieldProps: {
            required: true,
            error: !!validationErrors?.grn_item_id,
            helperText: validationErrors?.grn_item_id
          }
        },
        {
          accessorKey: 'quantity',
          header: 'Quantity',
          size: 100,
          type: 'number'
        },
        {
          accessorKey: 'unit_price',
          header: 'Unit Price',
          size: 100,
          type: 'number',
          enableEditing: false
          //editSelectOptions: options
        },
        {
          accessorKey: 'total_price',
          header: 'Total Price',
          size: 100,
          type: 'number',
          enableEditing: false,
          Footer: () => (
            <Box sx={{ fontWeight: 'bold' }}>
              Total: ₹{totalAmount.toFixed(2)}
            </Box>
          )
        }
      ],
      [products, grnItems, totalAmount, billingItems]
    );

    const validateBillingItem = (item: BillingItem) => {
      const errors: Record<string, string> = {};
      // ... add your validation logic here
      return errors;
    };

    const newValidationErrors = (values: Record<keyof BillingItem, any>) => {
      const newValidationErrors = validateBillingItem(values);
      if (Object.values(newValidationErrors).some(error => error)) {
        setValidationErrors(newValidationErrors);
        return true;
      }
      setValidationErrors({});
      return false;
    };

    const createOrUpdateData = (
      values: Record<keyof BillingItem, any>,
      row: MRT_Row<BillingItem> | null,
      table: MRT_TableInstance<BillingItem> | null
    ) => {
      const grnItem = grnItems.find(
        (item: GrnItem) => item.id === values.grn_item_id
      );
      values.unit_price = grnItem?.unit_price || 0;
      values.total_price =
        parseFloat(values.unit_price) * parseFloat(values.quantity);
      values.gst = grnItem?.gst.replace('%', '');
      let result = [values, ...billingItems];
      if (table) {
        const updatedData = table.options.data.map(item =>
          item.id == row?.original.id ? values : item
        );
        result = [...updatedData];
      }
      setBillingItems(result);
    };

    // CREATE action for grnitems
    const handleCreateBillingItem: MRT_TableOptions<BillingItem>['onCreatingRowSave'] =
      async ({ row, values, table }) => {
        if (newValidationErrors(values)) return;
        const temporaryId = Date.now().toString();
        values.id = temporaryId;
        createOrUpdateData(values, null, null);
        table.setCreatingRow(null); // Exit creating mode
      };

    // UPDATE action for grnitems
    const handleSaveBillingItem: MRT_TableOptions<BillingItem>['onEditingRowSave'] =
      async ({ row, values, table }) => {
        if (newValidationErrors(values)) return;
        values.id = row.id;
        createOrUpdateData(values, row, table);
        table.setEditingRow(null); // Exit editing mode
      };

    //DELETE action
    const openDeleteConfirmModal = (row: MRT_Row<BillingItem>) => {
      if (window.confirm('Are you sure you want to delete this Item?')) {
        setBillingItems(() =>
          billingItems.filter(item => item.id !== row.original.id)
        );
      }
    };

    const table = useMaterialReactTable({
      columns,
      data: billingItems,
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
      onCreatingRowSave: handleCreateBillingItem,
      onEditingRowCancel: () => setValidationErrors({}),
      onEditingRowSave: handleSaveBillingItem,
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

  return (
    <>
      <BillingItemsTable />
    </>
  );
};

export default PharmacyBillingApp;
