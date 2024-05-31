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
        Schema::create('invoices', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('visit_id'); // Associate with a specific visit
            $table->decimal('subtotal', 10, 2); // Total before discounts and taxes
            $table->decimal('discount', 10, 2)->default(0.00); // Discount amount
            $table->decimal('discount_percentage', 5, 2)->default(0.00); // Discount percentage
            $table->decimal('gst', 10, 2); // GST amount
            $table->decimal('gst_percentage', 5, 2)->default(18.00); // Standard GST rate in India
            $table->decimal('total', 10, 2); // Total after discounts and taxes
            $table->enum('status', ['paid', 'unpaid']);
            $table->enum('payment_method', ['cash', 'card', 'online', 'cheque'])->nullable();
            $table->string('transaction_id')->nullable(); // For online payments
            $table->date('invoice_date');
            $table->timestamps();
        
            $table->foreign('visit_id')->references('id')->on('visits');
        
            // Calculate GST and total dynamically
            $table->decimal('net_total', 10, 2)->storedAs('subtotal - discount + gst');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
