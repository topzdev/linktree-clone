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
        Schema::create('themes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('title');
            $table->string('key');
            $table->string('bg_color')->nullable();
            $table->string('bg_color2')->nullable();
            $table->string('bg_position')->nullable();
            $table->string('bg_image')->nullable();
            $table->string('bg_video')->nullable();
            $table->string('bg_style')->nullable();
            $table->string('bg_text_color')->nullable();
            $table->string('btn_color')->nullable();
            $table->string('btn_text_color')->nullable();
            $table->string('font_color')->nullable();
            $table->string('font_style')->nullable();
            $table->string('preview')->nullable();
            $table->unsignedBigInteger('btn_id')->default(1);
            $table->foreign('btn_id')->references('id')->on('buttons');
            $table->unsignedBigInteger('font_id')->default(1);
            $table->foreign('font_id')->references('id')->on('fonts');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('themes');
    }
};
