<?php

use App\Traits\Helpers;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    use Helpers;

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('logs', function (Blueprint $table) {
            $table->id();

            $table->string('logable_type')->nullable();
            $table->unsignedBigInteger('logable_id')->nullable();

            $table->string('type')->default('default');
            $table->text('message')->nullable();
            $table->{$this->jsonable()}('options')->nullable();
            $table->unsignedBigInteger('admin_id')->nullable();

            $table->timestamps();
            $table->softDeletes();
            $table->foreign('admin_id')->references('id')->on('admins')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('logs');
    }
};
