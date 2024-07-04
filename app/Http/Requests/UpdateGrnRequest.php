<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGrnRequest extends FormRequest
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
            'grn_no' => 'required|string|unique:grns,grn_no,' . $this->id,
            'received_date' => 'required|date',
            'supplier_id' => 'required|exists:suppliers,id',
            'bill_no' => 'required|string',
            'payment_mode' => 'required|in:Credit,Cash,Debit Card,Credit Card,Online,Cheque',
            'remarks' => 'nullable|string',
            'adjustment' => 'sometimes|numeric',
            'grn_items' => 'required|array',
            'grn_items.*.product_id' => 'required|exists:products,id',
            'grn_items.*.pack' => 'required|string',
            'grn_items.*.batch_no' => 'required|string',
            'grn_items.*.expiry_date' => 'required|date',
            'grn_items.*.mrp' => 'required|numeric',
            'grn_items.*.quantity' => 'required|integer',
            'grn_items.*.free' => 'sometimes|integer',
            'grn_items.*.unit_price' => 'required|numeric',
            'grn_items.*.discount_percentage' => 'nullable|numeric'
        ];
    }
}
