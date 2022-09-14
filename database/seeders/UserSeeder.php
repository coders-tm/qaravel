<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Core\Address;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->count(20)->create()->each(function ($user) {
            $user->updateOrCreateAddress(Address::factory()->make()->toArray());
        });
    }
}
