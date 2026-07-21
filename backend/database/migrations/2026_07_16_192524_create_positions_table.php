<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
 // database/migrations/xxxx_xx_xx_create_positions_table.php

public function up(): void
{
    Schema::create('positions', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->text('description')->nullable();
        $table->integer('max_project_count')->default(1);
        // Date tracking for the position lifecycle
        $table->date('start_date')->nullable();
        $table->date('end_date')->nullable();
        
        $table->json('access_rules')->nullable();
        $table->json('project_tags')->nullable();
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('positions');
    }
};
