<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'product_type_id' => $this->product_type_id,
            'product_type' => ['name' => $this->productType->name, 'id' => $this->productType->id],
            'name' => $this->name,
            'gst_category' => $this->gst_category,
            'hsn_code' => $this->hsn_code,
            'manufacturer_id' => $this->manufacturer_id,
            'manufacturer' => ['name' => $this->manufacturer->name, 'id' => $this->manufacturer->id],
            'scheduled_drug' => $this->scheduled_drug
        ];
    }
}
