<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductTypeSeeder extends Seeder
{
    public function run()
    {
        $productTypes = [
            ['name' => 'Prescription Drugs', 'description' => 'Medications that require a doctor\'s prescription.'],
            ['name' => 'Over-the-Counter (OTC)', 'description' => 'Medications available without a prescription.'],
            ['name' => 'Vitamins & Supplements', 'description' => 'Dietary supplements and vitamins.'],
            ['name' => 'Personal Care', 'description' => 'Personal care products such as skincare and hygiene items.'],
            ['name' => 'Medical Devices', 'description' => 'Devices used for medical purposes like glucose meters.'],
            ['name' => 'Herbal Medicine', 'description' => 'Natural medicines and herbal remedies.'],
            ['name' => 'First Aid', 'description' => 'First aid supplies like bandages and antiseptics.'],
            ['name' => 'Home Health Care', 'description' => 'Equipment for home-based care, such as walkers.'],
            ['name' => 'Cosmetics', 'description' => 'Beauty products and cosmetics.'],
            ['name' => 'Child Care', 'description' => 'Products for infant and child care.']
        ];

        foreach ($productTypes as $type) {
            DB::table('product_types')->insert([
                'name' => $type['name'],
                'description' => $type['description']
            ]);
        }
    }
}
