document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');

    if (header) {
        const setHeaderState = () => {
            header.classList.toggle('scrolled', window.scrollY > 20);
        };

        setHeaderState();
        window.addEventListener('scroll', setHeaderState, { passive: true });
    }

    const carousel = document.querySelector('.hero-carousel');

    if (carousel) {
        const slides = [...carousel.querySelectorAll('.hero-carousel-slide')];
        const dots = [...carousel.querySelectorAll('.hero-carousel-dots button')];
        const previousButton = carousel.querySelector('.hero-carousel-prev');
        const nextButton = carousel.querySelector('.hero-carousel-next');
        let currentSlide = 0;
        let autoplay;

        const showSlide = (slideIndex) => {
            currentSlide = (slideIndex + slides.length) % slides.length;

            slides.forEach((slide, index) => {
                slide.classList.toggle('is-active', index === currentSlide);
            });

            dots.forEach((dot, index) => {
                const isActive = index === currentSlide;
                dot.classList.toggle('is-active', isActive);
                dot.setAttribute('aria-selected', String(isActive));
            });
        };

        const startAutoplay = () => {
            window.clearInterval(autoplay);
            autoplay = window.setInterval(() => showSlide(currentSlide + 1), 5500);
        };

        previousButton.addEventListener('click', () => {
            showSlide(currentSlide - 1);
            startAutoplay();
        });

        nextButton.addEventListener('click', () => {
            showSlide(currentSlide + 1);
            startAutoplay();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                startAutoplay();
            });
        });

        carousel.addEventListener('mouseenter', () => window.clearInterval(autoplay));
        carousel.addEventListener('mouseleave', startAutoplay);
        carousel.addEventListener('focusin', () => window.clearInterval(autoplay));
        carousel.addEventListener('focusout', (event) => {
            if (!carousel.contains(event.relatedTarget)) {
                startAutoplay();
            }
        });

        startAutoplay();
    }

    document.body.classList.add('loaded');
});