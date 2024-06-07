<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grn extends Model
{
    use HasFactory;
    protected $fillable = [
         'received_date', 'bill_no', 'payment_mode', 'remarks', 'supplier_id', 'adjustment'
    ];
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($grn) {
            $prefix = 'GRN-';
            $lastGrn = Grn::latest('id')->first();

            if ($lastGrn) {
                // Extract the numeric part of the grn_number and increment it
                $number = intval(str_replace($prefix, '', $lastGrn->grn_no)) + 1;
            } else {
                // Start from 1 if there are no GRNs yet
                $number = 1;
            }

            // Prepend the prefix to the new number
            $grn->grn_no = $prefix . str_pad($number, 5, '0', STR_PAD_LEFT);
        });
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function grnItems()
    {
        return $this->hasMany(GrnItem::class);
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where('supplier_id', 'like', '%' . $search . '%');
        });
        // ->when($filters['trashed'] ?? null, function ($query, $trashed) {
        //     if ($trashed === 'with') {
        //         $query->withTrashed();
        //     } elseif ($trashed === 'only') {
        //         $query->onlyTrashed();
        //     }
        // });
    }

    public function resolveRouteBinding($value, $field = null)
    {
        return $this->where($field ?? 'id', $value)->firstOrFail();
    }
}
