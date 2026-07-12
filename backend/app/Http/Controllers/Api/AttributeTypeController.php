<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AttributeType;
use Illuminate\Http\Request;

class AttributeTypeController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => AttributeType::all()
        ]);
    }
}
