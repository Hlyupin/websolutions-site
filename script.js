// Навигация
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Закрываем меню при клике на ссылку
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Инициализация слайдера
    initSlider();
    
    // Плавная прокрутка
    initSmoothScroll();
});

// Слайдер
function initSlider() {
    const slides = document.querySelector('.slides');
    const slideItems = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!slides || slideItems.length === 0) return;

    let currentSlide = 0;
    let autoSlideInterval;

    function updateSlider() {
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Обновляем точки
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideItems.length;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideItems.length) % slideItems.length;
        updateSlider();
    }

    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateSlider();
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Слушатели событий
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            goToSlide(parseInt(e.target.dataset.slide));
        });
    });

    // Автопрокрутка
    startAutoSlide();

    // Пауза при наведении
    const slider = document.querySelector('.slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
    }
}

// Плавная прокрутка
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Учитываем фиксированную навигацию
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Кнопка "Начать проект"
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                const offsetTop = servicesSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Обработка формы администратора
if (document.querySelector('.admin-form')) {
    document.querySelector('.admin-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const login = document.getElementById('login')?.value;
        const password = document.getElementById('password')?.value;
        
        if (login && password) {
            const submitBtn = this.querySelector('.admin-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Вход в систему...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('✅ Демо-вход выполнен успешно!\n\nЛогин: ' + login + '\nПароль: ' + password);
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                this.reset();
            }, 1500);
        }
    });
}
