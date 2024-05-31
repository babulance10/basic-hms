<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Invoice extends Model
{
    use HasFactory;

    // Fillable fields for mass assignment
    protected $fillable = [
        'visit_id',
        'subtotal',
        'discount',
        'discount_percentage',
        'gst',
        'gst_percentage',
        'total',
        'status',
        'payment_method',
        'transaction_id',
        'invoice_date',
        // 'net_total' is a calculated value, so it's not fillable
    ];

    // Relationships
    public function visit()
    {
        return $this->belongsTo(Visit::class);
    }

    // Accessor for net_total to ensure it's always calculated correctly
    public function getNetTotalAttribute()
    {
        return $this->subtotal - $this->discount + $this->gst;
    }

    // Add other necessary methods and business logic as required
}
