<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\UserRepositoryInterface;
use App\Http\Resources\UserResource;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    protected $userRepo;

    public function __construct(UserRepositoryInterface $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    // all user list
    public function index()
    {
        $users = $this->userRepo->getAllUsers();

        return response()->json([
            'success' => true,
            'data' => UserResource::collection($users)
        ]);
    }

    // Usr Role Update
    public function updateRole(Request $request, User $user)
    {
        $request->validate([
            'role_id' => 'required|exists:roles,id'
        ]);

        $updatedUser = $this->userRepo->updateRole($user, $request->role_id);

        return response()->json([
            'success' => true,
            'message' => 'User role updated successfully',
            'data' => new UserResource($updatedUser)
        ]);
    }

    // User Status Change (Active / Blocked)
    public function updateStatus(Request $request, User $user)
    {
        $request->validate([
            'status' => 'required|string|in:Active,Blocked'
        ]);

        $updatedUser = $this->userRepo->updateStatus($user, $request->status);

        return response()->json([
            'success' => true,
            'message' => 'User status updated successfully',
            'data' => new UserResource($updatedUser)
        ]);
    }

    // user distroy
    public function destroy(User $user)
    {
        $this->userRepo->deleteUser($user);

        return response()->json([
            'success' => true,
            'message' => 'User deleted successfully'
        ]);
    }
//get roles
public function getRoles()
    {
        $roles = $this->userRepo->getAllRoles();

        return response()->json([
            'success' => true,
            'data' => $roles
        ]);
    }
}
