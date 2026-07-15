<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Http\Resources\AttributeResource;
use App\Models\Attribute;
use App\Models\AttributeType;
use App\Repositories\AttributeRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AttributeController extends Controller
{
    protected $repo;

    public function __construct(AttributeRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

   // app/Http/Controllers/Api/AttributeController.php

public function index(Request $request)
{
    // Request filter
    $filters = $request->only(['search', 'category', 'prefix']);
    
    // filter pass on repotitory
    $attributes = $this->repo->getAll($filters);

    return AttributeResource::collection($attributes);
}
public function store(Request $request)
    {
        //validation
        $request->validate([
            'name'      => 'required|string|max:255',
            'category'  => 'required|integer', // category_id
            'type'      => 'required|string',  //'markdown', 'string')
            'version'   => 'required|integer',
        ]);

        //find datebase Type ID 
        $attributeType = AttributeType::where('slug', $request->type)->first();

        if (!$attributeType) {
            return response()->json(['message' => 'Invalid attribute type provided.'], 422);
        }

        try {
            // db transaction
            return DB::transaction(function () use ($request, $attributeType) {
                
                $attribute = Attribute::create([
                    'name'              => $request->name,
                    'category_id'       => $request->category, 
                    'attribute_type_id' => $attributeType->id, 
                    'version'           => $request->version,
                ]);

                return response()->json([
                    'message' => 'Attribute created successfully',
                    'data'    => new AttributeResource($attribute),
                ], 201);
            });

        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Failed to create attribute',
                'error'   => $th->getMessage(),
            ], 500);
        }
    }
//update Attribute
public function update(Request $request, $id)
{
    // ১. Find the attribute
    $attribute = Attribute::findOrFail($id);

    // ২. Validate input
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'category' => 'required|integer', 
        'type' => 'required|string', 
    ]);

    // ৩. Type slug from id
    $attributeType = AttributeType::where('slug', $validated['type'])->first();

    if (!$attributeType) {
        return response()->json(['message' => 'Invalid attribute type provided.'], 422);
    }

    // ৪. Database Transaction
    return DB::transaction(function () use ($attribute, $validated, $attributeType) {
        
        $attribute->update([
            'name'              => $validated['name'],
            'category_id'       => $validated['category'],
            'attribute_type_id' => $attributeType->id,
        ]);

        // ৬. Increment version
        $attribute->increment('version');

        return response()->json([
            'message' => 'Attribute updated successfully', 
            'data' => new AttributeResource($attribute->fresh()) 
        ]);
    });
}

    //delete attribute
public function destroy($id)
{
    try {
        return DB::transaction(function () use ($id) {
            
            $attribute = Attribute::findOrFail($id);
            
            // delete
            $attribute->delete();

            return response()->json([
                'message' => 'Attribute deleted successfully'
            ], 200);
        });
    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        return response()->json([
            'message' => 'Attribute not found'
        ], 404);
    } catch (\Throwable $th) {
        return response()->json([
            'message' => 'Failed to delete attribute',
            'error' => $th->getMessage()
        ], 500);
    }
}
}