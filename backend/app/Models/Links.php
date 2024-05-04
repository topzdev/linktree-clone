<?php

namespace App\Models;

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
    ];

    protected function casts()
    {
        return [
            'type' => 'integer'
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (Links $links) {
            $links->user_id = auth()->id();
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}