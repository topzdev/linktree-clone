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
        'bg_from',
        'bg_to',
        'bg_position',
        'bg_image',
        'bg_image_m',
        'bg_video',
        'bg_video_m',
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
        'bg_image_m_url',
        'bg_video_url',
        'bg_video_m_url'
    ];

    protected $with = [
//        'button',
//        'font'
    ];

    protected function casts()
    {
        return [
            'theme_id' => "integer",
            'btn_id' => "integer",
        ];
    }

    protected function previewUrl(): Attribute
    {
        return new Attribute(
            get: fn() => $this->preview ? asset('/themes/previews'.$this->preview) : null
        );
    }

    protected function bgImageUrl(): Attribute
    {
        return new Attribute(
            get: fn() => $this->bg_image ? asset('/themes/backgrounds'.$this->bg_image) : null
        );
    }
    protected function bgImageMUrl(): Attribute
    {
        return new Attribute(
            get: fn() => $this->bg_image ? asset('/themes/backgrounds'.$this->bg_image) : null
        );
    }

    protected function bgVideoUrl(): Attribute
    {
        return new Attribute(
            get: fn() => $this->bg_video ? asset('/themes/videos'.$this->bg_video) : null
        );
    }

    protected function bgVideoMUrl(): Attribute
    {
        return new Attribute(
            get: fn() => $this->bg_video ? asset('/themes/videos'.$this->bg_video) : null
        );
    }

   public function background(): HasOne
    {
        return $this->hasOne(Backgrounds::class, 'id', 'bg_id');
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
