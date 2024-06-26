<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $fillable = ['path', 'url' ,'name' , 'size' , 'user_id' , "p"];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function documentable()
    {
        return $this->morphTo();
    }
}
