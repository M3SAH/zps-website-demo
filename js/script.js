/**
 * ZORAI PROCUREMENT SERVICE LTD (ZPS) - ARCHITECTURE CORE LOGIC
 * Pure Vanilla Object Engine - Free of external dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Core Application Scope State Execution
    initNavigationModule();
    initProjectFilterModule();
    initStatsCounterModule();
    initTestimonialCarouselModule();
    initFormValidationModule();
    initScrollAnimationModule();
});

/**
 * Header Navigation Control Engine
 */
function initNavigationModule() {
    const header = document.getElementById('site-header');
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const navWrapper = classSelector('.nav-menu-wrapper');
    const navLinks = document.querySelectorAll('.nav-link');

    // Change Header Background Profile on Vertical Scroll Translation
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
        highlightActiveSectionOnScroll();
    });

    // Mobile Hamburger Menu Trigger Expansion Control
    if (navToggle && navWrapper) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navWrapper.classList.toggle('open');
        });
    }

    // Intercept Link Intersections to Force Auto Collapse Drawer View
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');

            if (navWrapper.classList.contains('open')) {
                navWrapper.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Native Logic to Evaluated Scrolled Position mapping onto Nav Links state
    function highlightActiveSectionOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (correspondingLink) {
                    navLinks.forEach(el => el.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
}

/**
 * Projects Matrix Category Filtering Logic
 */
function initProjectFilterModule() {
    const buttons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item-card');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const criteria = btn.getAttribute('data-filter');

            projectItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (criteria === 'all' || itemCategory === criteria) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Statistical Counter Numeric Increment Engine
 */
function initStatsCounterModule() {
    const counterElements = document.querySelectorAll('.counter-number');
    
    if (counterElements.length === 0) return;

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetElement = entry.target;
                const finalTargetVal = parseInt(targetElement.getAttribute('data-target'), 10);
                executeCountAnimation(targetElement, finalTargetVal);
                observer.unobserve(targetElement); // Prevent counter loop replays
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(el => counterObserver.observe(el));

    function executeCountAnimation(element, target) {
        let currentCount = 0;
        const animationDuration = 1800; // Total ms execution ceiling
        const intervals = Math.ceil(animationDuration / 30);
        const incrementalStep = target / intervals;

        const progressionTimer = setInterval(() => {
            currentCount += incrementalStep;
            if (currentCount >= target) {
                element.textContent = target;
                clearInterval(progressionTimer);
            } else {
                element.textContent = Math.floor(currentCount);
            }
        }, 30);
    }
}

/**
 * Core Testimonial Review Carousel/Slider Layout Controller Matrix
 */
function initTestimonialCarouselModule() {
    const sliderContainer = document.getElementById('testimonial-slider');
    if (!sliderContainer) return;

    const slides = sliderContainer.querySelectorAll('.testimonial-slide');
    const prevBtn = classSelector('.prev-btn');
    const nextBtn = classSelector('.next-btn');
    const dotsContainer = document.getElementById('carousel-dots-container');
    
    let activeSlideIndex = 0;
    const totalSlidesCount = slides.length;

    // Render Progress Tracking Dot Nodes Dynamically
    for (let i = 0; i < totalSlidesCount; i++) {
        const dotNode = document.createElement('div');
        dotNode.classList.add('dot');
        if (i === 0) dotNode.classList.add('active');
        dotNode.setAttribute('data-slide-to', i);
        dotsContainer.appendChild(dotNode);
    }

    const compiledDotNodes = dotsContainer.querySelectorAll('.dot');

    function jumpToSlideIndex(targetIndex) {
        slides[activeSlideIndex].classList.remove('active');
        compiledDotNodes[activeSlideIndex].classList.remove('active');
        
        activeSlideIndex = (targetIndex + totalSlidesCount) % totalSlidesCount;
        
        slides[activeSlideIndex].classList.add('active');
        compiledDotNodes[activeSlideIndex].classList.add('active');
    }

    // Assign Click Interceptors onto Nav Elements
    nextBtn.addEventListener('click', () => jumpToSlideIndex(activeSlideIndex + 1));
    prevBtn.addEventListener('click', () => jumpToSlideIndex(activeSlideIndex - 1));

    compiledDotNodes.forEach(dot => {
        dot.addEventListener('click', () => {
            const indexValue = parseInt(dot.getAttribute('data-slide-to'), 10);
            jumpToSlideIndex(indexValue);
        });
    });

    // Auto Advance Play Loops Engine
    let autoPlaySchedule = setInterval(() => jumpToSlideIndex(activeSlideIndex + 1), 7000);

    sliderContainer.addEventListener('mouseenter', () => clearInterval(autoPlaySchedule));
    sliderContainer.addEventListener('mouseleave', () => {
        autoPlaySchedule = setInterval(() => jumpToSlideIndex(activeSlideIndex + 1), 7000);
    });
}

/**
 * Form Validation Structure Framework
 */
function initFormValidationModule() {
    const intakeForm = document.getElementById('procurement-intake-form');
    if (!intakeForm) return;

    intakeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isFormPayloadValid = true;

        const inputElementsArray = intakeForm.querySelectorAll('input[required], select[required], textarea[required]');

        inputElementsArray.forEach(field => {
            if (!validateFieldStructure(field)) {
                isFormPayloadValid = false;
            }
        });

        if (isFormPayloadValid) {
            const submitBtn = intakeForm.querySelector('.btn-submit-form');
            const btnText = submitBtn.querySelector('.btn-text');
            
            // Emulate Transmission State Activity
            submitBtn.disabled = true;
            btnText.textContent = "Transmitting Secured Data Package...";

            setTimeout(() => {
                displayToastAlert("Success! Procurement intake routing finalized. ZPS Desk tracking reference generated.");
                intakeForm.reset();
                submitBtn.disabled = false;
                btnText.textContent = "Transmit Procurement Request";
            }, 1500);
        }
    });

    function validateFieldStructure(field) {
        const fieldParentBlock = field.parentElement;
        let isFieldValid = true;

        if (!field.value || field.value.trim() === "") {
            isFieldValid = false;
        } else if (field.type === 'email') {
            const patternMatch = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isFieldValid = patternMatch.test(field.value.trim());
        }

        if (!isFieldValid) {
            fieldParentBlock.classList.add('invalid');
            return false;
        } else {
            fieldParentBlock.classList.remove('invalid');
            return true;
        }
    }

    // Attach Inline Changes Input Monitors to Clear Active Errors
    intakeForm.querySelectorAll('input, select, textarea').forEach(element => {
        element.addEventListener('input', () => {
            if(element.value.trim() !== "") {
                element.parentElement.classList.remove('invalid');
            }
        });
    });
}

/**
 * Native Scroll Reveal Animation Engine via IntersectionObserver
 */
function initScrollAnimationModule() {
    const animatedElements = document.querySelectorAll('.scroll-animate');
    
    if (animatedElements.length === 0) return;

    const scrollRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Optional: Unobserve if entry animation only needs to run once
                scrollRevealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    animatedElements.forEach(element => scrollRevealObserver.observe(element));
}

/**
 * Utility Elements Shorthand Engine Helper
 */
function classSelector(className) {
    return document.querySelector(className);
}

/**
 * Toast Overlay Dynamic Display Execution
 */
function displayToastAlert(messageText) {
    const toastNode = document.getElementById('toast-notification');
    if (!toastNode) return;

    toastNode.textContent = messageText;
    toastNode.classList.remove('hidden');

    setTimeout(() => {
        toastNode.classList.add('hidden');
    }, 5000);
}