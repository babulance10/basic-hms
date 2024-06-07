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
        ];
    }
}
