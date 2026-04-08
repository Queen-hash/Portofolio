const heroElements = [
  { el: document.querySelector('.hero-topleft'),    delay: '0s'    },
  { el: document.querySelector('.hero-topright'),   delay: '0.1s'  },
  { el: document.querySelector('.hero-title-wrap'), delay: '0.2s'  },
  { el: document.querySelector('.hero-photo'),      delay: '0.3s'  },
  { el: document.querySelector('.hero-bottomleft'), delay: '0.35s' },
  { el: document.querySelector('.hero-scroll'),     delay: '0.4s'  },
];

heroElements.forEach(({ el, delay }) => {
  if (!el) return;
  el.style.transition = `opacity 0.7s ${delay} ease, transform 0.7s ${delay} cubic-bezier(0.22,1,0.36,1)`;
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
});

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    heroElements.forEach(({ el }) => {
      if (!el) return;
      if (entry.isIntersecting) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  });
}, { threshold: 0.1 });

const heroSection = document.querySelector('.hero');
if (heroSection) heroObserver.observe(heroSection);

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

document.querySelectorAll('.skill-tag').forEach(tag => {
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

// Kalau mouse masuk ke modal, jangan tutup
modal.addEventListener('mouseenter', () => {
  clearTimeout(hoverTimeout);
});

modal.addEventListener('mouseleave', () => {
  hoverTimeout = setTimeout(() => {
    closeModal();
  }, 200);
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

document.querySelectorAll('.about-text').forEach(el => {
  el.classList.add('fade-left');
  revealObserver.observe(el);
});
document.querySelectorAll('.skills-box').forEach(el => {
  el.classList.add('fade-right');
  revealObserver.observe(el);
});

document.querySelectorAll('.skill-tag').forEach((el, i) => {
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

document.querySelectorAll('.project-card:not(.coming-soon)').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect   = card.getBoundingClientRect();
    const x      = e.clientX - rect.left;
    const y      = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    card.style.borderColor = '#c8f542';
    card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 30px rgba(200,245,66,0.12)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateY(0)';
    card.style.borderColor = '';
    card.style.boxShadow = '';
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
