import { Link, usePage } from '@inertiajs/react';
import FilterBar from '@/Components/FilterBar/FilterBar';
import Pagination from '@/Components/Pagination/Pagination';
import { Patient, PaginatedData } from '@/types';
import Table from '@/Components/Table/Table';
import { Trash2 } from 'lucide-react';

function Index() {
  const { patients } = usePage<{
    patients: PaginatedData<Patient>;
  }>().props;

  const {
    data,
    meta: { links }
  } = patients;

  return (
    <div>
    <h1 className="mb-8 text-3xl font-bold">Patients</h1>
    <div className="flex items-center justify-between mb-6">
      <FilterBar />
      <Link
        className="btn-indigo focus:outline-none"
        href={route('patients.create')}
      >
        <span>Create</span>
        <span className="hidden md:inline"> Patient</span>
      </Link>
    </div>
    <Table
      columns={[
        {
          label: 'First Name',
          name: 'first_name',
          renderCell: row => (
            <>
              {row.first_name}
              {row.deleted_at && (
                <Trash2 size={16} className="ml-2 text-gray-400" />
              )}
            </>
          )
        },
        {
          label: 'Last Name',
          name: 'last_name',
          renderCell: row => (
            <>
              {row.last_name}
              {row.deleted_at && (
                <Trash2 size={16} className="ml-2 text-gray-400" />
              )}
            </>
          )
        },
        { label: 'Email', name: 'email' },
        { label: 'Phone', name: 'phone',  },
        { label: 'Address', name: 'address', colSpan: 1 },
        { label: 'Gender', name: 'gender' },
        { label: 'Birth Date', name: 'birth_date' }
      ]}
      rows={data}
      getRowDetailsUrl={row => route('patients.edit', row.id)}
    />
    <Pagination links={links} />
  </div>
  
  );
}

export default Index;
