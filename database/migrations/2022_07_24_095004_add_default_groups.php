<?php

use App\Models\Admin;
use App\Models\Core\Group;
use App\Models\Core\Permission;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $group = Group::firstOrCreate([
            'name' => 'Admin',
            'description' => 'Full access to the system',
        ]);

        $sales = Group::firstOrCreate([
            'name' => 'Sales',
            'description' => 'Limited access to the system',
        ]);

        Admin::first()->groups()->attach($group);

        $group->syncPermissions(collect(Permission::all())->mapWithKeys(function ($permission, $key) {
            return [$key => [
                'id' => $permission['id'],
                'access' => true,
            ]];
        }));

        $sales->syncPermissions(collect(Permission::where('scope', 'like', '%list%')->orWhere('scope', 'like', '%view%')->get())->mapWithKeys(function ($permission, $key) {
            return [$key => [
                'id' => $permission['id'],
                'access' => true,
            ]];
        }));
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
