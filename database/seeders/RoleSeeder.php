<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $adminRole = Role::create([
            'name' => 'Admin',
            'slug' => 'admin',
        ]);
        $userRole = Role::create([
            'name' => 'User',
            'slug' => 'user',
        ]);
        $staffRole = Role::create([
            'name' => 'Staff',
            'slug' => 'staff',
        ]);
    }
}
