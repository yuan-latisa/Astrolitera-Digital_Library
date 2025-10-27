// Data Buku
const dataBuku = {
  "Rekomendasi": [
    { id: 1, name: "Pergi", author: "Tere Liye", img: "https://via.placeholder.com/180x200?text=Pergi" },
    { id: 2, name: "Bumi", author: "Tere Liye", img: "https://via.placeholder.com/180x200?text=Bumi" },
    { id: 3, name: "Matahari", author: "Tere Liye", img: "https://via.placeholder.com/180x200?text=Matahari" }
  ],
  "Buku Populer": [
    { id: 4, name: "Hujan", author: "Tere Liye", img: "https://via.placeholder.com/180x200?text=Hujan" },
    { id: 5, name: "Pulang", author: "Tere Liye", img: "https://via.placeholder.com/180x200?text=Pulang" },
    { id: 6, name: "Nebula", author: "Tere Liye", img: "https://via.placeholder.com/180x200?text=Nebula" }
  ],
  "Buku Terlaris": [
    { id: 7, name: "Selamat Tinggal", author: "Tere Liye", img: "https://via.placeholder.com/180x200?text=Selamat+Tinggal" },
    { id: 8, name: "Rindu", author: "Tere Liye", img: "https://via.placeholder.com/180x200?text=Rindu" },
    { id: 9, name: "Komet", author: "Tere Liye", img: "https://via.placeholder.com/180x200?text=Komet" }
  ],
  "Buku Novel": [
    { id: 10, name: "Tentang Kamu", author: "Tere Liye", img: "https://via.placeholder.com/180x200?text=Tentang+Kamu" },
    { id: 11, name: "Laut Bercerita", author: "Leila S. Chudori", img: "https://via.placeholder.com/180x200?text=Laut+Bercerita" },
    { id: 12, name: "Ayah", author: "Andrea Hirata", img: "https://via.placeholder.com/180x200?text=Ayah" }
  ]
};

// Render Buku
const container = document.getElementById('bookSections');

for (const kategori in dataBuku) {
  const section = document.createElement('section');
  section.classList.add('section');

  section.innerHTML = `
    <div class="section-header">
      <h2>${kategori}</h2>
      <a href="#">Lihat Semua</a>
    </div>
    <div class="book-list">
      ${dataBuku[kategori].map(buku => `
        <div class="book-card" id="book-${buku.id}">
          <img src="${buku.img}" alt="${buku.name}">
          <div class="book-info">
            <h3>${buku.name}</h3>
            <p>${buku.author}</p>
            <div class="book-buttons">
              <button class="pinjam"><i data-lucide="book-open"></i>Pinjam</button>
              <button class="favorit"><i data-lucide="heart"></i>Favorit</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  container.appendChild(section);
}

// Render ulang ikon lucide setelah elemen dibuat
lucide.createIcons();
