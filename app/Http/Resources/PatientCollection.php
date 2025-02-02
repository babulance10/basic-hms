<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class PatientCollection extends ResourceCollection
{

    public function toArray($request)
    {
        return $this->collection->map->only(
            'id',
            'first_name',
            'last_name',
            'email',
            'phone',
            'address',
            'gender',
            'birth_date',
        );
    }
}
