<?php

namespace App\Http\Resources;

use App\Models\ProductType;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ProductTypeCollection extends ResourceCollection
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
            'description',
        );
    }

    public static function getOptions()
    {
        // Fetch product types from the database (e.g., using Eloquent)
        $productTypes = ProductType::all();

        // Map to { value, label } format
        return $productTypes->map(function ($type) {
            return [
                'value' => $type->id,
                'label' => $type->name,
            ];
        });
    }
    
}
