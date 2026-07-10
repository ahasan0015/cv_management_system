<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function redirectToGoogle() {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback() {
        $googleUser = Socialite::driver('google')->stateless()->user();

        $candidateRole = Role::where('name', 'candidate')->first();

        $user = User::updateOrCreate([
            'email' => $googleUser->email,
        ], [
            'name' => $googleUser->name,
            'password' => Hash::make(uniqid()),
            'role_id' => $candidateRole?->id,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;
        $role = $user->role?->name ?? 'candidate';

        return redirect("http://localhost:5173/auth-success?token=" . $token . "&role=" . $role);
    }
}