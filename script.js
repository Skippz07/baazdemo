// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const heroText = document.querySelector('.hero-text');
const typewriterText = document.querySelector('.typewriter');
const fadeInText = document.querySelector('.fade-in');

// Run text animation only once when page loads
function runTextAnimation() {
    typewriterText.style.animation = 'typing 3.5s steps(40, end), blink-caret .75s step-end infinite';
    fadeInText.style.animation = 'fadeIn 2s ease-in forwards';
}

// Run text animation when page loads
window.addEventListener('load', runTextAnimation);

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Start the slider
showSlide(0);
setInterval(nextSlide, 5000); // Change slide every 5 seconds

// Scroll Animations
function handleScroll() {
    const sections = document.querySelectorAll('.slogan-section, .quote-section, .services, .testimonials, .footer');
    const windowHeight = window.innerHeight;
    const triggerBottom = windowHeight * 0.8;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        
        if (sectionTop < triggerBottom) {
            section.classList.add('visible');
            
            // Handle nested elements with different animations
            if (section.classList.contains('slogan-section')) {
                section.querySelector('.slogan-text').classList.add('visible');
                section.querySelector('.slogan-image').classList.add('visible');
            } else if (section.classList.contains('quote-section')) {
                section.querySelector('.quote').classList.add('visible');
                section.querySelector('.before-after').classList.add('visible');
            } else if (section.classList.contains('services')) {
                const cards = section.querySelectorAll('.card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 200);
                });
            } else if (section.classList.contains('testimonials')) {
                const quotes = section.querySelectorAll('.testimonial-quote');
                quotes.forEach((quote, index) => {
                    setTimeout(() => {
                        quote.classList.add('visible');
                    }, index * 200);
                });
            }
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', handleScroll);
// Run once on load to check initial positions
window.addEventListener('load', handleScroll);

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add/remove background when scrolling
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Dropdown menu functionality
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    
    // Handle hover
    dropdown.addEventListener('mouseenter', () => {
        dropdownContent.style.display = 'block';
        setTimeout(() => {
            dropdownContent.style.opacity = '1';
            dropdownContent.style.transform = 'translateY(0)';
        }, 10);
    });
    
    dropdown.addEventListener('mouseleave', () => {
        dropdownContent.style.opacity = '0';
        dropdownContent.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            dropdownContent.style.display = 'none';
        }, 300);
    });
    
    // Handle focus for keyboard navigation
    dropdown.addEventListener('focusin', () => {
        dropdownContent.style.display = 'block';
        setTimeout(() => {
            dropdownContent.style.opacity = '1';
            dropdownContent.style.transform = 'translateY(0)';
        }, 10);
    });
    
    dropdown.addEventListener('focusout', (e) => {
        // Check if focus is moving to another element within the dropdown
        if (!dropdown.contains(e.relatedTarget)) {
            dropdownContent.style.opacity = '0';
            dropdownContent.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                dropdownContent.style.display = 'none';
            }, 300);
        }
    });
});

// Mobile Menu Toggle (if needed)
const mobileMenuBtn = document.createElement('button');
mobileMenuBtn.classList.add('mobile-menu-btn');
mobileMenuBtn.innerHTML = '☰';
navbar.insertBefore(mobileMenuBtn, navbar.firstChild);

const nav = document.querySelector('nav');

mobileMenuBtn.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});

// Add mobile menu button styles
const style = document.createElement('style');
style.textContent = `
    .mobile-menu-btn {
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--primary);
    }

    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block;
        }

        nav {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            padding: 1rem;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        nav.show {
            display: block;
        }

        nav ul {
            flex-direction: column;
            align-items: stretch;
        }

        nav ul li {
            margin: 0.5rem 0;
        }

        .dropdown-content {
            position: static;
            box-shadow: none;
            padding-left: 1rem;
        }
    }
`;

document.head.appendChild(style); 