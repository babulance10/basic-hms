<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProductType;
use App\Models\Product;
use App\Models\Supplier;

class PharmacyInventorySeeder extends Seeder
{
    public function run()
    {

        $suppliers = [
            [
                'name' => 'MediFast Pharma',
                'contact_person' => 'John Doe',
                'phone' => '123-456-7890',
                'email' => 'contact@medifastpharma.com',
                'address' => '1234 Medicine Ave',
                'city' => 'Healthville',
                'state' => 'Wellness',
                'country' => 'Pharmaland',
                'zip_code' => '123456',
                'pan_no' => 'ABCDE1234F',
                'dl_no' => 'DL1234567890',
                'cst_no' => 'CST1234567',
                'gst_no' => 'GST12345678A'
            ],
            [
                'name' => 'HealthPlus Distributors',
                'contact_person' => 'Jane Smith',
                'phone' => '098-765-4321',
                'email' => 'info@healthplusdistributors.com',
                'address' => '5678 Wellness Blvd',
                'city' => 'Care City',
                'state' => 'Healstate',
                'country' => 'Remedy Republic',
                'zip_code' => '654321',
                'pan_no' => 'BCDEF1234G',
                'dl_no' => 'DL0987654321',
                'cst_no' => 'CST7654321',
                'gst_no' => 'GST87654321B'
            ],
        ];
        $supplierId = '';
        foreach ($suppliers as $supplier) {
            $supplierId = Supplier::create($supplier);
        }

        // Create Product Types
        $perishable = ProductType::create(['name' => 'Perishable']);
        $nonPerishable = ProductType::create(['name' => 'Non-Perishable']);
        $controlled = ProductType::create(['name' => 'Controlled Substance']);
        $bulk = ProductType::create(['name' => 'Bulk']);
        $sample = ProductType::create(['name' => 'Sample']);
        $specialOrder = ProductType::create(['name' => 'Special Order']);
        $regular = ProductType::create(['name' => 'Regular']);
        $emergency = ProductType::create(['name' => 'Emergency']);
        $seasonal = ProductType::create(['name' => 'Seasonal']);
        $promo = ProductType::create(['name' => 'Promotional']);
        $consignment = ProductType::create(['name' => 'Consignment']);

        // Create Products
        $items = [
            ['name' => 'Amoxicillin',  'productType' => $perishable, 'quantity' => 100, 'price' => 10.50],
            ['name' => 'Ibuprofen',  'productType' => $nonPerishable, 'quantity' => 200, 'price' => 5.00],
            ['name' => 'Cetirizine',  'productType' => $nonPerishable, 'quantity' => 150, 'price' => 7.00],
            ['name' => 'Multivitamins',  'productType' => $nonPerishable, 'quantity' => 300, 'price' => 15.00],
            ['name' => 'Aspirin',  'productType' => $nonPerishable, 'quantity' => 250, 'price' => 4.50],
            ['name' => 'Loratadine',  'productType' => $nonPerishable, 'quantity' => 120, 'price' => 6.50],
            ['name' => 'Insulin',  'productType' => $perishable, 'quantity' => 90, 'price' => 25.00],
            ['name' => 'Salbutamol Inhaler',  'productType' => $nonPerishable, 'quantity' => 85, 'price' => 13.00],
            ['name' => 'Band-Aids',  'productType' => $nonPerishable, 'quantity' => 500, 'price' => 2.00],
            ['name' => 'Antiseptic Cream',  'productType' => $nonPerishable, 'quantity' => 180, 'price' => 5.50],
            ['name' => 'Vitamin D3',  'productType' => $nonPerishable, 'quantity' => 220, 'price' => 12.00],
            ['name' => 'Omega-3 Fish Oil',  'productType' => $nonPerishable, 'quantity' => 200, 'price' => 20.00],
            // ... Add more items as needed
        ];

        foreach ($items as $item) {
            Product::create([
                'name' => $item['name'],
                //'supplier_id' => $supplierId->id,
                'product_type_id' => $item['productType']->id,
                //'quantity' => $item['quantity'],
                //'price' => $item['price']
                'manufacturer_id' => 1,
                'scheduled_drug' => 'H',
                'gst_category' => '12%',
                'hsn_code' => '30041030',
            ]);
        }
    }
}
