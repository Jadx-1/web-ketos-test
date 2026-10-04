import { useState } from "react";
import "./Kandidat.css";

const DUMMY_KANDIDAT = [
  {
    id: 1,
    nomorUrut: "01",
    namaKetua: "Rizky Pratama",
    namaWakil: "Amanda Putri",
    kelas: "XI IPA 1 & XI IPS 1",
    visi: "Mewujudkan OSIS yang Inovatif, Kolaboratif, dan Berbudaya Lingkungan Digital.",
    misi: [
      "Mengembangkan kegiatan ekstrakurikuler berbasis teknologi dan seni.",
      "Menyelenggarakan program 'Go Green & Zero Waste' di lingkungan sekolah.",
      "Meningkatkan transparansi dan aspirasi siswa melalui platform digital."
    ]
  },
  {
    id: 2,
    nomorUrut: "02",
    namaKetua: "Fajar Ramadan",
    namaWakil: "Maya Salsabila",
    kelas: "XI IPS 2 & XI IPA 2",
    visi: "Mendorong Prestasi Akademik dan Talent Siswa Berlandaskan Karakter Tangguh.",
    misi: [
      "Membuat program bimbingan tutor sebaya menjelang ujian nasional/SNBT.",
      "Mengadakan kompetisi e-sports dan seni tahunan antar kelas.",
      "Mempererat kebersamaan antar angkatan melalui pekan olahraga siswa."
    ]
  },
  {
    id: 3,
    nomorUrut: "03",
    namaKetua: "Daffa Al-Faris",
    namaWakil: "Naura Az-Zahra",
    kelas: "XI IPA 3 & XI IPS 3",
    visi: "Membangun Jiwa Kepemimpinan, Kreativitas, dan Kepedulian Sosial Siswa.",
    misi: [
      "Mengadakan aksi bakti sosial dan penggalangan dana rutin.",
      "Fasilitasi workshop keterampilan digital & kewirausahaan siswa.",
      "Optimalisasi mading sekolah dan podcast inspirasi OSIS."
    ]
  }
];

