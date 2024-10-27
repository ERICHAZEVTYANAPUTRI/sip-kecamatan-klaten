<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    public function index()
    {
        $users = user::all();
        return response()->json($users);
    }
    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'message' => 'user not found'
            ], 404);
        }
        return response()->json([
            'user' => $user
        ]);
    }
    public function register(Request $request)
    {
        // Validasi data yang diterima
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => 'required|string|in:user,admin',
        ]);
    
        // Buat instance pengguna baru dan simpan ke database
        $user = new User();
        $user->name = $validated['name'];
        $user->username = $validated['username'];
        $user->email = $validated['email'];
        $user->password = Hash::make($validated['password']);
        $user->role = $validated['role']; // Memperbaiki penetapan role
        $user->save();
    
        // Kembalikan response sukses
        return response()->json([
            'message' => 'User registered successfully.',
            'user' => $user // Opsional, sertakan data pengguna yang dibuat dalam response
        ], 201);
    }
    
    public function login(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        // Attempt to authenticate the user
        if (Auth::attempt(['email' => $validated['email'], 'password' => $validated['password']])) {
            // Authentication passed
            $user = Auth::user();
            return response()->json([
                'message' => 'Login successful.',
                'user' => $user // Include the authenticated user data in the response
                // You might also want to include a token or session ID here for authenticated users
            ]);
        } else {
            // Authentication failed
            return response()->json([
                'message' => 'Invalid credentials.',
            ], 401);
        }
    }
}