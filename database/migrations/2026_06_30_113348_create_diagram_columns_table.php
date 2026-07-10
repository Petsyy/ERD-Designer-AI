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
        Schema::create('diagram_columns', function (Blueprint $table) {
            $table->id();

            $table->foreignId('diagram_table_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('name');

            $table->string('data_type')->default('varchar');

            $table->integer('length')->nullable();
            $table->integer('scale')->nullable();

            $table->boolean('is_primary')->default(false);
            $table->boolean('is_foreign')->default(false);
            $table->boolean('is_nullable')->default(false);
            $table->boolean('is_unique')->default(false);
            $table->boolean('is_unsigned')->default(false);
            $table->boolean('is_auto_increment')->default(false);

            $table->string('default_value')->nullable();
            $table->text('comment')->nullable();

            $table->integer('sort_order')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('diagram_columns');
    }
};
