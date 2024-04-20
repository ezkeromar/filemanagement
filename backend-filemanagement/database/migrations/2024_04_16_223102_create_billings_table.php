<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBillingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('billings', function (Blueprint $table) {
            $table->id();
            $table->string('description');
            $table->decimal('unit_amount', 10, 2);
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('currency');
            $table->string('status'); // pending, completed, failed
            $table->string('type')->nullable();
            $table->string('session_id')->nullable();
            $table->timestamp('date_created')->nullable();
            $table->timestamp('date_paid')->nullable();
            $table->morphs('billable');
            $table->timestamps();
        });
    }
    // create migrate table for package
    // php artisan make:migration packege


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('billings');
    }
}
