<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Supplier extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'name', 'contact_person', 'phone', 'email', 'address', 'city', 'state', 'country', 'zip_code',
        'pan_no', 'dl_no', 'cst_no', 'gst_no'
    ];

    // Define any relationships here, for example:
    public function medications()
    {
        // return $this->hasMany(Medication::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function resolveRouteBinding($value, $field = null)
    {
        return $this->where($field ?? 'id', $value)->firstOrFail();
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where('name', 'like', '%'.$search.'%');
        });
        // ->when($filters['trashed'] ?? null, function ($query, $trashed) {
        //     if ($trashed === 'with') {
        //         $query->withTrashed();
        //     } elseif ($trashed === 'only') {
        //         $query->onlyTrashed();
        //     }
        // });
    }
}
