import React from "react";
import "./LandingPage.css";

function LandingPage({ onGoToLogin }) {
  return (
    <div className="landing-container">
      {/* Navbar Header */}
      <nav className="landing-navbar">
        <div className="nav-brand-group">
          <div className="school-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="brand-text">
            <span className="school-name">SMKN 57 JAKARTA</span>
            <span className="sub-brand">E-Voting Pemilihan OSIS</span>
          </div>
        </div>

        <div className="nav-actions">
          <button className="btn-nav-login" onClick={onGoToLogin}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
            <span>Login Pemilih</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-glow-bg"></div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-pulse"></span>
            <span>E-VOTING RESMI SMKN 57 JAKARTA</span>
          </div>

          <h1 className="hero-title">
            Pemilihan Ketua & Wakil Ketua OSIS <br />
            <span className="text-gradient">Periode 2026 / 2027</span>
          </h1>

          <p className="hero-subtitle">
            Suarakan aspirasimu untuk kepemimpinan sekolah yang lebih berintegritas, inovatif, dan berprestasi. Masa depan OSIS SMKN 57 Jakarta ada di tanganmu!
          </p>

          <div className="hero-cta-group">
            <button className="btn-primary-cta" onClick={onGoToLogin}>
              <span>Gunakan Hak Pilih Saya</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="quick-stats-grid">
            <div className="stat-card">
              <div className="stat-icon purple">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div className="stat-info">
                <h3>1,250+</h3>
                <p>Siswa Terdaftar</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon blue">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div className="stat-info">
                <h3>3 Paslon</h3>
                <p>Kandidat Terbaik</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon green">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div className="stat-info">
                <h3 className="status-live">AKTIF</h3>
                <p>Status System</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section: Jadwal & Jam Pemilihan */}
      <section className="info-section">
        <div className="section-container">
          <div className="info-header-box">
            <h2>Informasi Pelaksanaan Voting</h2>
            <p>Perhatikan tanggal dan batas waktu pemungutan suara resmi</p>
          </div>

          <div className="schedule-grid">
            <div className="schedule-card highlight">
              <div className="card-badge">JADWAL UTAMA</div>
              <div className="schedule-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h3>Tanggal Pelaksanaan</h3>
              <p className="schedule-date">Senin, 10 Agustus 2026</p>
              <span className="schedule-note">Serentak untuk seluruh siswa SMKN 57 Jakarta</span>
            </div>

            <div className="schedule-card">
              <div className="card-badge alt">JAM OPERASIONAL</div>
              <div className="schedule-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3>Waktu Pemungutan Suara</h3>
              <p className="schedule-time">08:00 - 15:00 WIB</p>
              <span className="schedule-note">Sistem otomatis ditutup setelah pukul 15:00 WIB</span>
            </div>
          </div>

          {/* Cara Memilih / Steps */}
          <div className="steps-wrapper">
            <h3>3 Langkah Mudah Menggunakan Hak Pilih</h3>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">1</div>
                <h4>Login dengan NISN</h4>
                <p>Masukkan Nomor Induk Siswa Nasional Anda yang terdaftar resmi di sekolah.</p>
              </div>

              <div className="step-card">
                <div className="step-number">2</div>
                <h4>Pelajari Visi & Misi</h4>
                <p>Bandingkan gagasan dan program kerja dari masing-masing Pasangan Calon.</p>
              </div>

              <div className="step-card">
                <div className="step-number">3</div>
                <h4>Tentukan Pilihan</h4>
                <p>Klik tombol 'Pilih' pada kandidat pilihanmu dan konfirmasi suara Anda.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <p>© 2026 Panitia Pemilihan Ketua OSIS (PILKETOS) - SMKN 57 JAKARTA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
