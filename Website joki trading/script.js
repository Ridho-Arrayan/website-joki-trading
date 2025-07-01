// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initScrollAnimations();
    initFAQ();
    initPackageAnimations();
    initSmoothScrolling();
});

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes and observe elements
    const animatedElements = [
        { selector: '.section-header', animation: 'fade-in-up' },
        { selector: '.package-card', animation: 'fade-in-up' },
        { selector: '.faq-item', animation: 'fade-in-up' },
        { selector: '.cta-content', animation: 'fade-in-up' }
    ];

    animatedElements.forEach(({ selector, animation }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.classList.add(animation);
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    });
}

// FAQ Functionality - Completely Rebuilt
function initFAQ() {
    // Simple direct approach - rebuild from scratch
    const faqContainer = document.querySelector('.faq-container');
    if (!faqContainer) return;
    
    // Get all FAQ items
    const faqItems = faqContainer.querySelectorAll('.faq-item');
    
    // Process each FAQ item with direct onclick
    faqItems.forEach((faqItem, index) => {
        const questionElement = faqItem.querySelector('.faq-question');
        
        if (questionElement) {
            // Set basic styles
            questionElement.style.cursor = 'pointer';
            
            // Direct onclick assignment (most compatible)
            questionElement.onclick = function() {
                console.log('FAQ clicked:', index);
                
                // Check current state
                const isOpen = faqItem.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(item => item.classList.remove('active'));
                
                // Open current item if it was closed
                if (!isOpen) {
                    faqItem.classList.add('active');
                }
                
                return false; // Prevent default
            };
        }
    });
}

// Package Card Animations
function initPackageAnimations() {
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add glow effect
            card.style.boxShadow = '0 20px 40px rgba(0, 255, 255, 0.3)';
            
            // Animate icon
            const icon = card.querySelector('.package-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            // Remove glow effect
            card.style.boxShadow = '';
            
            // Reset icon
            const icon = card.querySelector('.package-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Smooth Scrolling for Internal Links
function initSmoothScrolling() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// WhatsApp Button Animation
document.addEventListener('DOMContentLoaded', function() {
    const whatsappButton = document.querySelector('.whatsapp-button');
    
    if (whatsappButton) {
        // Add ripple effect on click
        whatsappButton.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
});

// Add ripple animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-particles');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Dynamic Background Animation
function createDynamicBackground() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;
    
    setInterval(() => {
        const particles = hero.querySelectorAll('.particle');
        particles.forEach(particle => {
            const randomX = Math.random() * 100;
            const randomY = Math.random() * 100;
            const randomDelay = Math.random() * 2;
            
            particle.style.left = randomX + '%';
            particle.style.top = randomY + '%';
            particle.style.animationDelay = randomDelay + 's';
        });
    }, 10000);
}

// Initialize dynamic background
createDynamicBackground();

// Loading Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger hero animations
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    }, 500);
    
    // Re-initialize FAQ after everything loads - with delay
    setTimeout(() => {
        console.log('Re-initializing FAQ after load...');
        initFAQ();
    }, 2000);
});

// Mobile Menu Toggle (if needed)
function initMobileMenu() {
    // This function can be expanded if you add a mobile navigation menu
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Adjust animations for mobile
        const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
        animatedElements.forEach(el => {
            el.style.transitionDuration = '0.4s';
        });
    }
}

// Initialize mobile optimizations
window.addEventListener('resize', initMobileMenu);
initMobileMenu();

// Performance Optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations can be added here
}, 16)); // ~60fps