<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Treatment extends Model
{
    use HasFactory;

    // Fillable fields for mass assignment
    protected $fillable = [
        'visit_id',
        'code',
        'name',
        'description',
        'cost',
        'treatment_date',
        'status',
    ];

    // Relationships
    public function visit()
    {
        return $this->belongsTo(Visit::class);
    }

    // Add other necessary methods and business logic as required
}
