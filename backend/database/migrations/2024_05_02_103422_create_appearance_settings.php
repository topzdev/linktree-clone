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
        Schema::create('appearance_settings', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreign('bg_id')->references('id')->on('backgrounds');
            $table->string('bg_image')->nullable();
            $table->string('bg_color')->nullable();
            $table->string('bg_color2')->nullable();
            $table->string('bg_position')->nullable();
            $table->string('bg_image')->nullable();
            $table->string('bg_video')->nullable();
            $table->foreign('btn_id')->references('id')->on('buttons');
            $table->string('btn_color')->nullable();
            $table->string('btn_style')->nullable();
            $table->string('btn_text_color')->nullable();
            $table->string('profile_bio')->nullable();
            $table->tinyInteger('profile_image_style')->default(1);
            $table->string('profile_title')->nullable();
            $table->foreign('font_id')->references('id')->on('fonts');
            $table->string('font_color')->nullable();
            $table->string('font_style')->nullable();
            $table->string('profile_image')->nullable();
            $table->string('shadow_color')->nullable();
            $table->foreign('theme_id')->references('id')->on('themes');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appearance_settings');
    }
};
