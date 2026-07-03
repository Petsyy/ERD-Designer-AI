<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|min:3|max:50',
            'description' => 'nullable|string|max:255',
            'canvas_x' => 'nullable|numeric',
            'canvas_y' => 'nullable|numeric',
            'zoom' => 'nullable|numeric',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Please enter a project name.',
            'name.min' => 'Project name must be at least 3 characters.',
            'name.max' => 'Project name must not exceed 50 characters.',
            'description.max' => 'Description must not exceed 255 characters.',
            'canvas_x.numeric' => 'Canvas X must be a number.',
            'canvas_y.numeric' => 'Canvas Y must be a number.',
            'zoom.numeric' => 'Zoom must be a number.',
        ];
    }
}
