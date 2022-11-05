<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Core\Address;
use App\Models\Core\Enquiry;
use Illuminate\Database\Seeder;
use App\Models\Core\Enquiry\Reply;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class EnquirySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Enquiry::factory()->count(20)->has(Reply::factory()->has(Admin::factory(), 'user')->count(rand(3, 5)))->create();
    }
}
