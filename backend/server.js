require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Dummy data kandidat Paslon
const candidates = [
  {
    id: 1,
    nomorUrut: "01",
    namaKetua: "Rizky Pratama",
    namaWakil: "Amanda Putri",
    kelas: "XI IPA 1 & XI IPS 1",
    totalVotes: 0,
  },
  {
    id: 2,
    nomorUrut: "02",
    namaKetua: "Fajar Ramadan",
    namaWakil: "Maya Salsabila",
    kelas: "XI IPS 2 & XI IPA 2",
    totalVotes: 1, // Budi Santoso (10000002) sudah memilih Paslon 02
  },
  {
    id: 3,
    nomorUrut: "03",
    namaKetua: "Daffa Al-Faris",
    namaWakil: "Naura Az-Zahra",
    kelas: "XI IPA 3 & XI IPS 3",
    totalVotes: 0,
  },
];

// Dummy data siswa
const students = [
  {
    nisn: "10000001",
    nama: "Andi Pratama",
    kelas: "XI IPA 1",
    isVoted: false,
    votedCandidateId: null,
  },
  {
    nisn: "10000002",
    nama: "Budi Santoso",
    kelas: "XI IPS 2",
    isVoted: true,
    votedCandidateId: 2,
  },
  {
    nisn: "10000003",
    nama: "Siti Rahma",
    kelas: "XII IPA 3",
    isVoted: false,
    votedCandidateId: null,
  },
];

// API GET Candidates
app.get("/api/candidates", (req, res) => {
  res.json({
    success: true,
    candidates,
  });
});

// API Login
app.post("/api/login", (req, res) => {
  const { nisn } = req.body || {};

  if (!nisn) {
    return res.status(400).json({
      success: false,
      message: "NISN wajib diisi!",
    });
  }

  // Cari siswa berdasarkan NISN
  const student = students.find((s) => s.nisn === String(nisn).trim());

  // Cek apakah NISN terdaftar
  if (!student) {
    return res.status(404).json({
      success: false,
      message: "NISN tidak terdaftar!",
    });
  }

  // Cek apakah siswa sudah memilih
  if (student.isVoted) {
    return res.status(403).json({
      success: false,
      message: "Anda sudah menggunakan hak pilih!",
    });
  }

  // Jika terdaftar dan belum memilih
  return res.status(200).json({
    success: true,
    message: "Login berhasil!",
    siswa: {
      nisn: student.nisn,
      nama: student.nama,
      kelas: student.kelas,
      isVoted: student.isVoted,
      votedCandidateId: student.votedCandidateId || null,
    },
  });
});

// API Vote (Memilih Paslon)
app.post("/api/vote", (req, res) => {
  const { nisn, candidateId } = req.body || {};

  if (!nisn || !candidateId) {
    return res.status(400).json({
      success: false,
      message: "NISN dan pilihan kandidat wajib diisi!",
    });
  }

  const student = students.find((s) => s.nisn === String(nisn).trim());

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Siswa tidak terdaftar!",
    });
  }

  if (student.isVoted) {
    return res.status(403).json({
      success: false,
      message: "Anda sudah menggunakan hak pilih dan tidak dapat memilih lagi!",
    });
  }

  const candidate = candidates.find((c) => c.id === Number(candidateId));
  if (!candidate) {
    return res.status(404).json({
      success: false,
      message: "Pasangan calon tidak ditemukan!",
    });
  }

  // 1. Ubah status isVoted siswa menjadi true & simpan ID paslon yang dipilih
  student.isVoted = true;
  student.votedCandidateId = Number(candidateId);

  // 2. Tambahkan jumlah perolehan suara paslon di backend
  candidate.totalVotes += 1;

  console.log(`[VOTE SUCCESS] Siswa ${student.nama} (${student.nisn}) berhasil memilih Paslon ${candidate.nomorUrut} (${candidate.namaKetua} & ${candidate.namaWakil}). Total suara Paslon ${candidate.nomorUrut}: ${candidate.totalVotes}`);

  return res.status(200).json({
    success: true,
    message: `Suara Anda untuk Paslon ${candidate.nomorUrut} berhasil disimpan! Terima kasih atas partisipasi Anda.`,
    siswa: {
      nisn: student.nisn,
      nama: student.nama,
      kelas: student.kelas,
      isVoted: true,
      votedCandidateId: Number(candidateId),
    },
  });
});

// Halaman utama backend
app.get("/", (req, res) => {
  res.send("Backend Pemilihan OSIS SMKN 57 Jakarta berhasil berjalan!");
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});


