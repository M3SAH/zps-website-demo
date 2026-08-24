document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');

    if (header) {
        const setHeaderState = () => {
            header.classList.toggle('scrolled', window.scrollY > 20);
        };

        setHeaderState();
        window.addEventListener('scroll', setHeaderState, { passive: true });
    }

    document.body.classList.add('loaded');
});