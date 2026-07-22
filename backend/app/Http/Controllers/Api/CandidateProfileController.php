<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\ProfileRepository;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CandidateProfileController extends Controller
{
    protected $profileRepository;

    public function __construct(ProfileRepository $profileRepository)
    {
        $this->profileRepository = $profileRepository;
    }

    public function show(Request $request)
    {
        // user data fatch
        $profileData = $this->profileRepository->getProfile($request->user());

        return response()->json([
            'data' => $profileData
        ]);
    }

    public function update(Request $request)
    {
        $user = $request->user();

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
            // email must unique
            'email'            => ['sometimes', 'required', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'alternate_email'  => 'nullable|email|max:255',
            'emergency_contact'=> 'nullable|string|max:50',
            'blood_group'      => 'nullable|string|max:10',
            'location'         => 'sometimes|required|string|max:255',
            'bio'              => 'nullable|string',
        ]);

        // email update in user table
        if (isset($validated['email'])) {
            $user->update([
                'email' => $validated['email']
            ]);
            // remove email form table
            unset($validated['email']);
        }

        //'candidate_profiles' table update
        $updatedProfile = $this->profileRepository->updateProfile($user, $validated);

        return response()->json([
            'message' => 'Profile updated successfully!',
            'data' => $updatedProfile
        ]);
    }
}