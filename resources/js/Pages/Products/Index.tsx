import { Link, usePage } from '@inertiajs/react';
import FilterBar from '@/Components/FilterBar/FilterBar';
import Pagination from '@/Components/Pagination/Pagination';
import { Product, PaginatedData } from '@/types';
import Table from '@/Components/Table/Table';
import { Trash2 } from 'lucide-react';

function ProductIndex() {
  const { products } = usePage<{
    products: PaginatedData<Product>;
  }>().props;

  const {
    data,
    meta: { links }
  } = products;

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Products</h1>
      <div className="flex items-center justify-between mb-6">
        <FilterBar />
        <Link
          className="btn-indigo focus:outline-none"
          href={route('products.create')}
        >
          <span>Create</span>
          <span className="hidden md:inline"> Product</span>
        </Link>
      </div>
      <Table
        columns={[
          { label: 'Name', name: 'name' },
          { label: 'HSN Code', name: 'hsn_code' },
          { label: 'Scheduled Drug', name: 'scheduled_drug' },
          { label: 'GST Category', name: 'gst_category' },
          { label: 'Product Type', name: 'product_type.name' },
          { label: 'Manufacturer', name: 'manufacturer.name' },
        ]}
        rows={data}
        getRowDetailsUrl={row => route('products.edit', row.id)}
      />
      <Pagination links={links} />
    </div>
  );
}

export default ProductIndex;
