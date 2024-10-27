<?php

namespace App\Http\Controllers;
use Exception;
use Illuminate\Http\Request;
use App\Models\rwrt;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\QueryException;

class RwrtController extends Controller
{
    public function index()
    {
        $rwrts = rwrt::all();
        return response()->json($rwrts);
    }

    public function store(Request $request)
    {
        $request->validate([
            'number' => 'required|string|max:255',
        ]);

        try {
            $rwrt = rwrt::create([
                'number' => $request->number,
            ]);

            return response()->json([
                'message' => 'Berhasil Menambahkan rwrt',
                'rwrt' => $rwrt
            ], 201);
        } catch (QueryException $e) {
            Log::error('Database error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json([
                'message' => 'Database error occurred while creating rwrt',
                'error' => $e->getMessage()
            ], 500);
        } catch (Exception $e) {
            Log::error('General error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json([
                'message' => 'An error occurred while creating the rwrt',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        $rwrt = rwrt::find($id);
        if (!$rwrt) {
            return response()->json([
                'message' => 'rwrt not found'
            ], 404);
        }
        return response()->json([
            'rwrt' => $rwrt
        ]);
    }

    public function update(Request $request, $id)
    {
        $rwrt = rwrt::find($id);
        if (!$rwrt) {
            return response()->json([
                'message' => 'rwrt not found'
            ], 404);
        }

        $request->validate([
            'number' => 'required|string|max:255',
        ]);

        try {
            $rwrt->fill([
                'number' => $request->number,
            ])->save();

            return response()->json([
                'message' => 'Berhasil memperbarui data rwrt'
            ]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'Ada yang tidak beres saat memperbarui data rwrt'
            ], 500);
        }
    }

    public function destroy($id)
    {
        $rwrt = rwrt::find($id);
        if (!$rwrt) {
            return response()->json([
                'message' => 'rwrt not found'
            ], 404);
        }

        try {
            $rwrt->delete();
            return response()->json([
                'message' => 'Berhasil menghapus data rwrt'
            ]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'Ada yang tidak beres saat menghapus data rwrt'
            ], 500);
        }
    }
}