import { Link, usePage } from '@inertiajs/react';
import FilterBar from '@/Components/FilterBar/FilterBar';
import Pagination from '@/Components/Pagination/Pagination';
import { ProductType, PaginatedData } from '@/types';
import Table from '@/Components/Table/Table';
import { Trash2 } from 'lucide-react';

function ProductTypeIndex() {
  const { productTypes } = usePage<{
    productTypes: PaginatedData<ProductType>;
  }>().props;

  const {
    data,
    meta: { links }
  } = productTypes;

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Product Types</h1>
      <div className="flex items-center justify-between mb-6">
        <FilterBar />
        <Link
          className="btn-indigo focus:outline-none"
          href={route('productTypes.create')}
        >
          <span>Create</span>
          <span className="hidden md:inline"> Product Type</span>
        </Link>
      </div>
      <Table
        columns={[
          {
            label: 'Name',
            name: 'name',
            renderCell: row => (
              <>
                {row.name}
                {row.deleted_at && (
                  <Trash2 size={16} className="ml-2 text-gray-400" />
                )}
              </>
            )
          },
          {
            label: 'Description',
            name: 'description',
            renderCell: row => (
              <>
                {row.description}
                {row.deleted_at && (
                  <Trash2 size={16} className="ml-2 text-gray-400" />
                )}
              </>
            )
          }
        ]}
        rows={data}
        getRowDetailsUrl={row => route('productTypes.edit', row.id)}
      />
      <Pagination links={links} />
    </div>
  );
}

export default ProductTypeIndex;
