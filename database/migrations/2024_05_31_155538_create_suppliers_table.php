<?php

// database/migrations/2024_05_31_000000_create_suppliers_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSuppliersTable extends Migration
{
    public function up()
    {
        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('contact_person')->nullable();
            $table->string('phone');
            $table->string('email')->unique();
            $table->text('address');
            $table->string('city');
            $table->string('state');
            $table->string('country')->default('India');
            $table->string('zip_code');
            $table->string('pan_no')->unique(); // Permanent Account Number
            $table->string('dl_no')->unique(); // Drug License Number
            $table->string('cst_no')->unique()->nullable(); // Central Sales Tax Number
            $table->string('gst_no')->unique()->nullable(); // GST Number
            //$table->string('vat_no')->unique()->nullable(); // Value Added Tax Number
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('suppliers');
    }
}
