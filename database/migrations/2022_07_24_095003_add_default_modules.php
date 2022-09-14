<?php

use App\Models\Core\Module;
use App\Models\Core\Permission;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        $permissions = [
            'Staff' => [
                'sort_order' => 1,
                'icon' => 'fas fa-user-shield',
                'url' => 'staff',
                'show_menu' => 1,
                'sub_items' => [
                    'View',
                    'Edit',
                    'List',
                    'New',
                    'Delete',
                ],
            ],
            'Groups' => [
                'sort_order' => 2,
                'icon' => 'fas fa-user-group',
                'url' => 'groups',
                'show_menu' => 1,
                'sub_items' => [
                    'View',
                    'Edit',
                    'List',
                    'New',
                    'Delete',
                ],
            ],
            'Members' => [
                'sort_order' => 3,
                'icon' => 'fas fa-user-tag',
                'url' => 'members',
                'show_menu' => 1,
                'sub_items' => [
                    'View',
                    'Edit',
                    'List',
                    'New',
                    'Delete',
                ],
            ],
        ];

        foreach ($permissions as $name => $item) {
            $module = Module::create([
                'name' => $name,
                'icon' => $item['icon'],
                'url' => $item['url'],
                'show_menu' => $item['show_menu'],
                'sort_order' => $item['sort_order'],
            ]);

            foreach ($item['sub_items'] as $i => $sub_item) {
                Permission::create([
                    'module_id' => $module['id'],
                    'action' => $sub_item,
                    'scope' => Str::slug($module['name']) . ':' . Str::slug($sub_item),
                ]);
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
