const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Melayani file statis (index.html, style.css, app.js) dari folder saat ini
app.use(express.static(__dirname));

// Data dummy mahasiswa
let mahasiswa = [
  { id: 1, nama: "Agung", umur: 20, jurusan: "Teknik Informatika", nilai: 85 },
  { id: 2, nama: "Budi", umur: 21, jurusan: "Sistem Informasi", nilai: 78 }
];

// ==================== ENDPOINT API ==================== //

// 1. GET: Ambil semua data / cari data mahasiswa
app.get("/api/mahasiswa", (req, res) => {
  const { search } = req.query;

  if (search) {
    const keyword = search.toLowerCase();
    const hasil = mahasiswa.filter(
      (item) =>
        item.nama.toLowerCase().includes(keyword) ||
        item.jurusan.toLowerCase().includes(keyword)
    );
    return res.json(hasil);
  }

  res.json(mahasiswa);
});

// 2. POST: Tambah data mahasiswa baru
app.post("/api/mahasiswa", (req, res) => {
  const { nama, umur, jurusan, nilai } = req.body;

  const dataBaru = {
    id: mahasiswa.length + 1,
    nama,
    umur: Number(umur),
    jurusan,
    nilai: Number(nilai)
  };

  mahasiswa.push(dataBaru);
  res.status(201).json({ message: "Data berhasil ditambahkan", data: dataBaru });
});

// Jalankan Server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});