<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class SecretKey extends Model
{
    protected $fillable = ['secret_key'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function generateKey()
    {
        return Str::random(32); 
    }

    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }
}

