<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
            'product_type_id' => 'required|exists:product_types,id',
            'name' => 'required|string|max:255',
            'gst_category' => 'required|string|max:255',
            'hsn_code' => 'required|integer|digits_between:1,8',
            'manufacturer' => 'required|string|max:255',
            'scheduled_drug' => 'required|in:H,H1,X,G,I,J,None'
        ];
    }
}
