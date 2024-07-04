import React from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import LoadingButton from '@/Components/Button/LoadingButton';
import TextInput from '@/Components/Form/TextInput';
import SelectInput from '@/Components/Form/SelectInput';
import FieldGroup from '@/Components/Form/FieldGroup';
import { Patient, Visit } from '@/types';
import { Autocomplete, TextField } from '@mui/material';

const CreateVisit = () => {
  const { data, setData, errors, post, processing } = useForm({
    patient_id: -1,
    start_time: '',
    end_time: '',
    type: 'outpatient',
    reason: '',
    diagnosis: '',
    notes: '',
    status: 'scheduled'
  });

  const { patients } = usePage<{
    patients: Patient[];
  }>().props;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route('visits.store'));
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          href={route('visits')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Visits
        </Link>
        <span className="font-medium text-indigo-600"> /</span> Create
      </h1>
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="p-8">

            <Autocomplete
              onChange={(event, newValue) => {
                setData('patient_id', newValue?.id || 0);
                //setSelectedPatient(newValue);
              }}
              id="combo-box-demo"
              options={patients}
              sx={{ width: 300 }}
              getOptionLabel={option =>
                `${option.first_name} ${option.last_name} `
              }
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Patient Name"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search'
                  }}
                  error={!!errors.patient_id}
                  helperText={errors.patient_id ? errors.patient_id : ''}
                />
              )}
            />

            <FieldGroup
              label="Start Time"
              name="start_time"
              error={errors.start_time}
              className="py-4"
            >
              <TextInput
                name="start_time"
                type="datetime-local"
                error={errors.start_time}
                value={data.start_time}
                onChange={e => setData('start_time', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup
              label="End Time"
              name="end_time"
              error={errors.end_time}
              className="py-4"
            >
              <TextInput
                name="end_time"
                type="datetime-local"
                error={errors.end_time}
                value={data.end_time}
                onChange={e => setData('end_time', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup
              label="Type"
              name="type"
              error={errors.type}
              className="py-4"
            >
              <SelectInput
                name="type"
                error={errors.type}
                value={data.type}
                onChange={e => setData('type', e.target.value)}
                options={[
                  { value: 'inpatient', label: 'Inpatient' },
                  { value: 'outpatient', label: 'Outpatient' }
                ]}
              />
            </FieldGroup>

            <FieldGroup
              label="Reason"
              name="reason"
              error={errors.reason}
              className="py-4"
            >
              <TextInput
                name="reason"
                error={errors.reason}
                value={data.reason}
                onChange={e => setData('reason', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup
              label="Diagnosis"
              name="diagnosis"
              error={errors.diagnosis}
              className="py-4"
            >
              <TextInput
                name="diagnosis"
                error={errors.diagnosis}
                value={data.diagnosis}
                onChange={e => setData('diagnosis', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup
              label="Notes"
              name="notes"
              error={errors.notes}
              className="py-4"
            >
              <TextInput
                name="notes"
                error={errors.notes}
                value={data.notes}
                onChange={e => setData('notes', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup
              label="Status"
              name="status"
              error={errors.status}
              className="py-4"
            >
              <SelectInput
                name="status"
                error={errors.status}
                value={data.status}
                onChange={e => setData('status', e.target.value)}
                options={[
                  { value: 'scheduled', label: 'Scheduled' },
                  { value: 'ongoing', label: 'Ongoing' },
                  { value: 'completed', label: 'Completed' },
                  { value: 'cancelled', label: 'Cancelled' }
                ]}
              />
            </FieldGroup>

            {/* ... rest of the component */}
          </div>
          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={processing}
              type="submit"
              className="btn-indigo"
            >
              Create Visit
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateVisit;
