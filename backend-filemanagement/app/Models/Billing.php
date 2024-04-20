<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User; // Import the User model
use App\Traits\SearchableTrait;


class Billing extends Model
{
    use HasFactory;
    use SearchableTrait;

    protected $fillable = [
        'description',
        'unit_amount',
        'user_id',
        'currency',
        'status',// pending, completed, failed
        'type',
        'session_id',
        'date_created',
        'date_paid',
        'billable_type',
        'billable_id',
    ];

    public $searchable = [
        'columns' => [
            'description' => 10,
            'status' => 10,
            'type' => 10,
            'session_id' => 10,
        ],
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function billable()
    {
        return $this->morphTo();
    }
}
