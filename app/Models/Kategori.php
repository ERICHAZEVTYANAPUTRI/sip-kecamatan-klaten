<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kategori extends Model
{
    protected $fillable = [
        'name',

    ];
    public function barang()
    {
        return $this->hasMany(Barang::class);
    }
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
}