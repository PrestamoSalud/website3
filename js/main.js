document.addEventListener('DOMContentLoaded', function() {
    // Header Scroll Effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Tabs Functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            
            // Remove active class from all buttons and panes
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Add active class to clicked button and target pane
            this.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });
    
    // FAQ Accordion
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', function() {
            // Toggle active class on the clicked item
            item.classList.toggle('active');
            
            // Optional: Close other accordion items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
    
    // Testimonial Slider
    const testimonialIndicators = document.querySelectorAll('.testimonial-indicators .indicator');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        const testimonials = document.querySelectorAll('.testimonial-card');
        
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
        });
        
        // Remove active class from all indicators
        testimonialIndicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Show the selected testimonial and make its indicator active
        testimonials[index].style.display = 'block';
        testimonialIndicators[index].classList.add('active');
    }
    
    // Initialize testimonial display
    showTestimonial(currentTestimonial);
    
    // Set up indicator clicks
    testimonialIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });
    
    // Auto rotate testimonials
    setInterval(function() {
        currentTestimonial = (currentTestimonial + 1) % testimonialIndicators.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Stats Counter Animation
    function animateCounter(element, target) {
        let count = 0;
        const duration = 2000; // ms
        const step = target / (duration / 16); // Update every ~16ms (60fps)
        
        const counter = setInterval(function() {
            count += step;
            
            if (count >= target) {
                clearInterval(counter);
                element.textContent = target + '+';
            } else {
                element.textContent = Math.floor(count) + '+';
            }
        }, 16);
    }
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    const statNumbers = document.querySelectorAll('.stats-number');
    let countersStarted = false;
    
    // Start counters when stats section comes into view
    window.addEventListener('scroll', function() {
        if (!countersStarted && statNumbers.length > 0 && isInViewport(statNumbers[0])) {
            countersStarted = true;
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'), 10);
                animateCounter(stat, target);
            });
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const formFields = form.querySelectorAll('input, textarea, select');
            let formData = {};
            
            formFields.forEach(field => {
                if (field.name || field.id) {
                    const key = field.name || field.id;
                    formData[key] = field.value;
                }
            });
            
            // Here you would normally send the form data to your server
            console.log('Form submitted:', formData);
            
            // Show success message (in a real implementation, only show after successful submission)
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = '✓ Enviado con éxito';
            submitButton.disabled = true;
            
            // Reset form and button after delay
            setTimeout(() => {
                form.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 3000);
        });
    });
});