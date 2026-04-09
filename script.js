const aboutEnterEls = [
  { sel: '.navbar',           tx: 0,   ty: -18, delay: 0    },
  { sel: '.about-photo-wrap', tx: -28, ty: 0,   delay: 0.15 },
  { sel: '.about-left',       tx: 28,  ty: 0,   delay: 0.22 },
];

aboutEnterEls.forEach(({ sel, tx, ty, delay }) => {
  const el = document.querySelector(sel);
  if (!el) return;
  el.style.opacity   = '0';
  el.style.transform = `translate(${tx}px, ${ty}px)`;
  el.style.transition = `opacity 0.8s ${delay}s ease, transform 0.8s ${delay}s cubic-bezier(0.22,1,0.36,1)`;
});

window.addEventListener('load', () => {
  setTimeout(() => {
    aboutEnterEls.forEach(({ sel }) => {
      const el = document.querySelector(sel);
      if (!el) return;
      el.style.opacity   = '1';
      el.style.transform = 'none';
    });
  }, 60);
});

const skillExamples = {
  html: {
    title: 'HTML — Struktur Dasar',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Halaman Saya</title>
</head>
<body>
  <h1>Halo, saya DY!</h1>
  <p>Ini paragraf pertama saya.</p>
  <a href="#">Klik di sini</a>
</body>
</html>`
  },
  css: {
    title: 'CSS — Styling Elemen',
    code: `/* Ubah tampilan heading */
h1 {
  color: #c8f542;
  font-size: 3rem;
  font-weight: 800;
}

/* Tombol dengan hover effect */
.btn {
  background: #c8f542;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  transition: transform 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
}`
  },
  js: {
    title: 'JavaScript — Interaksi',
    code: `// Tampilkan pesan saat tombol diklik
const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
  alert('Halo dari JavaScript!');
});

// Ubah teks secara dinamis
const heading = document.querySelector('h1');
heading.textContent = 'Teks berubah!';`
  },
  responsive: {
    title: 'Responsive Design — Media Query',
    code: `/* Default: tampilan desktop */
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

/* Tablet & HP: satu kolom */
@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }

  h1 {
    font-size: 2rem;
  }
}`
  },
  git: {
    title: 'Git — Perintah Dasar',
    code: `# Inisialisasi repo baru
git init

# Tambah semua file
git add .

# Simpan perubahan
git commit -m "first commit"

# Hubungkan ke GitHub
git remote add origin https://github.com/username/repo.git

# Upload ke GitHub
git push -u origin main`
  },
  vscode: {
    title: 'VSCode — Shortcut Penting',
    code: `Ctrl + S          → Simpan file
Ctrl + /          → Comment/uncomment baris
Alt + Shift + F   → Format kode otomatis
Ctrl + \`          → Buka terminal
Ctrl + P          → Cari file cepat
Ctrl + Shift + P  → Command palette
Alt + ↑ / ↓       → Pindah baris ke atas/bawah
Ctrl + D          → Pilih kata yang sama berikutnya`
  }
};

const modal      = document.getElementById('skill-modal');
const modalTitle = document.getElementById('modal-title');
const modalCode  = document.getElementById('modal-code');
const modalClose = document.getElementById('modal-close');

let hoverTimeout;

document.querySelectorAll('.skill-icon-card').forEach(tag => {
  tag.addEventListener('mouseenter', () => {
    clearTimeout(hoverTimeout);
    const key  = tag.getAttribute('data-skill');
    const data = skillExamples[key];
    if (!data) return;
    modalTitle.textContent = data.title;
    modalCode.textContent  = data.code;
    modal.classList.remove('hidden');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        modal.classList.add('visible');
      });
    });
  });

  tag.addEventListener('mouseleave', () => {
    hoverTimeout = setTimeout(() => {
      closeModal();
    }, 200);
  });
});

const modalBox = modal.querySelector('.skill-modal-box');

modalBox.addEventListener('mouseenter', () => {
  clearTimeout(hoverTimeout);
});

modalBox.addEventListener('mouseleave', () => {
  hoverTimeout = setTimeout(() => {
    closeModal();
  }, 150);
});

function closeModal() {
  modal.classList.remove('visible');
  setTimeout(() => modal.classList.add('hidden'), 300);
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section-label').forEach(el => {
  el.classList.add('fade-left');
  revealObserver.observe(el);
});

