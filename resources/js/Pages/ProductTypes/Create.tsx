import { Link, useForm } from '@inertiajs/react';
import LoadingButton from '@/Components/Button/LoadingButton';
import TextInput from '@/Components/Form/TextInput';
import FieldGroup from '@/Components/Form/FieldGroup';

const CreateProductType = () => {
  const { data, setData, errors, post, processing } = useForm({
    name: '',
    description: ''
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route('productTypes.store'));
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          href={route('productTypes')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Product Types
        </Link>
        <span className="font-medium text-indigo-600"> /</span> Create
      </h1>
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="p-8">
            <FieldGroup
              label="Name"
              name="name"
              error={errors.name}
              className='py-4'
            >
              <TextInput
                name="name"
                error={errors.name}
                value={data.name}
                onChange={e => setData('name', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup
              label="Description"
              name="description"
              error={errors.description}
            >
              <TextInput
                name="description"
                error={errors.description}
                value={data.description}
                onChange={e => setData('description', e.target.value)}
              />
            </FieldGroup>
          </div>
          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-indigo"
            >
              Create Product Type
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductType;
