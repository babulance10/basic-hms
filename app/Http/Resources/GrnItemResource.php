<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class GrnItemResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'grn_id' => $this->grn_id,
            'product_id' => $this->product_id,
            'pack' => $this->pack,
            'batch_no' => $this->batch_no,
            'expiry_date' => $this->expiry_date,
            'mrp' => $this->mrp,
            'quantity' => $this->quantity,
            'free' => $this->free,
            'unit_price' => $this->unit_price,
            'discount_percentage' => $this->discount_percentage,
            'name' => $this->product->name,
            'gst' => $this->product->gst_category
        ];
    }
}
