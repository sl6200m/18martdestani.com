document.addEventListener('DOMContentLoaded', function() {
    // Select all elements with animation classes
    const animateElements = document.querySelectorAll(
        '.animate-slide-up, .animate-slide-down, .animate-slide-left, ' +
        '.animate-slide-right, .animate-fade-in, .animate-scale-in'
    );
    
    // Observer configuration
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust trigger point slightly upward
    };
    
    // Create Intersection Observer instance
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When element comes into view
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translate(0, 0) scale(1)';
                
                // Stop observing this element after animation triggers
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Initialize each animated element
    animateElements.forEach(element => {
        // Set initial state based on animation class
        if (element.classList.contains('animate-slide-up')) {
            element.style.transform = 'translateY(50px)';
        } else if (element.classList.contains('animate-slide-down')) {
            element.style.transform = 'translateY(-50px)';
        } else if (element.classList.contains('animate-slide-left')) {
            element.style.transform = 'translateX(50px)';
        } else if (element.classList.contains('animate-slide-right')) {
            element.style.transform = 'translateX(-50px)';
        } else if (element.classList.contains('animate-scale-in')) {
            element.style.transform = 'scale(0.8)';
        }
        // For fade-in only elements
        else if (element.classList.contains('animate-fade-in')) {
            element.style.transform = 'none';
        }
        
        // Common initial styles for all animations
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        // Start observing the element
        observer.observe(element);
    });

    // Additional interactive elements can be added below
    // For example: navigation, scroll effects, etc.
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile navigation toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
            burger.classList.toggle('toggle');
        });
    }
    
    // Parallax effect for background elements
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.speed) || 0.5;
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
        
        // Navbar effect on scroll
        const nav = document.getElementById('main-nav');
        if (nav) {
            if (scrollPosition > 100) {
                nav.style.background = 'rgba(0,0,0,0.9)';
                nav.style.padding = '15px 5%';
            } else {
                nav.style.background = 'transparent';
                nav.style.padding = '20px 5%';
            }
        }
    });
});