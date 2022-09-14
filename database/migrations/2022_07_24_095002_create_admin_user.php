<?php

use App\Models\User;
use App\Models\LiveStream;
use Illuminate\Support\Str;
use App\Models\Core\Address;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
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

        $user = User::create([
            'first_name' => 'Coders',
            'last_name' => 'Tm',
            'email' => 'hello@coderstm.com',
            'email_verified_at' => now(),
            'is_free_forever' => true,
            'password' => Hash::make('Gis0ra$$;'),
            'remember_token' => Str::random(10),
        ]);

        $user->updateOrCreateAddress(Address::factory()->make()->toArray());
    }
};
