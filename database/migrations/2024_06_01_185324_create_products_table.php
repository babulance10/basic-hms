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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('hsn_code');
            $table->enum('scheduled_drug', ['H', 'H1', 'X', 'G', 'I', 'J', 'None'])->default('None');
            $table->enum('gst_category', ['0%', '5%', '12%', '18%', '28%']);
            $table->foreignId('product_type_id')->constrained()->onDelete('cascade');
            $table->foreignId('manufacturer_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
