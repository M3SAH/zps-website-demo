document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileToggle && mainNav) {
        let overlay = document.querySelector('.mobile-nav-overlay');

        if (!overlay) {
            overlay = document.createElement('button');
            overlay.type = 'button';
            overlay.className = 'mobile-nav-overlay';
            overlay.setAttribute('aria-label', 'Close menu');
            document.body.appendChild(overlay);
        }

        const closeNav = () => {
            mainNav.classList.remove('open');
            mobileToggle.classList.remove('is-open');
            mobileToggle.setAttribute('aria-expanded', 'false');
            overlay.classList.remove('visible');
            document.body.classList.remove('menu-open');
        };

        const openNav = () => {
            mainNav.classList.add('open');
            mobileToggle.classList.add('is-open');
            mobileToggle.setAttribute('aria-expanded', 'true');
            overlay.classList.add('visible');
            document.body.classList.add('menu-open');
        };

        mobileToggle.addEventListener('click', () => {
            const isOpen = mainNav.classList.contains('open');
            if (isOpen) {
                closeNav();
            } else {
                openNav();
            }
        });

        overlay.addEventListener('click', closeNav);

        mainNav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', closeNav);
        });

        document.addEventListener('click', (event) => {
            if (!mainNav.contains(event.target) && !mobileToggle.contains(event.target) && !overlay.contains(event.target)) {
                closeNav();
            }
        });
    }

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.main-nav a').forEach((link) => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
});