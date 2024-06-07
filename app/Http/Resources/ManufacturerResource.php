<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ManufacturerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'mfr_code' => $this->mfr_code,
            'name' => $this->name,
            'address' => $this->address,
            'contact_number' => $this->contact_number,
            'email' => $this->email
        ];
    }
}
