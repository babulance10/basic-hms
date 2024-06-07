import React from 'react';
import { Head } from '@inertiajs/react';
import { Link, usePage, useForm, router } from '@inertiajs/react';
import DeleteButton from '@/Components/Button/DeleteButton';
import LoadingButton from '@/Components/Button/LoadingButton';
import TextInput from '@/Components/Form/TextInput';
import FieldGroup from '@/Components/Form/FieldGroup'; // Don't forget to import FieldGroup!
import { ProductType } from '@/types';
import TrashedMessage from '@/Components/Messages/TrashedMessage';

const EditProductType = () => {
  const { productType } = usePage<{ productType: ProductType }>().props;
  const { data, setData, errors, put, processing } = useForm({
    name: productType.name || '',
    description: productType.description || '', // Include the description field
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    put(route('productTypes.update', productType.id));
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this product type?')) {
      router.delete(route('productTypes.destroy', productType.id));
    }
  }

  function restore() {
    if (confirm('Are you sure you want to restore this product type?')) {
      router.put(route('productTypes.restore', productType.id));
    }
  }

  return (
    <div>
      <Head title={'Edit ' + data.name} />
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          href={route('productTypes')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Product Types
        </Link>
        <span className="mx-2 font-medium text-indigo-600">/</span>
        Edit {data.name}
      </h1>
      {productType.deleted_at && (
        <TrashedMessage
          message="This product type has been deleted."
          onRestore={restore}
        />
      )}
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 p-8 lg:grid-cols-2">
            <FieldGroup label="Name" name="name" error={errors.name}>
              <TextInput
                name="name"
                error={errors.name}
                value={data.name}
                onChange={e => setData('name', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup label="Description" name="description" error={errors.description}>
              <TextInput
                name="description"
                error={errors.description}
                value={data.description}
                onChange={e => setData('description', e.target.value)}
              />
            </FieldGroup>
            {/* Add other fields here */}
          </div>
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            {!productType.deleted_at && (
              <DeleteButton onDelete={destroy}>
                Delete Product Type
              </DeleteButton>
            )}
            <LoadingButton
              loading={processing}
              type="submit"
              className="ml-auto btn-indigo"
            >
              Update Product Type
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};



export default EditProductType;
