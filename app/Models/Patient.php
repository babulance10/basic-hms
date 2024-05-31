<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Patient extends Model
{
    use HasFactory;

    // Fillable fields for mass assignment
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'address',
        'gender',
        'birth_date',
    ];

    // // Relationships
    // public function visits()
    // {
    //     return $this->hasMany(Visit::class);
    // }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where('first_name', 'like', '%'.$search.'%')
            ->orWhere('last_name', 'like', '%' . $search . '%')
            ->orWhere('email', 'like', '%' . $search . '%');
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

    // Add other relationships here as necessary, such as billing, treatments, etc.
}
