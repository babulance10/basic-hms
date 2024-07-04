<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBillingItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'pharmacy_billing_id' => 'required|exists:pharmacy_billings,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer',
            'unit_price' => 'required|numeric',
            'total_price' => 'required|numeric',
        ];
    }
}
