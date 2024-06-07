<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGrnItemRequest extends FormRequest
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
        $grnItemRequest = new StoreGrnItemRequest();
        return array_merge([
            'grn_id' => 'required|exists:grns,id',
            'product_id' => 'required|exists:products,id',
            'pack' => 'required|string',
            'batch_number' => 'required|string',
            'expiry_date' => 'required|date',
            'mrp' => 'required|numeric',
            'quantity' => 'required|integer',
            'free' => 'sometimes|integer',
            'unit_price' => 'required|numeric',
            'discount_percentage' => 'nullable|numeric',
        ], $grnItemRequest->rules());
    }
}
