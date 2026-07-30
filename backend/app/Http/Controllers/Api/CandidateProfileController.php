<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CandidateProfileResource;
use App\Repositories\ProfileRepositoryInterface;
use Cloudinary\Api\Upload\UploadApi;
use Cloudinary\Configuration\Configuration;
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
            'name'         => 'sometimes|required|string|max:255',
            'email'        => ['sometimes', 'required', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'is_published' => 'sometimes|boolean',
            'attributes'   => 'sometimes|array', // [attribute_id => value] 
            'attributes.*' => 'nullable|string', // 
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

    /**
     * Avatar Upload Method
     */
public function uploadAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        try {
            Configuration::instance([
                'cloud' => [
                    'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                    'api_key'    => env('CLOUDINARY_API_KEY'),
                    'api_secret' => env('CLOUDINARY_API_SECRET'),
                ],
                'url' => [
                    'secure' => true
                ]
            ]);

            $uploadedFile = (new UploadApi())->upload(
                $request->file('avatar')->getRealPath(),
                ['folder' => 'candidate_avatars']
            );

            $cloudUrl = $uploadedFile['secure_url'] ?? null;

            if (!$cloudUrl) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to get secure URL from Cloudinary'
                ], 500);
            }

            $user = $request->user();
            $user->avatar = $cloudUrl;
            $user->save();

            $profileData = $this->profileRepository->getProfile($user);

            return (new CandidateProfileResource($profileData))->additional([
                'success' => true,
                'message' => 'Profile image uploaded successfully to cloud'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}