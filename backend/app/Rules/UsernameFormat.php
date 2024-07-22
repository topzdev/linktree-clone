<?php

namespace App\Rules;

use App\Models\User;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class UsernameFormat implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString $fail
     */

    protected $withIsExist;
    protected $ignoreUserId;

    public function __construct($withIsExist = true, $ignoreUserId = null)
    {
        $this->withIsExist = $withIsExist;
        $this->ignoreUserId = $ignoreUserId;
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (empty($value)) {
            $fail('The username is required');
        }

        if (!is_string($value)) {
            $fail('The username must be string');
        }

        if (!preg_match('/^[a-zA-Z0-9_.]+$/u', $value)) {
            $fail('The username may only contain letters, numbers, underscores ("_"), and periods (".")');
        }

        // Check if the value length is between 3 and 20 characters
        $length = strlen($value);
        if ($length < 3 || $length > 32) {
            $fail('The username may not be less 3 or greater than 32 characters');
        }


        if ($this->withIsExist) {
            $isExist = User::where('username', $value);
            if ($this->ignoreUserId) {
                $isExist = $isExist->whereNot('id', $this->ignoreUserId);
            }
            $isExist = $isExist->exists();

            if ($isExist) {
                $fail('The username has already been taken');
            }
        }
    }

}
