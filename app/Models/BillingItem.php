<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BillingItem extends Model
{
    use HasFactory;
    protected $fillable = [
        'pharmacy_billing_id',
        'grn_item_id',
        'quantity',
        'unit_price',
        'total_price',
    ];

    public function billing()
    {
        return $this->belongsTo(PharmacyBilling::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }


    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where('pharmacy_billing_id', 'like', '%' . $search . '%');
        });
    }

    public function resolveRouteBinding($value, $field = null)
    {
        return $this->where($field ?? 'id', $value)->firstOrFail();
    }
}
