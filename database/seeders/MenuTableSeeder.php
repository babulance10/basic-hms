<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Menu;

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

        // More menu items...
    }
}
