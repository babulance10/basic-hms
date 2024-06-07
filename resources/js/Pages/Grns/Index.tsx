import { Link, usePage } from '@inertiajs/react';
import FilterBar from '@/Components/FilterBar/FilterBar';
import Pagination from '@/Components/Pagination/Pagination';
import { PaginatedData, GrnItem, Grn } from '@/types';
import Table from '@/Components/Table/Table';
import { Trash2 } from 'lucide-react';

function GrnIndex() {
  const { grns } = usePage<{
    grns: PaginatedData<Grn>;
  }>().props;

  const {
    data,
    meta: { links }
  } = grns;

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Goods Received Note</h1>
      <div className="flex items-center justify-between mb-6">
        <FilterBar />
        <Link
          className="btn-indigo focus:outline-none"
          href={route('grns.create')}
        >
          <span>Create</span>
          <span className="hidden md:inline"> GRN </span>
        </Link>
      </div>
      <Table
        columns={[
          { label: 'Supplier', name: 'supplier_id' },
          { label: 'Received Date', name: 'received_date' },
          { label: 'Bill No', name: 'bill_no' },
          { label: 'Payment Mode', name: 'payment_mode' },
          { label: 'adjustment', name: 'adjustment' },
          { label: 'Remarks', name: 'remarks' }
        ]}
        rows={data}
        getRowDetailsUrl={row => route('grns.edit', row.id)}
      />
      <Pagination links={links} />
    </div>
  );
}

export default GrnIndex;
