<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Barang extends Model
{
    protected $fillable = [
        'name',
        'kategori_id',
        'gambar',
        'harga',
        'stok',
        'keterangan',

    ];
    public function kategori()
    {
        return $this->belongsTo(Kategori::class);
    }
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
}