<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Barang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\QueryException;

class BarangController extends Controller
{
    public function index()
    {
        $barangs = Barang::with( 'kategori')->get();
        return response()->json($barangs);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'kategori_id' => 'required|exists:kategoris,id',
            'gambar' => 'nullable|file|mimes:jpeg,png,jpg|',
            'harga' => 'nullable|integer',
            'stok' => 'nullable|integer',
            'keterangan' => 'nullable|string|max:255',
            

        ]);

        try {
            $barangs = Barang::create([
                'name' => $request->name,
                'kategori_id' => $request->kategori_id,
                'gambar' => $request->file('gambar') ? $request->file('gambar')->store('images') : null,
                'harga' => $request->harga,
                'stok' => $request->stok,
                'keterangan' => $request->keterangan,
               

            ]);

            return response()->json([
                'message' => 'Berhasil Menambahkan barang',
                'barang' => $barangs
            ], 201);
        } catch (QueryException $e) {
            Log::error('Database error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json([
                'message' => 'Database error occurred while creating barang',
                'error' => $e->getMessage()
            ], 500);
        } catch (Exception $e) {
            Log::error('General error: ' . $e->getMessage(), ['exception' => $e]);
            return response()->json([
                'message' => 'An error occurred while creating the barang',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    
    public function show($id)
    {
        $barangs = Barang::find($id);
        if (!$barangs) {
            return response()->json([
                'message' => 'barang not found'
            ], 404);
        }
        return response()->json([
            'barang' => $barangs
        ]);
    }

    public function update(Request $request, $id)
    {
        $barangs = Barang::find($id);
        if (!$barangs) {
            return response()->json([
                'message' => 'barang not found'
            ], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
           'kategori_id' => 'required|exists:kategoris,id',
            'gambar' => 'nullable|file|mimes:jpeg,png,jpg|',
            'harga' => 'nullable|integer',
            'stok' => 'nullable|integer',
            'keterangan' => 'nullable|string|max:255',
        ]);

        try {
            $barangs->fill([
                'name' => $request->name,
                'kategori_id' => $request->kategori_id,
                'gambar' => $request->file('gambar') ? $request->file('gambar')->store('images') : null,
                'harga' => $request->harga,
                'stok' => $request->stok,
                'keterangan' => $request->keterangan,
            ])->save();

            return response()->json([
                'message' => 'Berhasil memperbarui data barang'
            ]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'Ada yang tidak beres saat memperbarui data barang'
            ], 500);
        }
    }

    public function destroy($id)
    {
        $barangs = Barang::find($id);
        if (!$barangs) {
            return response()->json([
                'message' => 'barang not found'
            ], 404);
        }

        try {
            $barangs->delete();
            return response()->json([
                'message' => 'Berhasil menghapus data barang'
            ]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'Ada yang tidak beres saat menghapus data barang'
            ], 500);
        }
    }
}