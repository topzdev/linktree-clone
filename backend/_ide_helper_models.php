<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $bg_id
 * @property string|null $bg_color
 * @property string|null $bg_color2
 * @property string|null $bg_position
 * @property string|null $bg_image
 * @property string|null $bg_video
 * @property int $btn_id
 * @property string|null $btn_color
 * @property string|null $btn_style
 * @property string|null $btn_text_color
 * @property string|null $profile_bio
 * @property int $profile_image_style
 * @property string|null $profile_title
 * @property int|null $font_id
 * @property string|null $font_color
 * @property string|null $font_style
 * @property string|null $profile_image
 * @property int|null $theme_id
 * @property int $user_id
 * @property-read \App\Models\Backgrounds|null $background
 * @property-read \App\Models\Buttons|null $button
 * @property-read \App\Models\Fonts|null $font
 * @property-read \App\Models\Themes|null $theme
 * @property-read \App\Models\User $user
 * @method static \Database\Factories\AppearanceSettingsFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|AppearanceSettings newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AppearanceSettings newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AppearanceSettings query()
 * @method static \Illuminate\Database\Eloquent\Builder|AppearanceSettings whereBgColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppearanceSettings whereBgColor2($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppearanceSettings whereBgId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppearanceSettings whereBgImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppearanceSettings whereBgPosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppearanceSettings whereBgVideo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppearanceSettings whereBtnColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppearanceSettings whereBtnId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppearanceSettings whereBtnStyle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppearanceSettings whereBtnTextColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppearanceSettings whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppearanceSettings whereFontColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppearanceSettings whereFontId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppearanceSettings whereFontStyle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppearanceSettings whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppearanceSettings whereProfileBio($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppearanceSettings whereProfileImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppearanceSettings whereProfileImageStyle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppearanceSettings whereProfileTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppearanceSettings whereThemeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppearanceSettings whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AppearanceSettings whereUserId($value)
 */
	class AppearanceSettings extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $title
 * @property string $key
 * @property string $preview
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Backgrounds newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Backgrounds newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Backgrounds query()
 * @method static \Illuminate\Database\Eloquent\Builder|Backgrounds whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Backgrounds whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Backgrounds whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Backgrounds wherePreview($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Backgrounds whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Backgrounds whereUpdatedAt($value)
 */
	class Backgrounds extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $title
 * @property string $key
 * @property int $group_id
 * @method static \Illuminate\Database\Eloquent\Builder|Buttons newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Buttons newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Buttons query()
 * @method static \Illuminate\Database\Eloquent\Builder|Buttons whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Buttons whereGroupId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Buttons whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Buttons whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Buttons whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Buttons whereUpdatedAt($value)
 */
	class Buttons extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $key
 * @property string $title
 * @property string $group
 * @property string|null $font_size
 * @property string $font_weight
 * @property string $letter_spacing
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Fonts newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Fonts newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Fonts query()
 * @method static \Illuminate\Database\Eloquent\Builder|Fonts whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Fonts whereFontSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Fonts whereFontWeight($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Fonts whereGroup($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Fonts whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Fonts whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Fonts whereLetterSpacing($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Fonts whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Fonts whereUpdatedAt($value)
 */
	class Fonts extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $title
 * @property string|null $url
 * @property int $type
 * @property string|null $thumbnail
 * @property int|null $position
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Models\User $user
 * @method static \Database\Factories\LinksFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Links newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Links newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Links onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Links query()
 * @method static \Illuminate\Database\Eloquent\Builder|Links whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Links whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Links whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Links wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Links whereThumbnail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Links whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Links whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Links whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Links whereUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Links whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Links withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Links withoutTrashed()
 */
	class Links extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $title
 * @property string $key
 * @method static \Illuminate\Database\Eloquent\Builder|Themes newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Themes newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Themes query()
 * @method static \Illuminate\Database\Eloquent\Builder|Themes whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Themes whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Themes whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Themes whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Themes whereUpdatedAt($value)
 */
	class Themes extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string|null $firstname
 * @property string|null $lastname
 * @property string|null $username
 * @property string|null $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property mixed|null $password
 * @property string|null $google_id
 * @property string|null $user_agent
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Links> $links
 * @property-read int|null $links_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Laravel\Sanctum\PersonalAccessToken> $tokens
 * @property-read int|null $tokens_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereFirstname($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereGoogleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereLastname($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUserAgent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUsername($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|User withoutTrashed()
 */
	class User extends \Eloquent {}
}

