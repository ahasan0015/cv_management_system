<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CandidateProfileResource;
use App\Repositories\ProfileRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CandidateProfileController extends Controller
{
    protected $profileRepository;

    public function __construct(ProfileRepositoryInterface $profileRepository)
    {
        $this->profileRepository = $profileRepository;
    }

    public function show(Request $request)
    {
        $profile = $this->profileRepository->getProfile($request->user());

        return new CandidateProfileResource($profile);
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'father_name'       => 'nullable|string|max:255',
            'mother_name'       => 'nullable|string|max:255',
            'dob'               => 'nullable|date',
            'gender'            => 'sometimes|required|string|max:50',
            'religion'          => 'nullable|string|max:50',
            'marital_status'    => 'nullable|string|max:50',
            'nationality'       => 'nullable|string|max:100',
            'nid'               => 'nullable|string|max:100',
            'title'             => 'sometimes|required|string|max:255',
            'phone'             => 'nullable|string|regex:/^[0-9+]+$/|max:11',
            'secondary_mobile'  => 'nullable|string|max:50',
            'email'             => ['sometimes', 'required', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'alternate_email'   => 'nullable|email|max:255',
            'emergency_contact' => 'nullable|string|max:50',
            'blood_group'       => 'nullable|string|max:10',
            'location'          => 'sometimes|required|string|max:255',
            'bio'               => 'nullable|string',
            'is_published'      => 'sometimes|boolean',
            'name'              => 'sometimes|required|string|max:255',
        ]);

        if (isset($validated['email'])) {
            $user->update([
                'email' => $validated['email']
            ]);
        }

        $updatedProfile = $this->profileRepository->updateProfile($user, $validated);

        return (new CandidateProfileResource($updatedProfile))
            ->additional(['message' => 'Profile updated successfully!']);
    }
}