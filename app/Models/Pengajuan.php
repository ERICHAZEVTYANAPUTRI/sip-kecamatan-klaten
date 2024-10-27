<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengajuan extends Model
{
    use HasFactory;

    // Specify the table name if it's different from the default
    protected $table = 'pengajuans';

    // Specify which attributes can be mass assigned
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
        'keperluan',

    ];

    // Define relationships with other models

    public function rwrt()
    {
        return $this->belongsTo(Rwrt::class); // Adjust if your Rwrt model is in a different namespace
    }

    public function desa()
    {
        return $this->belongsTo(Desa::class); // Adjust if your Desa model is in a different namespace
    }
}