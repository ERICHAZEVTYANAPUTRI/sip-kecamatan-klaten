<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class rwrt extends Model
{
    use HasFactory;

    protected $fillable = [
        'number',
    ];
    public function warga()
    {
        return $this->hasMany(Warga::class);
    }

    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
}