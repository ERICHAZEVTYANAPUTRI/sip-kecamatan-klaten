<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Desa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\QueryException;

class DesaController extends Controller
{
    public function index()
    {
        $desas = Desa::all();
        return response()->json($desas);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        try {
            $desa = Desa::create([
                'name' => $request->name,
            ]);

            return response()->json([
                'message' => 'Berhasil Menambahkan Desa',
                'desa' => $desa
            ], 201);
        } catch (QueryException $e) {
            Log::error('Database error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json([
                'message' => 'Database error occurred while creating desa',
                'error' => $e->getMessage()
            ], 500);
        } catch (Exception $e) {
            Log::error('General error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json([
                'message' => 'An error occurred while creating the desa',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        $desa = Desa::find($id);
        if (!$desa) {
            return response()->json([
                'message' => 'Desa not found'
            ], 404);
        }
        return response()->json([
            'desa' => $desa
        ]);
    }

    public function update(Request $request, $id)
    {
        $desa = Desa::find($id);
        if (!$desa) {
            return response()->json([
                'message' => 'Desa not found'
            ], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        try {
            $desa->fill([
                'name' => $request->name,
            ])->save();

            return response()->json([
                'message' => 'Berhasil memperbarui data desa'
            ]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'Ada yang tidak beres saat memperbarui data desa'
            ], 500);
        }
    }

    public function destroy($id)
    {
        $desa = Desa::find($id);
        if (!$desa) {
            return response()->json([
                'message' => 'Desa not found'
            ], 404);
        }

        try {
            $desa->delete();
            return response()->json([
                'message' => 'Berhasil menghapus data desa'
            ]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'Ada yang tidak beres saat menghapus data desa'
            ], 500);
        }
    }
}