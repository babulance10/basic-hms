<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PharmacyBilling extends Model
{
    use HasFactory;

    protected $fillable = [
        'visit_id',
        'pharmacist_id',
        'billing_date',
        'total_amount',
        'notes',
        'gst'
    ];

    // Define relationships to Patient and Pharmacist models
    public function visit()
    {
        return $this->belongsTo(Visit::class);
    }

    // public function pharmacist()
    // {
    //     return $this->belongsTo(User::class);
    // }

    public function billingItems()
    {
        return $this->hasMany(BillingItem::class);
    }


    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where('patient_id', 'like', '%' . $search . '%');
        });
    }

    public function resolveRouteBinding($value, $field = null)
    {
        return $this->where($field ?? 'id', $value)->firstOrFail();
    }
}
