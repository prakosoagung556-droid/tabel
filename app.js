// URL Endpoint API Express
const API_URL = "http://localhost:3000/api/mahasiswa";

// 1. Fungsi untuk mengambil data dari API (GET)
async function ambilData(keyword = "") {
  try {
    let url = API_URL;
    if (keyword) {
      url += `?search=${encodeURIComponent(keyword)}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    tampilkanData(data);
  } catch (error) {
    console.error("Gagal mengambil data dari API:", error);
  }
}

// 2. Fungsi untuk menampilkan data ke tabel HTML
function tampilkanData(data) {
  const tabel = document.getElementById("tabelData");
  if (!tabel) return;

  tabel.innerHTML = ""; // Bersihkan tabel terlebih dahulu

  data.forEach((item, index) => {
    const status = item.nilai >= 75 ? "Lulus" : "Tidak Lulus";

    tabel.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td><strong>${item.nama}</strong></td>
        <td>${item.umur} tahun</td>
        <td>${item.jurusan}</td>
        <td>${item.nilai}</td>
        <td>${status}</td>
      </tr>
    `;
  });
}

// 3. Fungsi pencarian data melalui API
function cariData() {
  const keyword = document.getElementById("search").value;
  ambilData(keyword);
}

// ================= KODE BARU TAMBAH DATA & MODAL ================= //

// 4. Fungsi untuk membuka dan menutup Modal Pop-up
function bukaModal() {
  document.getElementById("modalTambah").style.display = "block";
}

function tutupModal() {
  document.getElementById("modalTambah").style.display = "none";
}

// 5. Fungsi untuk mengirim data baru ke API (POST)
async function tambahMahasiswa(event) {
  event.preventDefault(); // Mencegah reload halaman

  const nama = document.getElementById("nama").value;
  const umur = document.getElementById("umur").value;
  const jurusan = document.getElementById("jurusan").value;
  const nilai = document.getElementById("nilai").value;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nama, umur, jurusan, nilai })
    });

    const result = await response.json();

    if (response.ok) {
      alert("Data berhasil ditambahkan!");
      tutupModal(); // Sembunyikan form pop-up
      document.getElementById("formMahasiswa").reset(); // Reset isi form
      ambilData(); // Refresh isi tabel dengan data terbaru dari API
    } else {
      alert("Gagal menambahkan data: " + result.message);
    }
  } catch (error) {
    console.error("Error menambah data:", error);
    alert("Terjadi kesalahan koneksi ke server!");
  }
}

// Otomatis panggil data dari API saat halaman pertama kali dimuat
document.addEventListener("DOMContentLoaded", () => {
  ambilData();
});