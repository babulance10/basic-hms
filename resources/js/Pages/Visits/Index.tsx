import { Link, usePage } from '@inertiajs/react';
import FilterBar from '@/Components/FilterBar/FilterBar';
import Pagination from '@/Components/Pagination/Pagination';
import { Visit, PaginatedData } from '@/types';
import Table from '@/Components/Table/Table';

function VisitIndex() {
  const { visits } = usePage<{
    visits: PaginatedData<Visit>;
  }>().props;

  const {
    data,
    meta: { links }
  } = visits;

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Visits</h1>
      <div className="flex items-center justify-between mb-6">
        <FilterBar />
        <Link
          className="btn-indigo focus:outline-none"
          href={route('visits.create')}
        >
          <span>Create</span>
          <span className="hidden md:inline"> Visit</span>
        </Link>
      </div>
      <Table
        columns={[
          { label: 'Patient ID', name: 'patient_id' },
          { label: 'Start Time', name: 'start_time' },
          { label: 'End Time', name: 'end_time' },
          { label: 'Type', name: 'type' },
          { label: 'Reason', name: 'reason' },
          { label: 'Diagnosis', name: 'diagnosis' },
          { label: 'Status', name: 'status' }
        ]}
        rows={data}
        getRowDetailsUrl={row => route('visits.edit', row.id)}
      />
      <Pagination links={links} />
    </div>
  );
}

export default VisitIndex;
