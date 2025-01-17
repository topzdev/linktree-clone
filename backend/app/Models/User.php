<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'firstname',
        'lastname',
        'google_id',
        'email',
        'username',
        'user_agent',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */


    protected static function booted(): void
    {
        static::created(function (User $user) {
            $appearance = new AppearanceSettings([
                "profile_title" => $user->username
            ]);
            $user->appearance_settings()->save($appearance);
        });
        static::deleting(function (User $user) {
            $user->appearance_settings()->delete();
        });
    }

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function hasPassword()
    {
        return !!$this->password;
    }

    public function links(): HasMany
    {
        return $this->hasMany(Links::class)
            ->orderByRaw('CASE WHEN position IS NULL THEN 0 ELSE 1 END')
            ->orderBy('position', 'ASC')
            ->orderBy('created_at', 'DESC');
    }

    public function appearance_settings():HasOne
    {
        return $this->hasOne(AppearanceSettings::class)->with('font', 'button', 'background', 'theme');
    }

    public function socials()
    {
        return $this->hasMany(Socials::class)->orderBy('position', 'asc')->orderBy('created_at', 'desc');
    }
}