document.querySelectorAll('.about-left').forEach(el => {
  el.classList.add('fade-right');
  revealObserver.observe(el);
});
document.querySelectorAll('.about-photo-wrap').forEach(el => {
  el.classList.add('fade-left');
  revealObserver.observe(el);
});
document.querySelectorAll('.stat-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
  el.classList.add('fade-el');
  revealObserver.observe(el);
});
document.querySelectorAll('.skills-section').forEach(el => {
  el.classList.add('fade-el');
  revealObserver.observe(el);
});

document.querySelectorAll('.skill-icon-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.07}s`;
  el.classList.add('fade-el');
  revealObserver.observe(el);
});

document.querySelectorAll('.project-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.12}s`;
  el.classList.add('fade-el');
  if (el.classList.contains('coming-soon')) {
    el.style.opacity = '';
    el.addEventListener('transitionend', () => {
      if (el.classList.contains('visible')) {
        el.style.opacity = '0.35';
      } else {
        el.style.opacity = '';
      }
    });
  }
  revealObserver.observe(el);
});

document.querySelectorAll('.contact-heading, .contact-sub').forEach(el => {
  el.classList.add('fade-el');
  revealObserver.observe(el);
});

document.querySelectorAll('.timeline-item').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.12}s`;
  el.classList.add('fade-el');
  revealObserver.observe(el);
});
document.querySelectorAll('.contact-link').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.5}s`;
  el.classList.add('fade-el');
  revealObserver.observe(el);
});

document.querySelectorAll('footer p').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
  el.classList.add('fade-el');
  revealObserver.observe(el);
});

document.querySelectorAll('.contact-heading, .contact-sub, .contact-form-wrap').forEach(el => {
  el.classList.add('fade-el');
  revealObserver.observe(el);
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-pill');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
});

document.querySelectorAll('.stat-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const rx   = (((e.clientY - rect.top)  / rect.height) - 0.5) * -20;
    const ry   = (((e.clientX - rect.left) / rect.width)  - 0.5) *  20;
    card.style.transition  = 'border-color 0.15s, box-shadow 0.15s';
    card.style.transform   = `perspective(500px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-5px)`;
    card.style.borderColor = 'rgba(205, 234, 18, 0.35)';
    card.style.boxShadow   = `${-ry * 0.8}px ${rx * 0.8}px 24px rgba(200,245,66,0.1)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transition  = 'border-color 0.3s, box-shadow 0.3s, transform 0.55s cubic-bezier(0.22,1,0.36,1)';
    card.style.transform   = 'perspective(500px) rotateX(0) rotateY(0) translateY(0)';
    card.style.borderColor = '';
    card.style.boxShadow   = '';
  });
});

const certModal      = document.getElementById('cert-modal');
const certModalClose = document.getElementById('cert-modal-close');
const certStatCard   = document.getElementById('cert-stat-card');

function openCertModal() {
  certModal.classList.remove('hidden');
  requestAnimationFrame(() => requestAnimationFrame(() => certModal.classList.add('visible')));
}

function closeCertModal() {
  certModal.classList.remove('visible');
  setTimeout(() => certModal.classList.add('hidden'), 300);
}

if (certStatCard) certStatCard.addEventListener('click', openCertModal);
if (certModalClose) certModalClose.addEventListener('click', closeCertModal);
if (certModal) certModal.addEventListener('click', (e) => { if (e.target === certModal) closeCertModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeCertModal(); });

document.querySelectorAll('.project-card:not(.coming-soon)').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const rx   = (((e.clientY - rect.top)  / rect.height) - 0.5) * -18;
    const ry   = (((e.clientX - rect.left) / rect.width)  - 0.5) *  18;
    card.style.transition  = 'border-color 0.15s, box-shadow 0.15s';
    card.style.transform   = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
    card.style.borderColor = '#c8f542';
    card.style.boxShadow   = `${-ry * 1.5}px ${rx * 1.5}px 30px rgba(200,245,66,0.12)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transition  = 'border-color 0.3s, box-shadow 0.3s, transform 0.55s cubic-bezier(0.22,1,0.36,1)';
    card.style.transform   = 'perspective(700px) rotateX(0) rotateY(0) translateY(0)';
    card.style.borderColor = '';
    card.style.boxShadow   = '';
  });
});

document.querySelectorAll('.contact-link').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect    = card.getBoundingClientRect();
    const x       = e.clientX - rect.left;
    const y       = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform   = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    card.style.borderColor = '#c8f542';
    card.style.color       = '#c8f542';
    card.style.boxShadow   = `${-rotateY * 2}px ${rotateX * 2}px 25px rgba(200,245,66,0.1)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform   = 'perspective(600px) rotateX(0) rotateY(0) translateY(0)';
    card.style.borderColor = '';
    card.style.color       = '';
    card.style.boxShadow   = '';
  });
});
