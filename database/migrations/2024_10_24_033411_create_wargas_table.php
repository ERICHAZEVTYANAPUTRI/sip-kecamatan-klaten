<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('wargas', function (Blueprint $table) {
            $table->id();
            $table->string('nik')->unique(); // Nomor Induk Keluarga
            $table->string('nama_lengkap'); // Nama Lengkap
            $table->string('tempat_lahir'); // Tempat Lahir
            $table->date('tanggal_lahir'); // Tanggal Lahir
            $table->enum('jenis_kelamin', ['Laki-laki', 'Perempuan']); // Jenis Kelamin
            $table->string('alamat'); // Alamat
            $table->foreignId('desa_id');
            $table->foreignId('rwrt_id');
            $table->string('no_telepon')->nullable(); // No. Telepon
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wargas');
    }
};