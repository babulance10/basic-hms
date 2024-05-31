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
        Schema::create('visits', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('patient_id');
            $table->dateTime('start_time');
            $table->dateTime('end_time')->nullable();
            $table->enum('type', ['inpatient', 'outpatient']); // Type of visit
            $table->text('reason')->nullable();
            $table->text('diagnosis')->nullable();
            $table->text('notes')->nullable();
            $table->enum('status', ['scheduled', 'ongoing', 'completed', 'cancelled']);
            $table->timestamps();
        
            $table->foreign('patient_id')->references('id')->on('patients');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visits');
    }
};
