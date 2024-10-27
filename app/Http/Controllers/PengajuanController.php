<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Pengajuan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\QueryException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PengajuanController extends Controller
{
    public function index()
    {
        $pengajuans = Pengajuan::with('desa', 'rwrt')->get();
        return response()->json($pengajuans);
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
            'keperluan' => 'required|string|max:255',
        ]);

        try {
            $pengajuan = Pengajuan::create($request->all());
            return response()->json(['message' => 'Berhasil Menambahkan Pengajuan', 'pengajuan' => $pengajuan], 201);
        } catch (QueryException $e) {
            Log::error('Database error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json(['message' => 'Database error occurred while creating pengajuan'], 500);
        } catch (Exception $e) {
            Log::error('General error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json(['message' => 'An error occurred while creating the pengajuan'], 500);
        }
    }

    public function show($id)
    {
        try {
            $pengajuan = Pengajuan::with('desa', 'rwrt')->findOrFail($id);
            return response()->json($pengajuan);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Pengajuan not found'], 404);
        } catch (Exception $e) {
            Log::error('Error fetching pengajuan: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json(['message' => 'An error occurred while fetching the pengajuan'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nik' => 'sometimes|required|string|max:20',
            'nama_lengkap' => 'sometimes|required|string|max:255',
            'tempat_lahir' => 'sometimes|required|string|max:255',
            'tanggal_lahir' => 'sometimes|required|date',
            'jenis_kelamin' => 'sometimes|required|string|in:Laki-laki,Perempuan',
            'alamat' => 'sometimes|required|string|max:255',
            'rwrt_id' => 'sometimes|required|exists:rwrts,id',
            'desa_id' => 'sometimes|required|exists:desas,id',
            'no_telepon' => 'sometimes|required|string|max:15',
            'keperluan' => 'sometimes|required|string|max:255',
        ]);

        try {
            $pengajuan = Pengajuan::findOrFail($id);
            $pengajuan->update($request->all());
            return response()->json(['message' => 'Berhasil Memperbarui Pengajuan', 'pengajuan' => $pengajuan]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Pengajuan not found'], 404);
        } catch (QueryException $e) {
            Log::error('Database error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json(['message' => 'Database error occurred while updating pengajuan'], 500);
        } catch (Exception $e) {
            Log::error('General error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json(['message' => 'An error occurred while updating the pengajuan'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $pengajuan = Pengajuan::findOrFail($id);
            $pengajuan->delete();
            return response()->json(['message' => 'Pengajuan deleted successfully.']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Pengajuan not found'], 404);
        } catch (QueryException $e) {
            Log::error('Database error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json(['message' => 'Database error occurred while deleting pengajuan'], 500);
        } catch (Exception $e) {
            Log::error('General error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json(['message' => 'An error occurred while deleting the pengajuan'], 500);
        }
    }

    public function markAsCompleted($id)
    {
        try {
            $pengajuan = Pengajuan::findOrFail($id);
            $pengajuan->status = 'completed'; // Assuming you have a 'status' column
            $pengajuan->save();

            return response()->json(['message' => 'Pengajuan marked as completed successfully.']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Pengajuan not found'], 404);
        } catch (QueryException $e) {
            Log::error('Database error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json(['message' => 'Database error occurred while updating pengajuan'], 500);
        } catch (Exception $e) {
            Log::error('General error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json(['message' => 'An error occurred while updating the pengajuan'], 500);
        }
    }
}