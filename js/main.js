/**
 * PrestamoSalud - Landing Page Scripts
 * Versión: 2.0
 * Fecha: 2025-04-30
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        offset: 50,
        once: true,
        easing: 'ease-in-out'
    });
    
    // Navegación - Scroll behavior
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    /* // Navegación móvil
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            console.log('Hamburger clicked');
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Anima las barras del hamburger para formar una X
            if (hamburger.classList.contains('active')) {
                console.log('Hamburger clicked1');
                hamburger.children[0].style.transform = 'translateY(8px) rotate(45deg)';
                hamburger.children[1].style.opacity = '0';
                hamburger.children[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                console.log('Hamburger clicked2');
                hamburger.children[0].style.transform = 'none';
                hamburger.children[1].style.opacity = '1';
                hamburger.children[2].style.transform = 'none';
            }
            console.log('Hamburger clicked3');
        });
    }
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && hamburger.classList.contains('active')) {
                hamburger.click();
            }
        });
    }); */
    
    // Tabs en sección About
    const aboutTabs = document.querySelectorAll('.tab');
    
    if (aboutTabs.length > 0) {
        aboutTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remover clase active de todos los tabs
                document.querySelectorAll('.tab').forEach(t => {
                    t.classList.remove('active');
                });
                
                // Remover clase active de todos los tab contents
                document.querySelectorAll('.tab-content').forEach(c => {
                    c.classList.remove('active');
                });
                
                // Añadir clase active al tab seleccionado
                this.classList.add('active');
                
                // Activar el tab content correspondiente
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Tabs en sección Solutions
    const solutionTabs = document.querySelectorAll('.tab-btn');
    
    if (solutionTabs.length > 0) {
        solutionTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remover clase active de todos los tabs
                document.querySelectorAll('.tab-btn').forEach(t => {
                    t.classList.remove('active');
                });
                
                // Remover clase active de todos los tab panes
                document.querySelectorAll('.tab-pane').forEach(p => {
                    p.classList.remove('active');
                });
                
                // Añadir clase active al tab seleccionado
                this.classList.add('active');
                
                // Activar el tab pane correspondiente
                const targetId = this.getAttribute('data-target');
                document.getElementById(targetId).classList.add('active');
            });
        });
    }
    
    // Accordion en sección FAQ
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            
            header.addEventListener('click', function() {
                // Toggle del item actual
                item.classList.toggle('active');
                
                // Cerrar otros items (comportamiento de acordeón)
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        });
    }
    
    // Slider de testimonios
    const testimonialSlider = document.querySelector('.testimonials-track');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    const testimonials = document.querySelectorAll('.testimonial');
    let currentIndex = 0;
    
    if (testimonialSlider && testimonials.length > 0) {
        // Función para mostrar un testimonio específico
        function showTestimonial(index) {
            if (index < 0) {
                index = testimonials.length - 1;
            } else if (index >= testimonials.length) {
                index = 0;
            }
            
            currentIndex = index;
            testimonialSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        
        // Event listeners para los botones de navegación
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                showTestimonial(currentIndex - 1);
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                showTestimonial(currentIndex + 1);
            });
        }
        
        // Auto-rotación de testimonios
        let testimonialInterval = setInterval(function() {
            showTestimonial(currentIndex + 1);
        }, 6000);
        
        // Detener auto-rotación cuando el mouse está sobre los testimonios
        testimonialSlider.addEventListener('mouseenter', function() {
            clearInterval(testimonialInterval);
        });
        
        testimonialSlider.addEventListener('mouseleave', function() {
            testimonialInterval = setInterval(function() {
                showTestimonial(currentIndex + 1);
            }, 6000);
        });
    }
    
    // Animación de contadores en Stats
    const statNumbers = document.querySelectorAll('.stats-number');
    let countersStarted = false;
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-count'));
        const suffix = el.textContent.replace(/[0-9]/g, '');
        const duration = 2000; // 2 segundos
        const interval = 20; // cada 20ms
        const increment = target / (duration / interval);
        
        let current = 0;
        const timer = setInterval(function() {
            current += increment;
            
            if (current >= target) {
                el.textContent = formatearConComas(target) + suffix;
                clearInterval(timer);
            } else {
                el.textContent = formatearConComas(Math.floor(current)) + suffix;
            }
        }, interval);
    }
    
    function checkCounters() {
        if (statNumbers.length > 0 && !countersStarted) {
            const firstCounter = statNumbers[0];
            
            if (isElementInViewport(firstCounter)) {
                countersStarted = true;
                statNumbers.forEach(animateCounter);
            }
        }
    }

    function formatearConComas(numero) {
        return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    
    // Verificar contadores cuando se hace scroll
    window.addEventListener('scroll', checkCounters);
    
    // Verificar contadores cuando se carga la página
    checkCounters();
    
    // Timeline Progress en la sección How It Works
    const timelineProgress = document.querySelector('.timeline-progress');
    const timelineSteps = document.querySelectorAll('.timeline-step');
    
    if (timelineProgress && timelineSteps.length > 0) {
        const updateProgress = () => {
            const viewportHeight = window.innerHeight;
            const steps = Array.from(timelineSteps);
            let activeStepIndex = -1;
            
            // Encontrar el último paso visible en el viewport
            steps.forEach((step, index) => {
                const rect = step.getBoundingClientRect();
                if (rect.top + rect.height / 2 < viewportHeight) {
                    activeStepIndex = index;
                }
            });
            
            // Calcular progreso
            if (activeStepIndex >= 0) {
                const progress = ((activeStepIndex + 1) / steps.length) * 100;
                timelineProgress.style.height = `${progress}%`;
            }
        };
        
        window.addEventListener('scroll', updateProgress);
        updateProgress(); // Inicializar
    }
    
    // Formularios - Validación y envío
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            
            
            // Simular envío exitoso (aquí iría la lógica real de envío)
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Enviando...';


            const iframe = document.querySelector("iframe[name='hiddenFrame']");
            iframe.onload = function () {
                // Aquí puedes manejar la respuesta del iframe si es necesario
                console.log("Formulario enviado y respuesta recibida.");
                submitButton.innerHTML = '<i class="fas fa-check"></i> ¡Enviado con éxito!';
                
                // Mostrar mensaje de éxito
                const formMessage = document.createElement('div');
                formMessage.classList.add('form-message', 'success');
                formMessage.innerHTML = '<i class="fas fa-check-circle"></i> Su información ha sido recibida. Nos pondremos en contacto pronto.';
                form.appendChild(formMessage);
                
                // Resetear formulario
                form.reset();
                
                // Restaurar botón después de unos segundos
                setTimeout(function() {
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                    
                    // Eliminar mensaje después de unos segundos
                    setTimeout(function() {
                        formMessage.classList.add('fade-out');
                        setTimeout(function() {
                            formMessage.remove();
                        }, 500);
                    }, 3000);
                }, 2000);
            }
        });
    });
    
    // Scroll suave para enlaces de anclaje
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Evitar scroll si es un enlace vacío o '#'
            if (this.getAttribute('href') === '#') return;
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Ajustar por la altura del header
                    behavior: 'smooth'
                });
            }
        });
    });
});

