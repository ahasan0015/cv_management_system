<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\ProfileRepository;
use Illuminate\Http\Request;

class CandidateProfileController extends Controller
{
    protected $profileRepository;

    public function __construct(ProfileRepository $profileRepository)
    {
        $this->profileRepository = $profileRepository;
    }

    public function show(Request $request)
    {
        $profileData = $this->profileRepository->getProfile($request->user());

        return response()->json([
            'data' => $profileData
        ]);
    }

public function update(Request $request)
{
    $validated = $request->validate([
        'first_name'       => 'sometimes|required|string|max:255',
        'last_name'        => 'sometimes|required|string|max:255',
        'father_name'      => 'nullable|string|max:255',
        'mother_name'      => 'nullable|string|max:255',
        'dob'              => 'nullable|date',
        'gender'           => 'sometimes|required|string|max:50',
        'religion'         => 'nullable|string|max:50',
        'marital_status'   => 'nullable|string|max:50',
        'nationality'      => 'nullable|string|max:100',
        'nid'              => 'nullable|string|max:100',
        'title'            => 'sometimes|required|string|max:255',
        'phone'            => 'sometimes|required|string|max:50',
        'secondary_mobile' => 'nullable|string|max:50',
        'email'            => 'sometimes|required|email|max:255',
        'alternate_email'  => 'nullable|email|max:255',
        'emergency_contact'=> 'nullable|string|max:50',
        'blood_group'      => 'nullable|string|max:10',
        'location'         => 'sometimes|required|string|max:255',
        'bio'              => 'nullable|string',
    ]);

    $updatedProfile = $this->profileRepository->updateProfile($request->user(), $validated);

    return response()->json([
        'message' => 'Profile updated successfully!',
        'data' => $updatedProfile
    ]);
}
}