function Kandidat({ currentUser, onLogout, onUpdateUser }) {
  // State untuk modal konfirmasi
  const [candidateToConfirm, setCandidateToConfirm] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voteError, setVoteError] = useState("");
  const [voteSuccessMsg, setVoteSuccessMsg] = useState("");

  // Cek apakah pengguna sudah memilih (dari currentUser atau state lokal)
  const isVoted = currentUser?.isVoted || false;
  const votedCandidateId = currentUser?.votedCandidateId || null;

  // Klik tombol pilih paslon -> Buka modal konfirmasi
  const handleOpenConfirmModal = (kandidat) => {
    if (isVoted) return;
    setVoteError("");
    setCandidateToConfirm(kandidat);
  };

  // Tutup modal
  const handleCloseModal = () => {
    if (isSubmitting) return;
    setCandidateToConfirm(null);
  };

  // Konfirmasi & kirim vote ke backend
  const handleConfirmVote = async () => {
    if (!candidateToConfirm || isVoted) return;

    setIsSubmitting(true);
    setVoteError("");

    try {
      const response = await fetch("http://localhost:5000/api/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nisn: currentUser.nisn,
          candidateId: candidateToConfirm.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setVoteError(data.message || "Gagal mengirimkan suara. Silakan coba lagi.");
        setIsSubmitting(false);
        return;
      }

      // Update state currentUser di parent & localStorage
      const updatedUser = {
        ...currentUser,
        isVoted: true,
        votedCandidateId: candidateToConfirm.id,
      };

      localStorage.setItem("siswa", JSON.stringify(updatedUser));

      if (onUpdateUser) {
        onUpdateUser(updatedUser);
      }

      setVoteSuccessMsg(`Selamat! Suara Anda untuk Paslon ${candidateToConfirm.nomorUrut} (${candidateToConfirm.namaKetua} & ${candidateToConfirm.namaWakil}) telah berhasil dicatat.`);
      setCandidateToConfirm(null);
    } catch (err) {
      console.error("Vote Error:", err);
      setVoteError("Terjadi kesalahan koneksi ke server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="kandidat-container">
      {/* Navbar Header */}
      <header className="kandidat-navbar">
        <div className="nav-brand">
          <div className="nav-logo">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" />
              <path d="M12 6L17 8.8V15.2L12 18L7 15.2V8.8L12 6Z" fill="currentColor" fillOpacity="0.3"/>
            </svg>
          </div>
          <span>E-VOTING OSIS</span>
        </div>

        <div className="nav-user-area">
          <div className="user-badge">
            <span className={`user-dot ${isVoted ? 'voted-dot' : ''}`}></span>
            <span className="user-name">{currentUser?.nama || "Siswa"}</span>
            <span className="user-class">({currentUser?.kelas || "Siswa"})</span>
          </div>
          <button onClick={onLogout} className="btn-logout-nav" title="Keluar / Logout">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="kandidat-main">
        {/* Banner Welcome / Status Voting */}
        <section className="welcome-banner">
          <div className="welcome-text">
            <span className="welcome-tag">PILKETOS 2026</span>
            <h1>Selamat Datang, <span className="highlight-name">{currentUser?.nama}</span>!</h1>
            {isVoted ? (
              <p className="voted-status-text">
                ✅ Terima kasih! Anda telah menggunakan hak pilih Anda pada pemilihan tahun ini. Status suara Anda sudah aman terdaftar di sistem.
              </p>
            ) : (
              <p>Gunakan hak pilih Anda secara bijak. Pilihlah Pasangan Calon Ketua & Wakil Ketua OSIS yang paling mewakili aspirasimu!</p>
            )}
          </div>
          <div className="nisn-info-card">
            <span className="info-label">Status Hak Pilih</span>
            {isVoted ? (
              <span className="status-badge-done">SUDAH MEMILIH</span>
            ) : (
              <span className="status-badge-pending">BELUM MEMILIH</span>
            )}
          </div>
        </section>

        {/* Banner Pesan Berhasil Vote */}
        {voteSuccessMsg && (
          <div className="success-banner-box">
            <div className="banner-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <p>{voteSuccessMsg}</p>
          </div>
        )}

        {/* Section Header */}
        <div className="section-title-wrapper">
          <h2>Daftar Pasangan Calon Ketos</h2>
          <p>
            {isVoted
              ? "Anda sudah melakukan voting. Pilihan Anda telah terkunci dan tidak dapat diubah."
              : "Pilih salah satu pasangan calon di bawah ini. Tombol konfirmasi akan muncul sebelum suara disimpan."}
          </p>
        </div>

        {/* Grid Kartu Kandidat */}
        <div className="kandidat-grid">
          {DUMMY_KANDIDAT.map((kandidat) => {
            const isThisCandidateVoted = isVoted && votedCandidateId === kandidat.id;

            return (
              <div
                key={kandidat.id}
                className={`kandidat-card ${isThisCandidateVoted ? 'card-selected' : ''} ${isVoted && !isThisCandidateVoted ? 'card-disabled' : ''}`}
              >
                {/* Card Header dengan Nomor Urut */}
                <div className="card-top-bar">
                  <span className="paslon-badge">PASLON {kandidat.nomorUrut}</span>
                  <span className="class-badge">{kandidat.kelas}</span>
                </div>

                {/* Avatar Placeholder Paslon */}
                <div className="paslon-avatar-group">
                  <div className="avatar-circle ketua">
                    <span>{kandidat.namaKetua.charAt(0)}</span>
                    <small>Ketua</small>
                  </div>
                  <div className="avatar-circle wakil">
                    <span>{kandidat.namaWakil.charAt(0)}</span>
                    <small>Wakil</small>
                  </div>
                </div>

                {/* Detail Nama */}
                <div className="paslon-names">
                  <h3>{kandidat.namaKetua}</h3>
                  <span className="ampersand">&</span>
                  <h4>{kandidat.namaWakil}</h4>
                </div>

                {/* Visi */}
                <div className="visi-box">
                  <h5>Visi:</h5>
                  <p>"{kandidat.visi}"</p>
                </div>

                {/* Misi */}
                <div className="misi-box">
                  <h5>Program Misi Utama:</h5>
                  <ul>
                    {kandidat.misi.map((m, idx) => (
                      <li key={idx}>{m}</li>
                    ))}
                  </ul>
                </div>

                {/* Vote Button */}
                {isVoted ? (
                  isThisCandidateVoted ? (
                    <button className="btn-vote voted-final" disabled>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Pilihan Anda (Telah Terkunci)</span>
                    </button>
                  ) : (
                    <button className="btn-vote disabled-btn" disabled>
                      <span>Hak Pilih Sudah Digunakan</span>
                    </button>
                  )
                ) : (
                  <button
                    className="btn-vote"
                    onClick={() => handleOpenConfirmModal(kandidat)}
                  >
                    <span>Pilih Paslon {kandidat.nomorUrut}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* Pop-up Modal Konfirmasi Pemilihan */}
      {candidateToConfirm && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-icon-alert">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <h3>Konfirmasi Pilihan Suara</h3>
            </div>

            <div className="modal-body">
              <p className="confirm-question">
                Apakah Anda yakin ingin memilih pasangan calon berikut?
              </p>

              <div className="confirm-candidate-box">
                <span className="confirm-paslon-num">PASLON {candidateToConfirm.nomorUrut}</span>
                <h4>{candidateToConfirm.namaKetua} & {candidateToConfirm.namaWakil}</h4>
                <p className="confirm-class">{candidateToConfirm.kelas}</p>
              </div>

              <div className="warning-notice">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <span>Peringatan: Pemilihan suara hanya dapat dilakukan <strong>SATU KALI</strong>. Pilihan Anda bersifat final dan tidak dapat diubah setelah dikonfirmasi.</span>
              </div>

              {voteError && (
                <div className="modal-error-alert">
                  <p>{voteError}</p>
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={handleCloseModal}
                disabled={isSubmitting}
              >
                Batal
              </button>
              <button
                type="button"
                className="btn-modal-confirm"
                onClick={handleConfirmVote}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Mengirim..." : "Ya, Konfirmasi Pilihan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Kandidat;
