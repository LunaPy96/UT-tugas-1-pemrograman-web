// js/script.js

        // Fungsi untuk menutup alert saat tombol (x) diklik
        function closeAlert() {
        const alertBox = document.getElementById('alert-box');
        alertBox.classList.add('hidden');
        }

            // 1. Logika Login (Hanya berjalan jika formLogin ada)
            document.addEventListener("DOMContentLoaded", function () {
            const formLogin = document.getElementById("formLogin");
            
            if (formLogin) {
                formLogin.addEventListener("submit", function (event) {
                event.preventDefault();
                
                const emailInput = document.getElementById("email").value;
                const passInput = document.getElementById("password").value;

                const penggunaSah = dataPengguna.find(function (user) {
                    return user.email === emailInput && user.password === passInput;
                });

                if (penggunaSah) {
                    // Simpan nama ke sessionStorage lalu pindah halaman
                    sessionStorage.setItem("namaPengguna", penggunaSah.nama);
                    window.location.href = "dashboard.html";
                } else {
                    const alertBox = document.getElementById('alert-box');
                    if (alertBox) alertBox.classList.remove('hidden');
                }
                });
            }
            });

            // 2. Fungsi Menampilkan Nama Pengguna
            function tampilkanNama() {
            // Ambil nama yang tersimpan dari sessionStorage
            const nama = sessionStorage.getItem("namaPengguna") || "Pengguna";
            const elNama = document.getElementById("namaPengguna");
            if (elNama) {
                elNama.textContent = nama;
            }
            }

            // 3. Inisialisasi Saat Halaman Dimuat
            window.onload = function() {
            paparGreeting();
            if (typeof muatStok === "function") muatStok();
            tampilkanNama(); // Sekarang membaca dari sessionStorage
            };

        // 4. Greeting Berdasarkan Waktu (Pagi/Siang/Sore/Malam) dan nama pengguna
        function paparGreeting() {
            const ucapanEl = document.getElementById("greeting");
            if(ucapanEl) {
                const jam = new Date().getHours();
                let ucapan = "Selamat ";
                if (jam >= 5 && jam < 12) ucapan += "pagi";
                else if (jam >= 12 && jam < 15) ucapan += "siang";
                else if (jam >= 15 && jam < 18) ucapan += "sore";
                else ucapan += "malam";
                
                ucapanEl.innerText = ucapan;
            }
        }

        // 5. Inisialisasi Apabila Halaman Dimuat
        window.onload = function() {
            paparGreeting();
            tampilkanNama();
        }

        // 6. DOM Event Listeners untuk Modal Box Lupa Password dan Daftar Akun
        document.addEventListener("click", function(e) {
        // Buka Modal
        if (e.target.closest("#btnLupaPassword")) {
            e.preventDefault();
            document.getElementById("modalLupaPassword")?.style.setProperty("display", "block");
        }
        if (e.target.closest("#btnDaftar")) {
            e.preventDefault();
            document.getElementById("modalDaftar")?.style.setProperty("display", "block");
        }

        // Tutup Modal Lupa Password
        if (e.target.closest("#tutupLupaPassword") || e.target.closest("#btnKirimLupaPassword")) {
            document.getElementById("modalLupaPassword")?.style.setProperty("display", "none");
        }

        // Tutup Modal Daftar
        if (e.target.closest("#tutupDaftar") || e.target.closest("#btnKirimDaftar")) {
            document.getElementById("modalDaftar")?.style.setProperty("display", "none");
        }
        });

       // 7. Tracking data DO pengiriman Modul
        const btnCariDO = document.getElementById("btnCariDO");
        if (btnCariDO) {
            btnCariDO.addEventListener("click", function() {
                const noDO = document.getElementById("inputDO").value;
                const hasilDiv = document.getElementById("hasilTracking");
                
                // Memeriksa jika noDO tidak ditemukan dalam dataTracking dari data.js
                if (typeof dataTracking !== 'undefined' && dataTracking[noDO]) {
                    const data = dataTracking[noDO];
                    
                    // Warna biru pada (Header)
                    let html = `
                        <div class="tracking-header">
                            <div>
                                <h3>${data.nama.toUpperCase()}</h3>
                                <p>Ekspedisi: ${data.ekspedisi}</p>
                                <p>Kode Paket: ${data.paket}</p>
                                <p style="margin-top: 15px;">TANGERANG SELATAN -> KOTA TUJUAN</p>
                            </div>
                            <div style="text-align: right;">
                                <h3>Nomor DO: ${data.nomorDO}</h3>
                                <p>Tanggal Kirim: ${data.tanggalKirim}</p>
                                <p>Status: <strong>${data.status}</strong></p>
                                <p>Total Biaya: ${data.total}</p>
                            </div>
                        </div>
                        <h4>Perjalanan Paket</h4>
                        <div class="timeline-container">
                    `;
                    
                    // Warna linimasa (Timeline) Kuning
                    data.perjalanan.forEach(item => {
                        html += `
                            <div class="timeline-item">
                                <span class="timeline-date">${item.waktu}</span>
                                <div class="timeline-content">${item.keterangan}</div>
                            </div>
                        `;
                    });
                    html += `</div>`;
                    
                    hasilDiv.innerHTML = html;
                } else {
                    // Jika Nombor DO tidak ditemui (Alert dan Pesan)
                    alert("Nomor DO yang anda masukkan tidak ditemukan.");
                    hasilDiv.innerHTML = `<p style="color:red; text-align:center; font-weight:bold;">Nomor DO tidak ditemukan. Mohon periksa kembali.</p>`;
                }
            });
        }