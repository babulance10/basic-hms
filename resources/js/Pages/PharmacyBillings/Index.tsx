import { Link, usePage } from '@inertiajs/react';
import FilterBar from '@/Components/FilterBar/FilterBar';
import Pagination from '@/Components/Pagination/Pagination';
import { PharmacyBilling, PaginatedData } from '@/types';
import Table from '@/Components/Table/Table';

function PharmacyBillingIndex() {
  const { pharmacyBillings } = usePage<{
    pharmacyBillings: PaginatedData<PharmacyBilling>;
  }>().props;

  const {
    data,
    meta: { links }
  } = pharmacyBillings;

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Pharmacy Bills</h1>
      <div className="flex items-center justify-between mb-6">
        <FilterBar />
        <Link
          className="btn-indigo focus:outline-none"
          href={route('pharmacy-bills.create')}
        >
          <span>Create</span>
          <span className="hidden md:inline"> Bills</span>
        </Link>
      </div>
      <Table
        columns={[
          { label: 'ID', name: 'id' },
          { label: 'Appointment ID', name: 'visit_id' },
          { label: 'Pharmacist ID', name: 'pharmacist_id' },
          { label: 'Billing Date', name: 'billing_date' },
          { label: 'Total Amount', name: 'total_amount' },
          { label: 'GST', name: 'gst' },
          { label: 'Notes', name: 'notes' }
        ]}
        rows={data}
        getRowDetailsUrl={row => route('pharmacy-bills.edit', row.id)}
      />
      <Pagination links={links} />
    </div>
  );
}

export default PharmacyBillingIndex;
