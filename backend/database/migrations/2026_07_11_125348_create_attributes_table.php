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
        Schema::create('attributes', function (Blueprint $table) {
            $table->id();
            $table->string('name')->index(); // Prefix search 
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->foreignId('attribute_type_id')->constrained('attribute_types');
            $table->unsignedInteger('version')->default(1); // for Auto-save & Locking 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attributes');
    }
};
