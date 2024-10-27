<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Desa extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', // Allow mass assignment for the 'nama' column
    ];
    public function warga()
    {
        return $this->hasMany(Warga::class);
    }

    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
}