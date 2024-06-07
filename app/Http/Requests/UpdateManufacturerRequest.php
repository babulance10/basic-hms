<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateManufacturerRequest extends FormRequest
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
            'mfr_code' => 'required|unique:manufacturers,mfr_code,' . $this->manufacturer->id,
            'name' => 'required|max:255',
            'address' => 'nullable|max:255',
            'contact_number' => 'nullable|max:20',
            'email' => 'nullable|email|unique:manufacturers,email,' . $this->manufacturer->id,
        ];
    }
}
