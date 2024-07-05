<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Menu;
use Illuminate\Support\Facades\DB;

class MenuTableSeeder extends Seeder
{
    public function run()
    {
        // Parent menu items
        $parent1 = Menu::create([
            'name' => 'Dashboard',
            'icon' => 'CircleGauge',
            'url'  => 'dashboard',
            'order' => 1,
            'status' => true
        ]);

        $parent2 = Menu::create([
            'name' => 'Patients',
            'icon' => 'User',
            'url'  => 'patients',
            'order' => 2,
            'status' => true
        ]);

        DB::table('menus')->truncate();

        // Manually specify the entries for the menu items.
        $menus = [
            ['parent_id' => null, 'name' => 'Dashboard', 'icon' => 'CircleGauge', 'url' => 'dashboard', 'order' => 1, 'status' => true],
            ['parent_id' => null, 'name' => 'Patients', 'icon' => 'User', 'url' => 'patients', 'order' => 2, 'status' => true],
            ['parent_id' => null, 'name' => 'Appointment', 'icon' => 'InsertInvitationOutlined', 'url' => 'visits', 'order' => 3, 'status' => true],
            ['parent_id' => null, 'name' => 'Suppliers', 'icon' => 'LocalShippingIcon', 'url' => 'suppliers', 'order' => 4, 'status' => true],
            ['parent_id' => null, 'name' => 'Product Types', 'icon' => 'CategoryIcon', 'url' => 'productTypes', 'order' => 5, 'status' => true],
            ['parent_id' => null, 'name' => 'Products', 'icon' => 'ShoppingCartIcon', 'url' => 'products', 'order' => 6, 'status' => true],
            ['parent_id' => null, 'name' => 'Goods Recieved Note', 'icon' => 'AssignmentTurnedIn', 'url' => 'grns', 'order' => 7, 'status' => true],
            ['parent_id' => null, 'name' => 'Pharmacy Bills', 'icon' => 'ReceiptIcon', 'url' => 'pharmacy-bills', 'order' => 8, 'status' => true],
           
        ];

        // Insert the menu entries into the database.
        foreach ($menus as $menu) {
            DB::table('menus')->insert([
                'parent_id' => $menu['parent_id'],
                'name' => $menu['name'],
                'icon' => $menu['icon'],
                'url' => $menu['url'],
                'order' => $menu['order'],
                'status' => $menu['status'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
