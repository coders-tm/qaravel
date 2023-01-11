<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('enquiries', function (Blueprint $table) {
            $table->id();

            $table->string('name')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('subject')->nullable();
            $table->text('message')->nullable();
            $table->boolean('seen')->nullable()->default(false);
            $table->string('status')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('replies', function (Blueprint $table) {
            $table->id();
            $table->string('user_type')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('enquiry_id');
            $table->text('message')->nullable();
            $table->boolean('seen')->nullable()->default(false);
            $table->boolean('staff_only')->nullable()->default(false);
            $table->timestamps();

            $table->foreign('enquiry_id')->references('id')->on('enquiries')->cascadeOnUpdate()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('replies');
        Schema::dropIfExists('enquiries');
    }
};
