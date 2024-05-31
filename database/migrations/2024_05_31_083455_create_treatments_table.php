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
        Schema::create('treatments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('visit_id'); // Link to a specific visit
            $table->string('code')->nullable(); // Treatment code (if applicable)
            $table->string('name'); // Name of the treatment
            $table->text('description')->nullable(); // Description of the treatment
            $table->decimal('cost', 10, 2); // Cost of the treatment
            $table->dateTime('treatment_date'); // Date and time of the treatment
            $table->enum('status', ['planned', 'in_progress', 'completed', 'cancelled']); // Status of the treatment
            $table->timestamps();
        
            $table->foreign('visit_id')->references('id')->on('visits');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('treatments');
    }
};
