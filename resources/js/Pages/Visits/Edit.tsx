import React from 'react';
import { Head } from '@inertiajs/react';
import { Link, usePage, useForm, router } from '@inertiajs/react';
import DeleteButton from '@/Components/Button/DeleteButton';
import LoadingButton from '@/Components/Button/LoadingButton';
import TextInput from '@/Components/Form/TextInput';
import SelectInput from '@/Components/Form/SelectInput';
import TrashedMessage from '@/Components/Messages/TrashedMessage';
import { Visit, Patient } from '@/types';
import FieldGroup from '@/Components/Form/FieldGroup';

const EditVisit = () => {
  const { visit, patients } = usePage<{
    visit: Visit;
    patients: { id: number; first_name: string; last_name: string };
  }>().props;
  const { data, setData, errors, put, processing } = useForm({
    patient_id: visit.patient_id || 0,
    start_time: visit.start_time || '',
    end_time: visit.end_time || '',
    type: visit.type || 'outpatient',
    reason: visit.reason || '',
    diagnosis: visit.diagnosis || '',
    notes: visit.notes || '',
    status: visit.status || 'scheduled'
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    put(route('visits.update', visit.id));
  }

  function destroy() {
    if (confirm('Are you sure you want to delete this visit?')) {
      router.delete(route('visits.destroy', visit.id));
    }
  }

  function restore() {
    if (confirm('Are you sure you want to restore this visit?')) {
      router.put(route('visits.restore', visit.id));
    }
  }

  return (
    <div>
      <Head title={`Edit Visit - ${data.patient_id}`} />
      <h1 className="mb-8 text-3xl font-bold">
        <Link
          href={route('visits')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Appoinments
        </Link>
        <span className="mx-2 font-medium text-indigo-600">/</span>
        Edit {`${patients.first_name} ${patients.last_name}`}
      </h1>
      {visit.deleted_at && (
        <TrashedMessage
          message="This visit has been deleted."
          onRestore={restore}
        />
      )}
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 p-8 lg:grid-cols-2">
            {/* Add your form fields here */}
            <FieldGroup
              label="Start Time"
              name="start_time"
              error={errors.start_time}
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
            >
              <TextInput
                name="end_time"
                type="datetime-local"
                error={errors.end_time}
                value={data.end_time}
                onChange={e => setData('end_time', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup label="Type" name="type" error={errors.type}>
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

            <FieldGroup label="Reason" name="reason" error={errors.reason}>
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
            >
              <TextInput
                name="diagnosis"
                error={errors.diagnosis}
                value={data.diagnosis}
                onChange={e => setData('diagnosis', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup label="Notes" name="notes" error={errors.notes}>
              <TextInput
                name="notes"
                error={errors.notes}
                value={data.notes}
                onChange={e => setData('notes', e.target.value)}
              />
            </FieldGroup>

            <FieldGroup label="Status" name="status" error={errors.status}>
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
          </div>
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            {!visit.deleted_at && (
              <DeleteButton onDelete={destroy}>Delete Visit</DeleteButton>
            )}
            <LoadingButton
              loading={processing}
              type="submit"
              className="ml-auto btn-indigo"
            >
              Update Visit
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVisit;
