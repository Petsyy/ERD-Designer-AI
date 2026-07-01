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
        Schema::create('relationships', function (Blueprint $table) {
            $table->id();

            $table->foreignId('project_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('source_table_id')
                ->constrained('diagram_tables')
                ->cascadeOnDelete();

            $table->foreignId('source_column_id')
                ->constrained('diagram_columns')
                ->cascadeOnDelete();

            $table->foreignId('target_table_id')
                ->constrained('diagram_tables')
                ->cascadeOnDelete();

            $table->foreignId('target_column_id')
                ->constrained('diagram_columns')
                ->cascadeOnDelete();

            $table->enum('type', [
                'one_to_one',
                'one_to_many',
                'many_to_one',
                'many_to_many',
            ]);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('relationships');
    }
};
