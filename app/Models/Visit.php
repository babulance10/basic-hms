<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Visit extends Model
{
    use HasFactory;

    // Fillable fields for mass assignment
    protected $fillable = [
        'patient_id',
        'start_time',
        'end_time',
        'type',
        'reason',
        'diagnosis',
        'notes',
        'status',
    ];

    // Relationships
    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    // Add other necessary methods and business logic as required
}
