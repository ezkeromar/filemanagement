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
        Schema::create('Plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('price', 8, 2);
            $table->integer('quantity');
            $table->string('storage_unit');
            $table->string('currency');
            $table->string('billing_interval'); // anuual, monthly
            $table->boolean('is_active')->default(true);
            $table->integer('max_image_count')->nullable();
            $table->integer('max_3d_model_count')->nullable();
            $table->timestamps();
        });
    }

     /**
     * Reverse the migrations.
     *
     * @return void
     */

    public function down()
    {
        Schema::dropIfExists('Plans');
    }
};
