<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePharmacyBillingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'visit_id' => 'required|exists:visits,id',
            'pharmacist_id' => 'required|exists:users,id',
            'billing_date' => 'required|date',
            'total_amount' => 'required|numeric|between:0,9999999999.99',
            'notes' => 'nullable|string',
            'gst' => 'required|numeric|between:0,99',
            'billing_items' => 'required|array',
            'billing_items.*.grn_item_id' => 'required|exists:products,id',
            'billing_items.*.quantity' => 'required|integer',
            'billing_items.*.unit_price' => 'required|numeric',
            'billing_items.*.total_price' => 'required|numeric',
        ];
    }
}
