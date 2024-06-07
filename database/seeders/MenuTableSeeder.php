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
            ['parent_id' => null, 'name' => 'Product Types', 'icon' => null, 'url' => 'productTypes', 'order' => 3, 'status' => true],
            ['parent_id' => null, 'name' => 'Products', 'icon' => null, 'url' => 'products', 'order' => 4, 'status' => true],
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
