<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class AppearanceSettings extends Model
{
    use HasFactory;

    protected $fillable = [
        'bg_color',
        'bg_color2',
        'bg_position',
        'bg_image',
        'bg_video',
        'btn_color',
        'btn_style',
        'btn_text_color',
        'btn_shadow_color',
        'profile_avatar',
        'profile_bio',
        'profile_image_style',
        'profile_title',
        'font_color',
        'font_style',
        'bg_id',
        'btn_id',
        'font_id',
        'theme_id',
        'user_id',
    ];


    protected function casts()
    {
        return [
            'profile_image_style' => 'integer',
            'theme_id' => "integer",
            'font_id' => "integer",
            'bg_id' => "integer",
            'btn_id' => "integer",
        ];
    }

    protected $appends = [
        'profile_avatar_url',
        'profile_initials',
        'bg_image_url',
        'bg_video_url',
    ];

    protected function profileInitials(): Attribute
    {
        return new Attribute(
            get: function (){
                $words = explode(' ', $this->profile_title); // Split the string by spaces into an array of words
                $initials = '';

                foreach ($words as $word) {
                    if (strlen($word) > 0) {
                        $initials .= strtoupper($word[0]); // Add the first letter of each word in uppercase
                    }
                }
                return $initials;
            }
        );
    }
    protected function profileAvatarUrl(): Attribute
    {
        return new Attribute(
            get: fn() => $this->profile_avatar ? asset($this->profile_avatar) : null
        );
    }

    protected function bgImageUrl(): Attribute
    {
        return new Attribute(
            get: fn() => $this->bg_image ? asset($this->bg_image) : null
        );
    }

    protected function bgVideoUrl(): Attribute
    {
        return new Attribute(
            get: fn() => $this->bg_video ? asset($this->bg_video) : null
        );
    }

    public static function profile()
    {
        $userId = auth()->id();
        return AppearanceSettings::find(['user_id' => $userId], ['id', 'user_id', 'profile_avatar', 'profile_bio', 'profile_image_style', 'profile_title'])->append(['profile_avatar_url'])->first();
    }

    public static function userAppearanceSettings()
    {
        $userId = auth()->id();
        return AppearanceSettings::find(['user_id' => $userId])->first();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
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

    public function theme(): HasOne
    {
        return $this->hasOne(Themes::class, 'id', 'theme_id');
    }

}
