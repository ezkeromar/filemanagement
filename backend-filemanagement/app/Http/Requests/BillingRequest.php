<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BillingRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {

        switch ($this->method()) {
            case 'POST':
                return [
                    'description' => 'nullable|string|max:255',
                    'unit_amount' => 'nullable|numeric',
                    'currency' => 'required|string|max:3',
                    'status' => 'required|string|in:pending,completed,failed',
                    'type' => 'nullable|string|max:255',
                    'session_id' => 'nullable|string|max:255',
                    'date_paid' => 'nullable|date',
                ];
            case 'PUT':
                return [
                    'status' => 'required|string|in:pending,completed,failed',
                    'date_paid' => 'nullable|date',
                ];
            default:
                return [];
        }
    }
}
