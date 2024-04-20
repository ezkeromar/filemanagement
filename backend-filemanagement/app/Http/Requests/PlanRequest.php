<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PlanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    // create migration plans 
    // php artisan make:migration create_plans_table
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
      switch ($this->method()){
          case 'POST' : {
            return [
              'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'quantity' => 'required|integer|min:0',
            'is_active' => 'required|boolean',
            ];
          }
          case 'PUT' : {

          }
          case 'PATCH' : {
            return [
              //
            ];
          }
          default: break;
      }
        return [
            //
        ];
    }
}
