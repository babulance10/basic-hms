<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PharmacyBillingResource extends JsonResource
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
            'visit_id' => $this->visit_id,
            'pharmacist_id' => $this->pharmacist_id,
            'billing_date' => $this->billing_date,
            'total_amount' => $this->total_amount,
            'notes' => $this->notes,
            'gst' => $this->gst,
        ];
    }
}
