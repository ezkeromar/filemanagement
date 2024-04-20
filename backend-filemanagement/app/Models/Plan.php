<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\SearchableTrait;


class Plan extends Model
{
    use HasFactory;
    use SearchableTrait;

  
    protected $fillable = [
        'name',
        'description',
        'price',
        'storage_unit',
        'currency',
        'billing_interval',
        'is_active',
    ];

    public $searchable = [
        'columns' => [
            'name' => 10,
            'description' => 10,
            'price' => 10,
            'storage_unit' => 10,
            'currency' => 10,
            'billing_interval' => 10,
        ],
    ];


    public function billings()
    {
        return $this->morphMany(Billing::class, 'billable');
    }

    public function getStorageUnitAttribute($value)
    {
        return strtoupper($value);
    }

    public function setStorageUnitAttribute($value)
    {
        $this->attributes['storage_unit'] = strtolower($value);
    }
    
}
