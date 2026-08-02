/** Scroll Reveal & Number Counters */
document.addEventListener('DOMContentLoaded', () => {
    
    // Intersection Observer for Reveal Classes
    const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-slide-left, .reveal-slide-right, .timeline-item');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // Animated Statistics Counters
    const counters = document.querySelectorAll('.count');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    function startCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000; 
        const stepTime = Math.abs(Math.floor(duration / target));
        let current = 0;
        
        const timer = setInterval(() => {
            current += 1;
            el.innerText = current;
            if (current >= target) {
                clearInterval(timer);
                el.innerText = target;
            }
        }, stepTime);
    }
});