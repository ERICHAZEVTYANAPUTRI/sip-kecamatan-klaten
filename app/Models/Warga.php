<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Warga extends Model
{
    use HasFactory;

    // Specify which attributes are mass assignable
    protected $fillable = [
        'nik',
        'nama_lengkap',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'alamat',
        'rwrt_id',
        'desa_id',
        'no_telepon',
    ];
    public function desa()
    {
        return $this->belongsTo(Desa::class);
    }
    public function rwrt()
    {
        return $this->belongsTo(rwrt::class);
    }

    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
}