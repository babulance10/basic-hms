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
        Schema::create('grns', function (Blueprint $table) {
            $table->id();
            $table->string('grn_no')->unique();
            $table->date('received_date');
            $table->string('bill_no')->nullable();
            $table->enum('payment_mode', ['Credit', 'Cash', 'Debit Card', 'Credit Card', 'Online', 'Cheque'])->default('Credit');
            $table->text('remarks')->nullable();
            $table->foreignId('supplier_id')->constrained()->onDelete('cascade');
            $table->decimal('adjustment', 10, 2)->default(0);
            $table->timestamps();
        });
    }
    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('grns');
    }
};
