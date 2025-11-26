// Навигация
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Слайдер
class Slider {
    constructor() {
        this.slides = document.querySelector('.slides');
        this.slideItems = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.currentSlide = 0;
        this.autoSlideInterval = null;
        
        if (this.slides && this.slideItems.length > 0) {
            this.init();
        }
    }
    
    init() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        this.dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                this.goToSlide(parseInt(e.target.dataset.slide));
            });
        });
        
        // Автопрокрутка
        this.startAutoSlide();
        
        // Пауза при наведении
        this.slides.addEventListener('mouseenter', () => this.stopAutoSlide());
        this.slides.addEventListener('mouseleave', () => this.startAutoSlide());
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slideItems.length;
        this.updateSlider();
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slideItems.length) % this.slideItems.length;
        this.updateSlider();
    }
    
    goToSlide(slideIndex) {
        this.currentSlide = slideIndex;
        this.updateSlider();
    }
    
    updateSlider() {
        this.slides.style.transform = `translateX(-${this.currentSlide * 100}%)`;
        
        // Обновляем точки
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    startAutoSlide() {
        this.stopAutoSlide();
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }
    }
}

// Плавная прокрутка
function scrollToServices() {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        servicesSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Обновляем активную ссылку в навигации
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Обработка отправки формы (для демонстрации)
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация слайдера
    new Slider();
    
    // Обработка формы администратора
    const adminForm = document.querySelector('.admin-form');
    if (adminForm) {
        adminForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const login = document.getElementById('login').value;
            const password = document.getElementById('password').value;
            
            // Демо-авторизация
            if (login && password) {
                alert('Демо-вход выполнен! В реальном проекте здесь будет отправка на сервер.');
                // window.location.href = 'admin-dashboard.html';
            }
        });
    }
    
    // Добавляем класс для мобильной навигации при загрузке
    if (window.innerWidth <= 768) {
        document.body.classList.add('mobile-menu');
    }
});

// Обработчик изменения размера окна
window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        document.body.classList.add('mobile-menu');
    } else {
        document.body.classList.remove('mobile-menu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    }
});
