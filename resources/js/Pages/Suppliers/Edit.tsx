import React from 'react';
import { useForm, router, usePage, Head, Link } from '@inertiajs/react';
import TextInput from '@/Components/Form/TextInput';
import SelectInput from '@/Components/Form/SelectInput';
import DeleteButton from '@/Components/Button/DeleteButton';
import LoadingButton from '@/Components/Button/LoadingButton';
import FieldGroup from '@/Components/Form/FieldGroup';
import { Supplier } from '@/types';
import TrashedMessage from '@/Components/Messages/TrashedMessage';
import Table from '@/Components/Table/Table';

const SupplierEdit = () => {
  const { supplier } = usePage<{ supplier: Supplier }>().props;
  const { data, setData, errors, put, processing } = useForm({
    name: supplier.name || '',
    contact_person: supplier.contact_person || '',
    phone: supplier.phone || '',
    email: supplier.email || '',
    address: supplier.address || '',
    city: supplier.city || '',
    state: supplier.state || '',
    country: supplier.country || '',
    zip_code: supplier.zip_code || '',
    pan_no: supplier.pan_no || '',
    dl_no: supplier.dl_no || '',
    cst_no: supplier.cst_no || '',
    gst_no: supplier.gst_no || ''
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    put(route('suppliers.update', supplier.id));
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this supplier?')) {
      router.delete(route('suppliers.destroy', supplier.id));
    }
  }

  function restore() {
    if (confirm('Are you sure you want to restore this supplier?')) {
      router.put(route('suppliers.restore', supplier.id));
    }
  }

  return (
    <div>
       <Head title={data.name} />
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          href={route('suppliers')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Suppliers
        </Link>
        <span className="mx-2 font-medium text-indigo-600">/</span>
        {data.name}
      </h1>
      {supplier.deleted_at && (
        <TrashedMessage
          message="This supplier has been deleted."
          onRestore={restore}
        />
      )}
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 p-8 lg:grid-cols-2">
            {/* FieldGroup for Name */}
            <FieldGroup label="Name" name="name" error={errors.name}>
              <TextInput
                name="name"
                value={data.name}
                onChange={e => setData('name', e.target.value)}
                error={errors.name}
              />
            </FieldGroup>
            {/* FieldGroup for Contact Person */}
            <FieldGroup label="Contact Person" name="contact_person" error={errors.contact_person}>
              <TextInput
                name="contact_person"
                value={data.contact_person}
                onChange={e => setData('contact_person', e.target.value)}
                error={errors.contact_person}
              />
            </FieldGroup>
            {/* FieldGroup for Phone */}
            <FieldGroup label="Phone" name="phone" error={errors.phone}>
              <TextInput
                name="phone"
                value={data.phone}
                onChange={e => setData('phone', e.target.value)}
                error={errors.phone}
              />
            </FieldGroup>
            {/* FieldGroup for Email */}
            <FieldGroup label="Email" name="email" error={errors.email}>
              <TextInput
                name="email"
                type="email"
                value={data.email}
                onChange={e => setData('email', e.target.value)}
                error={errors.email}
              />
            </FieldGroup>
            {/* FieldGroup for Address */}
            <FieldGroup label="Address" name="address" error={errors.address}>
              <TextInput
                name="address"
                value={data.address}
                onChange={e => setData('address', e.target.value)}
                error={errors.address}
              />
            </FieldGroup>
            {/* FieldGroup for City */}
            <FieldGroup label="City" name="city" error={errors.city}>
              <TextInput
                name="city"
                value={data.city}
                onChange={e => setData('city', e.target.value)}
                error={errors.city}
              />
            </FieldGroup>
            {/* FieldGroup for State */}
            <FieldGroup label="State" name="state" error={errors.state}>
              <TextInput
                name="state"
                value={data.state}
                onChange={e => setData('state', e.target.value)}
                error={errors.state}
              />
            </FieldGroup>
            {/* FieldGroup for Country */}
            <FieldGroup label="Country" name="country" error={errors.country}>
              <SelectInput
                name="country"
                value={data.country}
                onChange={e => setData('country', e.target.value)}
                error={errors.country}
                options={[
                  { value: '', label: '' },
                  { value: 'IN', label: 'India' },
                  // Add other countries as needed
                ]}
              />
            </FieldGroup>
            {/* FieldGroup for Zip Code */}
            <FieldGroup label="Zip Code" name="zip_code" error={errors.zip_code}>
              <TextInput
                name="zip_code"
                value={data.zip_code}
                onChange={e => setData('zip_code', e.target.value)}
                error={errors.zip_code}
              />
            </FieldGroup>
            {/* FieldGroup for PAN No */}
            <FieldGroup label="PAN No" name="pan_no" error={errors.pan_no}>
              <TextInput
                name="pan_no"
                value={data.pan_no}
                onChange={e => setData('pan_no', e.target.value)}
                error={errors.pan_no}
              />
            </FieldGroup>
            {/* FieldGroup for DL No */}
            <FieldGroup label="DL No" name="dl_no" error={errors.dl_no}>
              <TextInput
                name="dl_no"
                value={data.dl_no}
                onChange={e => setData('dl_no', e.target.value)}
                error={errors.dl_no}
              />
            </FieldGroup>
            {/* FieldGroup for CST No */}
            <FieldGroup label="CST No" name="cst_no" error={errors.cst_no}>
              <TextInput
                name="cst_no"
                value={data.cst_no}
                onChange={e => setData('cst_no', e.target.value)}
                error={errors.cst_no}
              />
            </FieldGroup>
            {/* FieldGroup for GST No */}
            <FieldGroup label="GST No" name="gst_no" error={errors.gst_no}>
              <TextInput
                name="gst_no"
                value={data.gst_no}
                onChange={e => setData('gst_no', e.target.value)}
                error={errors.gst_no}
              />
            </FieldGroup>
          </div>
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            {!supplier.deleted_at && (
              <DeleteButton onDelete={destroy}>
                Delete Supplier
              </DeleteButton>
            )}
            <LoadingButton
              loading={processing}
              type="submit"
              className="ml-auto btn-indigo"
            >
              Update Supplier
            </LoadingButton>
          </div>
        </form>
      </div>
      {/* <h2 className="mt-12 mb-6 text-2xl font-bold">Products</h2>
      <Table
        columns={[
          { label: 'Name', name: 'name' },
          { label: 'Product Type', name: 'product_type' },
          { label: 'Product Type', name: 'inventory_item_type' },
          { label: 'Quantity', name: 'quantity' },
          { label: 'Price', name: 'price', colSpan: 2 },
        ]}
        rows={supplier.products}
        getRowDetailsUrl={row => route('products.edit', row.id)}
      /> */}
    </div>
  );
};

export default SupplierEdit;
