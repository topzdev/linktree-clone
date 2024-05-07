<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Themes extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'key',
        'bg_color',
        'bg_color2',
        'bg_position',
        'bg_image',
        'bg_video',
        'bg_style',
        'bg_text_color',
        'font_color',
        'font_style',
        'preview',
        'btn_id',
        'font_id',
    ];

    protected $appends = [
        'preview_url',
        'bg_image_url',
        'bg_video_url'
    ];

    protected $with = [
        'button',
        'font'
    ];

    protected function previewUrl(): Attribute
    {
        return new Attribute(
            get: fn() => $this->preview ? asset('/themes/previews'.$this->preview) : null
        );
    }

    protected function bgImageUrl(): Attribute
    {
        return new Attribute(
            get: fn() => $this->bg_image ? asset('/themes/images'.$this->bg_image) : null
        );
    }

    protected function bgVideoUrl(): Attribute
    {
        return new Attribute(
            get: fn() => $this->bg_video ? asset('/themes/videos'.$this->bg_video) : null
        );
    }

    public function button(): HasOne
    {
        return $this->hasOne(Buttons::class, 'id', 'btn_id');
    }

    public function font(): HasOne
    {
        return $this->hasOne(Fonts::class, 'id', 'font_id');
    }
}
