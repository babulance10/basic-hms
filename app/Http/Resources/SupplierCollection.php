<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class SupplierCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return $this->collection->map->only(
            'id',
            'name',
            'contact_person',
            'phone',
            'email',
            'address',
            'city',
            'state',
            'country',
            'zip_code',
            'pan_no',
            'dl_no',
            'cst_no',
            'gst_no'
        );
    }
}
