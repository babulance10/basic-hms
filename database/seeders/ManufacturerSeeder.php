<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ManufacturerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $manufacturers = [
            [
                'mfr_code' => 'MFR0001',
                'name' => 'Acme Corporation',
                'address' => '123 Main St, Anytown, USA',
                'contact_number' => '555-1234',
                'email' => 'contact@acmecorp.com',
            ],
            // ... Add more manufacturers as needed ...
        ];

        foreach ($manufacturers as $manufacturer) {
            DB::table('manufacturers')->insert([
                'mfr_code' => $manufacturer['mfr_code'],
                'name' => $manufacturer['name'],
                'address' => $manufacturer['address'],
                'contact_number' => $manufacturer['contact_number'],
                'email' => $manufacturer['email'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
