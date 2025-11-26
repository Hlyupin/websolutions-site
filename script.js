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
    
    // Инициализация карты
    initYandexMap();
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

// Яндекс Карты
function initYandexMap() {
    // Проверяем, загружена ли библиотека карт
    if (typeof ymaps === 'undefined') {
        console.log('Yandex Maps API не загружена');
        showMapPlaceholder();
        return;
    }

    ymaps.ready(function() {
        try {
            // Создаем карту
            var myMap = new ymaps.Map('map', {
                center: [55.758468, 37.601088], // Москва, Тверская ул.
                zoom: 15,
                controls: ['zoomControl', 'fullscreenControl']
            }, {
                searchControlProvider: 'yandex#search'
            });

            // Создаем метку
            var myPlacemark = new ymaps.Placemark([55.758468, 37.601088], {
                hintContent: 'WebSolutions',
                balloonContent: `
                    <div style="padding: 10px;">
                        <h3 style="margin: 0 0 10px 0; color: #2c3e50;">WebSolutions</h3>
                        <p style="margin: 0; color: #555;">
                            <strong>Адрес:</strong> г. Москва, ул. Тверская, д. 7<br>
                            <strong>Телефон:</strong> +7 (495) 123-45-67<br>
                            <strong>Email:</strong> info@websolutions.ru
                        </p>
                    </div>
                `
            }, {
                // Опции метки
                iconLayout: 'default#image',
                iconImageHref: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iNDIiIHZpZXdCb3g9IjAgMCAzMCA0MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1IDBDNi43MTUgMCAwIDYuNzE1IDAgMTVjMCAxMC41IDExLjI1IDI0LjM3NSAxMy4xMjUgMjYuNzVDMTMuNzUgNDEuNzUgMTQuMjUgNDIgMTUgNDJjMC43NSAwIDEuMjUtMC4yNSAxLjg3NS0wLjI1QzE4Ljc1IDM5LjM3NSAzMCAyNS41IDMwIDE1YzAtOC4yODUtNi43MTUtMTUtMTUtMTVaIiBmaWxsPSIjZTM0YzNjIi8+CjxjaXJjbGUgY3g9IjE1IiBjeT0iMTUiIHI9IjYiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
                iconImageSize: [30, 42],
                iconImageOffset: [-15, -42]
            });

            // Добавляем метку на карту
            myMap.geoObjects.add(myPlacemark);

            // Открываем балун при клике на метку
            myPlacemark.events.add('click', function() {
                myPlacemark.balloon.open();
            });

            // Адаптивность для мобильных устройств
            if (window.innerWidth <= 768) {
                myMap.behaviors.disable('scrollZoom');
            }

        } catch (error) {
            console.error('Ошибка при создании карты:', error);
            showMapPlaceholder();
        }
    });
}

// Заглушка если карта не загрузилась
function showMapPlaceholder() {
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        mapContainer.innerHTML = `
            <div class="map-placeholder">
                <i class="fas fa-map-marker-alt"></i>
                <p><strong>WebSolutions</strong></p>
                <p>г. Москва, ул. Тверская, д. 7</p>
                <p><small>Для просмотра карты необходим API-ключ Яндекс.Карт</small></p>
            </div>
        `;
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

// Обработчик изменения размера окна для адаптивности карты
window.addEventListener('resize', function() {
    if (typeof ymaps !== 'undefined' && window.myMap) {
        setTimeout(() => {
            window.myMap.container.fitToViewport();
        }, 300);
    }
});
