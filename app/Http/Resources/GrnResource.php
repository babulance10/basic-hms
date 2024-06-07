<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GrnResource extends JsonResource
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
            'grn_no' => $this->grn_no,
            'received_date' => $this->received_date,
            'bill_no' => $this->bill_no,
            'payment_mode' => $this->payment_mode,
            'supplier_id' => $this->supplier_id,
            'adjustment' => $this->adjustment,
            'remarks' => $this->remarks,
        ];
    }
}
