document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // If it's a hash link (starts with #)
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Carousel functionality
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);

    // Navbar blur effect on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            } else {
                navbar.style.backdropFilter = 'none';
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            }
        });
    }

    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    document.body.appendChild(scrollToTopBtn);

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements that should animate
    document.querySelectorAll('.service-card, .testimonial-card, .footer-column').forEach(el => {
        observer.observe(el);
    });

    // Before/After image hover effects
    document.querySelectorAll('.image-container').forEach(container => {
        container.addEventListener('mouseenter', () => {
            container.style.transform = 'translateZ(10px)';
        });
        container.addEventListener('mouseleave', () => {
            container.style.transform = 'translateZ(0)';
        });
    });

    // Service card hover effects
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('img').style.transform = 'scale(1.05)';
        });
        card.addEventListener('mouseleave', () => {
            card.querySelector('img').style.transform = 'scale(1)';
        });
    });

    // Form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.name || !data.email || !data.message) {
                alert('Please fill in all required fields');
                return;
            }
            
            // If validation passes, submit the form
            contactForm.submit();
        });
    }

    // FAQ Accordion with enhanced animations
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items with smooth animation
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = '0';
                    otherAnswer.style.opacity = '0';
                }
            });
            
            // Toggle current item with smooth animation
            const answer = item.querySelector('.faq-answer');
            if (item.classList.contains('active')) {
                item.classList.remove('active');
                answer.style.maxHeight = '0';
                answer.style.opacity = '0';
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
            }
        });

        // Add hover effect
        question.addEventListener('mouseenter', () => {
            if (!item.classList.contains('active')) {
                question.style.backgroundColor = 'rgba(244, 163, 0, 0.05)';
            }
        });

        question.addEventListener('mouseleave', () => {
            if (!item.classList.contains('active')) {
                question.style.backgroundColor = '#ffffff';
            }
        });
    });

    // Initialize FAQ items with icons
    function initFAQIcons() {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const existingIcon = question.querySelector('.icon-left');
            const existingToggle = question.querySelector('.toggle-icon');
            
            // Add left icon if it doesn't exist
            if (!existingIcon) {
                const iconLeft = document.createElement('i');
                iconLeft.className = 'fas fa-leaf icon-left';
                question.insertBefore(iconLeft, question.firstChild);
            }
            
            // Add toggle icon if it doesn't exist
            if (!existingToggle) {
                const toggleIcon = document.createElement('i');
                toggleIcon.className = 'fas fa-chevron-down toggle-icon';
                question.appendChild(toggleIcon);
            }
        });
    }

    // Initialize FAQ icons when DOM is loaded
    initFAQIcons();

    // Scroll Animation Observer
    const scrollAnimationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Add 'visible' class when element is in view
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing after animation
                // scrollAnimationObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.1, // trigger when 10% of element is visible
        rootMargin: '0px'
    });

    // Function to initialize scroll animations
    function initScrollAnimations() {
        // Select all elements that should fade in
        const animatedElements = document.querySelectorAll(`
            .slogan-text,
            .slogan-image,
            .quote blockquote,
            .before-after,
            .service-card,
            .testimonial-card,
            .contact-card,
            .footer-column,
            .section-header
        `);

        // Add fade-in-element class and observe each element
        animatedElements.forEach((element, index) => {
            // Add base animation class
            element.classList.add('fade-in-element');
            
            // Add delay classes for grouped elements
            if (element.parentElement && element.parentElement.classList.contains('service-grid')) {
                element.classList.add(`fade-delay-${index % 3 + 1}`);
            }
            if (element.parentElement && element.parentElement.classList.contains('testimonial-grid')) {
                element.classList.add(`fade-delay-${index % 3 + 1}`);
            }
            
            // Start observing the element
            scrollAnimationObserver.observe(element);
        });
    }

    // Initialize animations when DOM is loaded
    initScrollAnimations();
}); 