/* // Funcionalidad para el menú de navegación
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    // Toggle para menú móvil
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Anima las barras del hamburger para formar una X
        if (hamburger.classList.contains('active')) {
            hamburger.children[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            hamburger.children[1].style.opacity = '0';
            hamburger.children[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            hamburger.children[0].style.transform = 'none';
            hamburger.children[1].style.opacity = '1';
            hamburger.children[2].style.transform = 'none';
        }
    });
    
    // Cierra el menú cuando se hace clic en un enlace
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.children[0].style.transform = 'none';
            hamburger.children[1].style.opacity = '1';
            hamburger.children[2].style.transform = 'none';
        });
    });
    
    // Header scrolling effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.height = '70px';
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.height = '80px';
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
        }
    });
});
 */

document.addEventListener('DOMContentLoaded', function() {
    // Crear efecto de red con puntos conectados en el fondo
    createNetworkBackground();
    
    // Animar las tarjetas flotantes
    animateCards();
    
    // Efecto parallax para los blobs
    setupParallaxEffect();
});

// Función para crear puntos y líneas de conexión (red)
function createNetworkBackground() {
    const networkGrid = document.querySelector('.network-grid');
    const numPoints = 30;
    const points = [];
    
    // Crear puntos
    for (let i = 0; i < numPoints; i++) {
        const point = document.createElement('div');
        point.classList.add('network-point');
        
        // Posición aleatoria
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        point.style.left = `${x}%`;
        point.style.top = `${y}%`;
        
        networkGrid.appendChild(point);
        points.push({ element: point, x, y });
    }
    
    // Crear líneas entre puntos cercanos
    points.forEach((point, i) => {
        points.slice(i + 1).forEach(otherPoint => {
            const dx = point.x - otherPoint.x;
            const dy = point.y - otherPoint.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Conectar puntos cercanos
            if (distance < 20) {
                const line = document.createElement('div');
                line.classList.add('network-line');
                
                const length = distance;
                const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                
                line.style.width = `${length}%`;
                line.style.left = `${(point.x + otherPoint.x) / 2}%`;
                line.style.top = `${(point.y + otherPoint.y) / 2}%`;
                line.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
                
                networkGrid.appendChild(line);
            }
        });
    });
}

// Función para animar las tarjetas
function animateCards() {
    const cards = document.querySelectorAll('.platform-card');
    
    cards.forEach(card => {
        // Añadir animación de entrada
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300);
    });
}

// Efecto parallax para los blobs
function setupParallaxEffect() {
    const blobs = document.querySelectorAll('.blob');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        blobs.forEach((blob, index) => {
            // Factor de movimiento diferente para cada blob
            const offsetX = (mouseX - 0.5) * (25 + index * 10);
            const offsetY = (mouseY - 0.5) * (25 + index * 10);
            
            blob.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
        });
    });
}