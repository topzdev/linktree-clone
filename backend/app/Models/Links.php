<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Links extends Model
{
    use HasFactory, SoftDeletes;

    const LINK_DEFAULT = 1;
    const LINK_HEADER = 2;

    protected $fillable = [
        'title',
        'url',
        'type',
        'thumbnail',
        'position',
        'user_id',
        'is_enabled',
    ];

    protected function casts()
    {
        return [
            'type' => 'integer',
            'is_enabled' => 'boolean'
        ];
    }

    protected $appends = [
        'thumbnail_url'
    ];

    protected function thumbnailUrl(): Attribute
    {
        return new Attribute(
            get: fn() => $this->thumbnail ? asset($this->thumbnail) : null
        );
    }

    protected static function booted(): void
    {
        static::creating(function (Links $links) {
            $links->user_id = $links->user_id ? $links->user_id : auth()->id();
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
