import { Link, usePage } from '@inertiajs/react';
import FilterBar from '@/Components/FilterBar/FilterBar';
import Pagination from '@/Components/Pagination/Pagination';
import { Supplier, PaginatedData } from '@/types';
import Table from '@/Components/Table/Table';
import { Trash2 } from 'lucide-react';

function SupplierIndex() {
  const { suppliers } = usePage<{
    suppliers: PaginatedData<Supplier>;
  }>().props;

  const {
    data,
    meta: { links }
  } = suppliers;

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Suppliers</h1>
      <div className="flex items-center justify-between mb-6">
        <FilterBar />
        <Link
          className="btn-indigo focus:outline-none"
          href={route('suppliers.create')}
        >
          <span>Create</span>
          <span className="hidden md:inline"> Supplier</span>
        </Link>
      </div>
      <Table
        columns={[
          { label: 'Name', name: 'name' },
          { label: 'Contact Person', name: 'contact_person' },
          { label: 'Phone', name: 'phone' },
          { label: 'Email', name: 'email' },
          { label: 'Address', name: 'address' },
          { label: 'City', name: 'city' },
          { label: 'State', name: 'state' },
          { label: 'Country', name: 'country' },
          { label: 'Postal Code', name: 'zip_code' },
          { label: 'PAN No', name: 'pan_no' },
          { label: 'DL No', name: 'dl_no' },
          { label: 'CST No', name: 'cst_no' },
          { label: 'GST No', name: 'gst_no' },
          {
            label: '',
            name: 'actions',
            renderCell: row => (
              <>
                {row.deleted_at && (
                  <Trash2 size={16} className="ml-2 text-gray-400" />
                )}
              </>
            )
          }
        ]}
        rows={data}
        getRowDetailsUrl={row => route('suppliers.edit', row.id)}
      />
      <Pagination links={links} />
    </div>
  );
}

export default SupplierIndex;
