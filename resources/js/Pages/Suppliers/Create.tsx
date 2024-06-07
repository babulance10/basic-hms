// src/components/CreateSupplier.tsx
import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import LoadingButton from '@/Components/Button/LoadingButton';
import TextInput from '@/Components/Form/TextInput';
import FieldGroup from '@/Components/Form/FieldGroup';
import SelectInput from '@/Components/Form/SelectInput';

const CreateSupplier = () => {
  const { data, setData, errors, post, processing } = useForm({
    name: '',
    contact_person: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zip_code: '',
    pan_no: '',
    dl_no: '',
    cst_no: '',
    gst_no: ''
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route('suppliers.store'));
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          href={route('suppliers')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Suppliers
        </Link>
        <span className="font-medium text-indigo-600"> /</span> Create
      </h1>
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 p-8 lg:grid-cols-2">
            {/* Fields */}
            <FieldGroup label="Name" name="name" error={errors.name}>
              <TextInput
                name="name"
                error={errors.name}
                value={data.name}
                onChange={e => setData('name', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup
              label="Contact Person"
              name="contact_person"
              error={errors.contact_person}
            >
              <TextInput
                name="contact_person"
                error={errors.contact_person}
                value={data.contact_person}
                onChange={e => setData('contact_person', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup label="Phone" name="phone" error={errors.phone}>
              <TextInput
                name="phone"
                error={errors.phone}
                value={data.phone}
                onChange={e => setData('phone', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup label="Email" name="email" error={errors.email}>
              <TextInput
                name="email"
                type="email"
                error={errors.email}
                value={data.email}
                onChange={e => setData('email', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup label="Address" name="address" error={errors.address}>
              <TextInput
                name="address"
                error={errors.address}
                value={data.address}
                onChange={e => setData('address', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup label="City" name="city" error={errors.city}>
              <TextInput
                name="city"
                error={errors.city}
                value={data.city}
                onChange={e => setData('city', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup label="State" name="state" error={errors.state}>
              <TextInput
                name="state"
                error={errors.state}
                value={data.state}
                onChange={e => setData('state', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup label="Country" name="country" error={errors.country}>
              <SelectInput
                name="country"
                value={data.country}
                onChange={e => setData('country', e.target.value)}
                error={errors.country}
                options={[
                  { value: '', label: '' },
                  { value: 'IN', label: 'India' }
                  // Add other countries as needed
                ]}
              />
            </FieldGroup>

            <FieldGroup
              label="Postal Code"
              name="zip_code"
              error={errors.zip_code}
            >
              <TextInput
                name="zip_code"
                error={errors.zip_code}
                value={data.zip_code}
                onChange={e => setData('zip_code', e.target.value)}
              />
            </FieldGroup>
            <FieldGroup label="GST No" name="gst_no" error={errors.gst_no}>
              <TextInput
                name="gst_no"
                error={errors.gst_no}
                value={data.gst_no}
                onChange={e => setData('gst_no', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup label="PAN No" name="pan_no" error={errors.pan_no}>
              <TextInput
                name="pan_no"
                error={errors.pan_no}
                value={data.pan_no}
                onChange={e => setData('pan_no', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup label="DL No" name="dl_no" error={errors.dl_no}>
              <TextInput
                name="dl_no"
                error={errors.dl_no}
                value={data.dl_no}
                onChange={e => setData('dl_no', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup label="CST No" name="cst_no" error={errors.cst_no}>
              <TextInput
                name="cst_no"
                error={errors.cst_no}
                value={data.cst_no}
                onChange={e => setData('cst_no', e.target.value)}
              />
            </FieldGroup>
          </div>
          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-indigo"
            >
              Create Supplier
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSupplier;
