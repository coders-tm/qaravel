<?php

namespace Database\Seeders;

use App\Models\User;
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
        Enquiry::factory()->for(User::factory())->count(20)->create()->each(function ($enquiry) {
            for ($i = 0; $i < rand(0, 3); $i++) {
                $reply = Reply::factory()->make();
                $reply->user()->associate(Admin::inRandomOrder()->first());
                $enquiry->replies()->save($reply);
            }
        });
    }
}
