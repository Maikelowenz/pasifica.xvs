// == SCRIPT UNTUK PRELOADER "WOW" BARU ==
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    // Tambahkan delay sedikit agar tidak terlalu cepat hilang
    setTimeout(() => {
        preloader.classList.add('loaded');
    }, 500); // 500ms = 0.5 detik delay
});


// == SCRIPT UNTUK ANIMASI GELEMBUNG (PARTIKEL) ==
// (Ini masih sama, tidak berubah)
particlesJS("particles-js", {
    "particles": {
        "number": {"value": 25, "density": {"enable": true, "value_area": 800}},
        "color": {"value": "#00f2fe"},
        "shape": {"type": "circle"},
        "opacity": {"value": 0.3, "random": true},
        "size": {"value": 4, "random": true},
        "line_linked": {"enable": false},
        "move": {
            "enable": true, "speed": 1.5, "direction": "top", "random": false,
            "straight": false, "out_mode": "out", "bounce": false
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {"onhover": {"enable": true, "mode": "bubble"}, "onclick": {"enable": true, "mode": "push"}, "resize": true},
        "modes": {
            "bubble": {"distance": 200, "size": 8, "duration": 2, "opacity": 0.8},
            "push": {"particles_nb": 4}
        }
    },
    "retina_detect": true
});


// == SCRIPT UNTUK 3D TILT "WOW" BARU ==
VanillaTilt.init(document.querySelectorAll(".gallery-item, .structure-member"), {
    max: 15,       // Maksimal kemiringan
    speed: 400,    // Kecepatan transisi
    glare: true,   // Efek silau/pantulan
    "max-glare": 0.3 // Intensitas silau
});


// == SCRIPT UNTUK EFEK SCROLL BARU (HEADER & PARALLAX) ==
const header = document.querySelector('.header');
const seaMonster = document.querySelector('.sea-monster-bg');

window.addEventListener('scroll', () => {
    // 1. Efek Header Mengecil
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // 2. Efek Parallax Monster Laut
    if (seaMonster) {
        const scrollValue = window.scrollY;
        // Gerakkan monster lebih lambat dari scroll (scrollY * 0.3)
        // Ini akan membuatnya terlihat 'jauh' di latar belakang
        seaMonster.style.transform = `translateY(${scrollValue * 0.3}px)`;
    }
});


// == SCRIPT UNTUK ANIMASI SCROLL (Intersection Observer) ==
// (Ini masih sama, tidak berubah)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
elementsToAnimate.forEach(el => {
    observer.observe(el);
});


// == SCRIPT UNTUK KURSOR KUSTOM ==
// (Ini masih sama, tidak berubah)
const cursorDot = document.querySelector('.custom-cursor-dot');
const cursorOutline = document.querySelector('.custom-cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});
