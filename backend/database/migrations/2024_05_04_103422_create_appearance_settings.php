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
            $table->string('bg_color')->nullable();
            $table->string('bg_from')->nullable();
            $table->string('bg_to')->nullable();
            $table->string('bg_position')->nullable();
            $table->string('bg_image')->nullable();
            $table->string('bg_image_m')->nullable();
            $table->string('bg_video')->nullable();
            $table->string('bg_video_m')->nullable();
            $table->string('btn_color')->nullable();
            $table->string('btn_style')->nullable();
            $table->string('btn_text_color')->nullable();
            $table->string('btn_shadow_color')->nullable();
            $table->string('profile_bio')->nullable();
            $table->tinyInteger('profile_image_style')->default(1);
            $table->string('profile_title')->nullable();
            $table->string('profile_avatar')->nullable();
            $table->string('font_color')->nullable();
            $table->string('font_style')->nullable();
            $table->integer('social_align')->default(2)->nullable();//top = 1, bottom = 2
            $table->unsignedBigInteger('bg_id')->nullable()->default(1);
            $table->foreign('bg_id')->references('id')->on('backgrounds');
            $table->unsignedBigInteger('btn_id')->default(1);
            $table->foreign('btn_id')->references('id')->on('buttons');
            $table->foreignId('font_id')->nullable()->default(1)->constrained();
            $table->foreignId('theme_id')->nullable()->constrained();
            $table->foreignId('user_id')->constrained();
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
