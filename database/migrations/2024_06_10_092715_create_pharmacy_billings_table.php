<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pharmacy_billings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignId('visit_id')->references('id')->on('visits')->onDelete('cascade');
            $table->foreignId('pharmacist_id')->references('id')->on('users')->onDelete('cascade');
            $table->dateTime('billing_date');
            $table->decimal('total_amount', 10, 2);
            $table->text('notes')->nullable();
            $table->decimal('gst', 15, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pharmacy_billings');
    }
};
