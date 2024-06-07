import React from 'react';
import { Head } from '@inertiajs/react';
import { Link, usePage, useForm, router } from '@inertiajs/react';
import DeleteButton from '@/Components/Button/DeleteButton';
import LoadingButton from '@/Components/Button/LoadingButton';
import TextInput from '@/Components/Form/TextInput';
import SelectInput from '@/Components/Form/SelectInput';
import TrashedMessage from '@/Components/Messages/TrashedMessage';
import { Product, ProductType, Manufacturer } from '@/types';
import Table from '@/Components/Table/Table';
import FieldGroup from '@/Components/Form/FieldGroup';

const EditProduct = () => {
  const { product, productTypes, manufacturers } = usePage<{
    product: Product;
    productTypes: ProductType[];
    manufacturers: Manufacturer[];
  }>().props;
  const { data, setData, errors, put, processing } = useForm({
    name: product.name || '',
    hsn_code: product.hsn_code || '',
    scheduled_drug: product.scheduled_drug || 'None',
    gst_category: product.gst_category || '0%',
    product_type_id: product.product_type_id || '',
    manufacturer_id: product.manufacturer_id || ''
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    put(route('products.update', product.id));
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this product?')) {
      router.delete(route('products.destroy', product.id));
    }
  }

  function restore() {
    if (confirm('Are you sure you want to restore this product?')) {
      router.put(route('products.restore', product.id));
    }
  }

  return (
    <div>
      <Head title={data.name} />
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          href={route('products')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Products
        </Link>
        <span className="mx-2 font-medium text-indigo-600">/</span>
        {data.name}
      </h1>
      {product.deleted_at && (
        <TrashedMessage
          message="This product has been deleted."
          onRestore={restore}
        />
      )}
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 p-8 lg:grid-cols-2">
            {/* Add your form fields here */}
            <FieldGroup label="Name" name="name" error={errors.name}>
              <TextInput
                name="name"
                error={errors.name}
                value={data.name}
                onChange={e => setData('name', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup
              label="HSN Code"
              name="hsn_code"
              error={errors.hsn_code}
            >
              <TextInput
                name="hsn_code"
                type="number"
                error={errors.hsn_code}
                value={data.hsn_code}
                onChange={e => setData('hsn_code', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup
              label="Scheduled Drug"
              name="scheduled_drug"
              error={errors.scheduled_drug}
            >
              <SelectInput
                name="scheduled_drug"
                error={errors.scheduled_drug}
                value={data.scheduled_drug}
                onChange={e => setData('scheduled_drug', e.target.value)}
                options={[
                  { value: 'H', label: 'H' },
                  { value: 'H1', label: 'H1' },
                  { value: 'X', label: 'X' },
                  { value: 'G', label: 'G' },
                  { value: 'I', label: 'I' },
                  { value: 'J', label: 'J' },
                  { value: 'None', label: 'None' }
                ]}
              />
            </FieldGroup>

            <FieldGroup
              label="GST Category"
              name="gst_category"
              error={errors.gst_category}
            >
              <SelectInput
                name="gst_category"
                error={errors.gst_category}
                value={data.gst_category}
                onChange={e => setData('gst_category', e.target.value)}
                options={[
                  { value: '0%', label: '0%' },
                  { value: '5%', label: '5%' },
                  { value: '12%', label: '12%' },
                  { value: '18%', label: '18%' },
                  { value: '28%', label: '28%' }
                ]}
              />
            </FieldGroup>

            <FieldGroup
              label="Product Type"
              name="product_type_id"
              error={errors.product_type_id}
            >
              <SelectInput
                name="product_type_id"
                error={errors.product_type_id}
                value={data.product_type_id}
                onChange={e => setData('product_type_id', e.target.value)}
                options={productTypes.map(type => ({
                  value: type.id+'',
                  label: type.name
                }))}
              />
            </FieldGroup>

            <FieldGroup
              label="Manufacturer"
              name="manufacturer_id"
              error={errors.manufacturer_id}
            >
              <SelectInput
                name="manufacturer_id"
                error={errors.manufacturer_id}
                value={data.manufacturer_id}
                onChange={e => setData('manufacturer_id', e.target.value)}
                options={manufacturers.map(manufacturer => ({
                  value: manufacturer.id+'',
                  label: manufacturer.name
                }))}
              />
            </FieldGroup>

            {/* ... other fields ... */}
          </div>
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            {!product.deleted_at && (
              <DeleteButton onDelete={destroy}>Delete Product</DeleteButton>
            )}
            <LoadingButton
              loading={processing}
              type="submit"
              className="ml-auto btn-indigo"
            >
              Update Product
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
