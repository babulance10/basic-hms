import React from 'react';
import { Head } from '@inertiajs/react';
import { Link, usePage, useForm, router } from '@inertiajs/react';
import DeleteButton from '@/Components/Button/DeleteButton';
import LoadingButton from '@/Components/Button/LoadingButton';
import TextInput from '@/Components/Form/TextInput';
import SelectInput from '@/Components/Form/SelectInput';
import TrashedMessage from '@/Components/Messages/TrashedMessage';
import { Patient } from '@/types';
import Table from '@/Components/Table/Table';
import FieldGroup from '@/Components/Form/FieldGroup';

const Edit = () => {
  const { patient } = usePage<{ patient: Patient }>().props;
  const { data, setData, errors, put, processing } = useForm({
    first_name: patient.first_name || '',
    last_name: patient.last_name || '',
    email: patient.email || '',
    phone: patient.phone || '',
    address: patient.address || '',
    gender: patient.gender || '',
    birth_date: patient.birth_date || ''
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    put(route('patients.update', patient.id));
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this patient?')) {
      router.delete(route('patients.destroy', patient.id));
    }
  }

  function restore() {
    if (confirm('Are you sure you want to restore this patient?')) {
      router.put(route('patients.restore', patient.id));
    }
  }

  return (
    <div>
      <Head title={data.first_name + ' ' + data.last_name} />
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          href={route('patients')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Patients
        </Link>
        <span className="mx-2 font-medium text-indigo-600">/</span>
        {data.first_name + ' ' + data.last_name}
      </h1>
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 p-8 lg:grid-cols-2">
            <FieldGroup
              label="First Name"
              name="first_name"
              error={errors.first_name}
            >
              <TextInput
                name="first_name"
                error={errors.first_name}
                value={data.first_name}
                onChange={e => setData('first_name', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup
              label="Last Name"
              name="last_name"
              error={errors.last_name}
            >
              <TextInput
                name="last_name"
                error={errors.last_name}
                value={data.last_name}
                onChange={e => setData('last_name', e.target.value)}
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

            <FieldGroup label="Phone" name="phone" error={errors.phone}>
              <TextInput
                name="phone"
                error={errors.phone}
                value={data.phone}
                onChange={e => setData('phone', e.target.value)}
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

            <FieldGroup label="Gender" name="gender" error={errors.gender}>
              <SelectInput
                name="gender"
                error={errors.gender}
                value={data.gender}
                onChange={e => setData('gender', e.target.value)}
                options={[
                  {
                    value: '',
                    label: 'Select Gender'
                  },
                  {
                    value: 'male',
                    label: 'Male'
                  },
                  {
                    value: 'female',
                    label: 'Female'
                  },
                  {
                    value: 'other',
                    label: 'Other'
                  }
                ]}
              />
            </FieldGroup>

            <FieldGroup
              label="Birth Date"
              name="birth_date"
              error={errors.birth_date}
            >
              <TextInput
                name="birth_date"
                type="date"
                error={errors.birth_date}
                value={data.birth_date}
                onChange={e => setData('birth_date', e.target.value)}
              />
            </FieldGroup>
          </div>
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="ml-auto btn-indigo"
            >
              Update Patient
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
