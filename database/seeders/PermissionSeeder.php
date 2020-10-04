<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $adminRole = Role::where('slug', 'admin')->first();
        $userRole = Role::where('slug', 'user')->first();
        $staffRole = Role::where('slug', 'staff')->first();

        $adminUser = User::find(1);
        $userUser = User::find(2);
        $staffUser = User::find(3);

        Permission::create([
            'module' => 'Product',
            'name' => 'Store',
            'slug' => 'store-product',
        ]);

        Permission::create([
            'module' => 'Product',
            'name' => 'Show',
            'slug' => 'show-product',
        ]);

        Permission::create([
            'module' => 'Product',
            'name' => 'Update',
            'slug' => 'update-product',
        ]);

        Permission::create([
            'module' => 'Product',
            'name' => 'Destroy',
            'slug' => 'destroy-product',
        ]);

        Permission::create([
            'module' => 'Category',
            'name' => 'Store',
            'slug' => 'store-category',
        ]);

        Permission::create([
            'module' => 'Category',
            'name' => 'Show',
            'slug' => 'show-category',
        ]);

        Permission::create([
            'module' => 'Category',
            'name' => 'Update',
            'slug' => 'update-category',
        ]);

        Permission::create([
            'module' => 'Category',
            'name' => 'Destroy',
            'slug' => 'destroy-category',
        ]);

        Permission::create([
            'module' => 'Tag',
            'name' => 'Store',
            'slug' => 'store-tag',
        ]);

        Permission::create([
            'module' => 'Tag',
            'name' => 'Show',
            'slug' => 'show-tag',
        ]);

        Permission::create([
            'module' => 'Tag',
            'name' => 'Update',
            'slug' => 'update-tag',
        ]);

        Permission::create([
            'module' => 'Tag',
            'name' => 'Destroy',
            'slug' => 'destroy-tag',
        ]);

        Permission::create([
            'module' => 'User',
            'name' => 'Store',
            'slug' => 'store-user',
        ]);

        Permission::create([
            'module' => 'User',
            'name' => 'Show',
            'slug' => 'show-user',
        ]);

        Permission::create([
            'module' => 'User',
            'name' => 'Update',
            'slug' => 'update-user',
        ]);

        Permission::create([
            'module' => 'User',
            'name' => 'Destroy',
            'slug' => 'destroy-user',
        ]);

        Permission::create([
            'module' => 'Order',
            'name' => 'Store',
            'slug' => 'store-order',
        ]);

        Permission::create([
            'module' => 'Order',
            'name' => 'Show',
            'slug' => 'show-order',
        ]);

        Permission::create([
            'module' => 'Order',
            'name' => 'Update',
            'slug' => 'update-order',
        ]);

        Permission::create([
            'module' => 'Order',
            'name' => 'Destroy',
            'slug' => 'destroy-order',
        ]);

        Permission::create([
            'module' => 'Settings',
            'name' => 'App',
            'slug' => 'app-settings',
        ]);

        $adminPermissions = Permission::where('slug', 'like', 'store%')
                                    ->orWhere('slug', 'like', 'show%')
                                    ->orWhere('slug', 'like', 'destroy%')
                                    ->orWhere('slug', 'like', 'update%')
                                    ->get();
        $userPermissions = Permission::where('slug', 'like', '%product')
                                    ->orWhere('slug', 'like', '%order')
                                    ->get();
        $staffPermissions = Permission::where('slug', 'like', '%product')
                                    ->orWhere('slug', 'like', '%order')
                                    ->orWhere('slug', 'like', '%category')
                                    ->orWhere('slug', 'like', '%tag')
                                    ->orWhere('slug', 'like', '%settings')
                                    ->get();
        $adminRole->permissions()->attach($adminPermissions);
        $adminUser->permissions()->attach($adminPermissions);
        $userRole->permissions()->attach($userPermissions);
        $userUser->permissions()->attach($userPermissions);
        $staffRole->permissions()->attach($staffPermissions);
        $staffUser->permissions()->attach($staffPermissions);

    }
}
