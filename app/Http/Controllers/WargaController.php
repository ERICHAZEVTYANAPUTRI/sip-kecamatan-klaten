<?php

namespace App\Http\Controllers;

use App\Models\Warga;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\QueryException;
use Exception;

class WargaController extends Controller
{
    public function index()
    {
        $wargas = Warga::with('desa', 'rwrt')->get();
        return response()->json($wargas);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nik' => 'required|string|max:20',
            'nama_lengkap' => 'required|string|max:255',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|string|in:Laki-laki,Perempuan',
            'alamat' => 'required|string|max:255',
            'rwrt_id' => 'required|exists:rwrts,id',
            'desa_id' => 'required|exists:desas,id',
            'no_telepon' => 'required|string|max:15',
        ]);

        try {
            $warga = Warga::create($request->all());

            return response()->json([
                'message' => 'Berhasil Menambahkan Warga',
                'warga' => $warga
            ], 201);
        } catch (QueryException $e) {
            Log::error('Database error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json([
                'message' => 'Database error occurred while creating warga'
            ], 500);
        } catch (Exception $e) {
            Log::error('General error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json([
                'message' => 'An error occurred while creating the warga'
            ], 500);
        }
    }

    public function show($id)
    {
        $warga = Warga::find($id);
        if (!$warga) {
            return response()->json(['message' => 'Warga not found'], 404);
        }
        return response()->json(['warga' => $warga]);
    }

    public function update(Request $request, $id)
    {
        $warga = Warga::find($id);
        if (!$warga) {
            return response()->json(['message' => 'Warga not found'], 404);
        }

        $request->validate([
            'nik' => 'required|string|max:20',
            'nama_lengkap' => 'required|string|max:255',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|string|in:Laki-laki,Perempuan',
            'alamat' => 'required|string|max:255',
            'desa_id' => 'required|exists:desas,id',
            'no_telepon' => 'required|string|max:15',
        ]);

        try {
            $warga->fill($request->all())->save();

            return response()->json(['message' => 'Berhasil memperbarui data warga']);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => 'Ada yang tidak beres saat memperbarui data warga'], 500);
        }
    }

    public function destroy($id)
    {
        $warga = Warga::find($id);
        if (!$warga) {
            return response()->json(['message' => 'Warga not found'], 404);
        }

        try {
            $warga->delete();
            return response()->json(['message' => 'Berhasil menghapus data warga']);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => 'Ada yang tidak beres saat menghapus data warga'], 500);
        }
    }
}