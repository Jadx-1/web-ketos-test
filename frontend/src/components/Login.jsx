import { useState } from "react";
import "./Login.css";

function Login({ onLoginSuccess, onBackToHome }) {
  const [nisn, setNisn] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmedNisn = nisn.trim();

    if (!trimmedNisn) {
      setErrorMessage("Silakan masukkan NISN terlebih dahulu.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nisn: trimmedNisn }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Terjadi kesalahan pada sistem.");
        return;
      }

      // Simpan data siswa ke localStorage
      localStorage.setItem("siswa", JSON.stringify(data.siswa));

      if (onLoginSuccess) {
        onLoginSuccess(data.siswa);
      }
    } catch (err) {
      console.error("Login Error:", err);
      setErrorMessage("Gagal terhubung ke server. Pastikan server backend berjalan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Tombol Kembali ke Beranda */}
        {onBackToHome && (
          <button type="button" className="btn-back-home" onClick={onBackToHome}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Kembali ke Beranda</span>
          </button>
        )}

        {/* Header Visual Logo */}
        <div className="brand-badge">
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 6L17 8.8V15.2L12 18L7 15.2V8.8L12 6Z" fill="currentColor" fillOpacity="0.2"/>
              <circle cx="12" cy="12" r="3" fill="currentColor"/>
            </svg>
          </div>
          <span className="brand-title">E-VOTING SMKN 57 JAKARTA</span>
        </div>

        <div className="card-header">
          <h1>Selamat Datang</h1>
          <p className="subtitle">Masukkan NISN Anda untuk menggunakan hak pilih</p>
        </div>

        {/* Form Login */}
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="nisn-input">NISN (Nomor Induk Siswa Nasional)</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </span>
              <input
                id="nisn-input"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Contoh: 10000001"
                value={nisn}
                onChange={(e) => {
                  setNisn(e.target.value);
                  if (errorMessage) setErrorMessage("");
                }}
                disabled={isLoading}
                autoComplete="off"
              />
            </div>
          </div>

          <button type="submit" className="btn-submit" disabled={isLoading}>
            {isLoading ? (
              <span className="spinner-loader">Memeriksa...</span>
            ) : (
              <>
                <span>Masuk</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Tempat Khusus Pesan Error */}
        {errorMessage && (
          <div className="error-alert-box" role="alert">
            <div className="alert-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <div className="alert-content">
              <p className="alert-message">{errorMessage}</p>
            </div>
          </div>
        )}

        <div className="card-footer">
          <p>Butuh bantuan? Hubungi panitia pemilihan di SMKN 57 Jakarta.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
