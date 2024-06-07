import React from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import LoadingButton from '@/Components/Button/LoadingButton';
import TextInput from '@/Components/Form/TextInput';
import SelectInput from '@/Components/Form/SelectInput';
import FieldGroup from '@/Components/Form/FieldGroup';
import { Manufacturer, ProductType } from '@/types';

const CreateProduct = () => {
  const { data, setData, errors, post, processing } = useForm({
    name: '',
    hsn_code: '',
    scheduled_drug: 'None',
    gst_category: '0%',
    product_type_id: '',
    manufacturer_id: ''
  });
  const { productTypes, manufacturers } = usePage<{
    productTypes: ProductType[];
    manufacturers: Manufacturer[];
  }>().props;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route('products.store'));
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          href={route('products')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Products
        </Link>
        <span className="font-medium text-indigo-600"> /</span> Create
      </h1>
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="p-8">
            <FieldGroup label="Name" name="name" error={errors.name} className='py-4'>
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
              className='py-4'
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
              className='py-4'
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
              className='py-4'
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
              className='py-4'
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
              className='py-4'
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
          </div>
          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-indigo"
            >
              Create Product
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
