/**
 * PrestamoSalud - Animaciones Avanzadas
 * Complementa el archivo main.js con efectos visuales adicionales
 * Versión: 1.0.0
 * Fecha: 2025-05-01
 */

document.addEventListener('DOMContentLoaded', function() {
    // Configuración de animaciones personalizadas
    const animationSettings = {
        duration: 1500,
        once: true,
        mirror: false,
        anchorPlacement: 'top-bottom'
    };
    
    // Inicializar animaciones contextuales para elementos específicos
    initContextualAnimations();
    
    // Animaciones de la sección Hero
    initHeroAnimations();
    
    // Inicializar efectos parallax
    initParallaxEffects();
    
    // Animaciones para elementos numéricos
    initCounterAnimations();
    
    // Configuración de desplazamiento suavizado personalizado
    initSmoothScrolling();
    
    // Efectos de tarjetas interactivas
    initCardInteractions();

    /**
     * Inicializa animaciones contextuales basadas en la posición de la página
     */
    function initContextualAnimations() {
        // Elementos que tendrán animaciones contextuales
        const animatedElements = document.querySelectorAll('.feature-card, .benefit-card, .client-card, .floating-card');
        
        // Configurar observador de intersección para activar animaciones
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Añadir clase específica basada en el tipo de elemento
                    if (entry.target.classList.contains('feature-card')) {
                        entry.target.classList.add('pulse-effect');
                    } else if (entry.target.classList.contains('benefit-card')) {
                        entry.target.classList.add('glow-effect');
                    } else if (entry.target.classList.contains('floating-card')) {
                        entry.target.classList.add('enhanced-float');
                    }
                    
                    // Dejar de observar el elemento una vez animado
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -10% 0px'
        });
        
        // Comenzar observación de elementos
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Inicializa animaciones específicas para la sección de hero
     */
    function initHeroAnimations() {
        // Animación de entrada para el título principal
        const heroTitle = document.querySelector('.hero-content h1');
        if (heroTitle) {
            // Dividir el texto en palabras para animación secuencial
            const text = heroTitle.innerHTML;
            const words = text.split(' ');
            
            // Crear HTML con envolturas para cada palabra
            const newHTML = words.map((word, index) => {
                return `<span class="animated-word" style="animation-delay: ${index * 100}ms;">${word}</span>`;
            }).join(' ');
            
            heroTitle.innerHTML = newHTML;
            
            // Añadir clase para iniciar animación después de un breve retraso
            setTimeout(() => {
                document.querySelectorAll('.animated-word').forEach(word => {
                    word.classList.add('reveal');
                });
            }, 500);
        }
        
        // Efecto de desplazamiento para los blobs del fondo
        const blobs = document.querySelectorAll('.blob');
        
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            blobs.forEach((blob, index) => {
                // Crear movimiento suave pero distintivo para cada blob
                const offsetX = (x - 0.5) * (20 + index * 5);
                const offsetY = (y - 0.5) * (20 + index * 5);
                
                blob.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            });
        });
    }
    
    /**
     * Inicializa efectos parallax en elementos seleccionados
     */
    function initParallaxEffects() {
        // Elementos que tendrán efecto parallax
        const parallaxElements = document.querySelectorAll('.solution-image, .about-main-image, .feature-image');
        
        // Configurar efecto parallax básico al hacer scroll
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            
            parallaxElements.forEach(element => {
                // Obtener posición del elemento en la ventana
                const rect = element.getBoundingClientRect();
                const elementMiddle = rect.top + rect.height / 2;
                const screenMiddle = window.innerHeight / 2;
                
                // Calcular distancia desde el centro de la pantalla
                const distanceFromCenter = elementMiddle - screenMiddle;
                
                // Aplicar transformación basada en la distancia (efecto sutil)
                const parallaxValue = distanceFromCenter * 0.05;
                
                element.style.transform = `translateY(${-parallaxValue}px)`;
            });
        }, { passive: true });
        
        // Efecto parallax adicional para el fondo de beneficios
        const benefitsSection = document.querySelector('.benefits');
        if (benefitsSection) {
            window.addEventListener('scroll', () => {
                const scrolled = window.scrollY;
                const benefitsTop = benefitsSection.offsetTop;
                
                // Calcular desplazamiento proporcional al scroll
                if (scrolled > benefitsTop - window.innerHeight && scrolled < benefitsTop + benefitsSection.offsetHeight) {
                    const parallaxValue = (scrolled - (benefitsTop - window.innerHeight)) * 0.2;
                    document.querySelector('.benefits-bg').style.backgroundPositionY = `${parallaxValue}px`;
                }
            }, { passive: true });
        }
    }
    
    /**
     * Inicializa animaciones para contadores con efectos mejorados
     */
    function initCounterAnimations() {
        // Selector para todos los elementos de estadísticas
        const statElements = document.querySelectorAll('.stats-number, .stat-number');
        
        // Observador de intersección para activar contadores cuando sean visibles
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animar contador cuando es visible
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        // Iniciar observación en elementos de estadísticas
        statElements.forEach(el => {
            counterObserver.observe(el);
        });
        
        // Función para animar contador con efectos de aceleración/desaceleración
        function animateCounter(element) {
            // Obtener valor objetivo desde atributo data o del texto
            const target = element.getAttribute('data-count') ? 
                           parseInt(element.getAttribute('data-count')) : 
                           parseInt(element.textContent.replace(/\D/g, ''));
            
            // Preservar sufijo (si existe)
            const suffix = element.textContent.replace(/[0-9]/g, '');
            
            // Configuración de la animación
            const duration = 2000; // 2 segundos
            const frameDuration = 1000 / 60; // 60fps
            const totalFrames = Math.round(duration / frameDuration);
            
            let frame = 0;
            let currentValue = 0;
            
            // Usar requestAnimationFrame para animación suave
            function easeOutQuart(x) {
                return 1 - Math.pow(1 - x, 4); // Función de aceleración para efecto natural
            }
            
            // Función de animación de cuadro
            function animateFrame() {
                frame++;
                
                // Calcular progreso con función de aceleración
                const progress = easeOutQuart(frame / totalFrames);
                currentValue = Math.floor(target * progress);
                
                // Actualizar el elemento
                element.textContent = currentValue + suffix;
                
                // Continuar la animación si no ha terminado
                if (frame < totalFrames) {
                    requestAnimationFrame(animateFrame);
                } else {
                    // Asegurar que el valor final sea exacto
                    element.textContent = target + suffix;
                }
            }
            
            // Iniciar animación
            requestAnimationFrame(animateFrame);
        }
    }
    
    /**
     * Inicializa desplazamiento suavizado personalizado para enlaces internos
     */
    function initSmoothScrolling() {
        // Seleccionar todos los enlaces internos
        document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Obtener el elemento objetivo
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Calcular posición destino con offset para el header fijo
                    const headerOffset = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                    
                    // Animación de scroll suavizado con efecto easeInOutQuad
                    scrollWithAnimation(targetPosition);
                    
                    // Actualizar URL sin causar un scroll adicional
                    window.history.pushState(null, null, targetId);
                }
            });
        });
        
        // Función para scroll suavizado con aceleración/desaceleración personalizada
        function scrollWithAnimation(targetPosition) {
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 800; // milisegundos
            let startTime = null;
            
            // Función de efecto de desaceleración
            function easeInOutQuad(t) {
                return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
            }
            
            // Animación de scroll
            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                const easeProgress = easeInOutQuad(progress);
                
                window.scrollTo(0, startPosition + distance * easeProgress);
                
                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }
            
            requestAnimationFrame(animation);
        }
    }
    
    /**
     * Inicializa interacciones avanzadas para tarjetas y elementos interactivos
     */
    function initCardInteractions() {
        // Selector para cards que tendrán efecto 3D al hover
        const interactiveCards = document.querySelectorAll('.feature-card, .about-card, .client-card');
        
        interactiveCards.forEach(card => {
            // Configurar efecto de perspectiva 3D suave al mover el mouse
            card.addEventListener('mousemove', (e) => {
                // Obtener posición relativa del mouse dentro del elemento
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // posición x relativa al elemento
                const y = e.clientY - rect.top;  // posición y relativa al elemento
                
                // Calcular rotación basada en la posición (máximo 10 grados)
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateY = ((x - centerX) / centerX) * 5; // -5 a 5 grados
                const rotateX = ((y - centerY) / centerY) * -5; // 5 a -5 grados (invertido para efecto natural)
                
                // Aplicar transformación con transición suave
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                card.style.boxShadow = `0 20px 40px rgba(0, 0, 0, 0.1), 
                                      ${rotateY * 0.5}px ${rotateX * -0.5}px 10px rgba(0, 0, 0, 0.05)`;
            });
            
            // Restablecer transformación al salir del elemento
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                card.style.boxShadow = '';
                card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
                
                // Eliminar la transición después de completarse para que la entrada sea instantánea
                setTimeout(() => {
                    card.style.transition = '';
                }, 500);
            });
        });
        
        // Efecto especial para la imagen de la plataforma
        const platformImage = document.querySelector('.platform-showcase');
        if (platformImage) {
            platformImage.addEventListener('mousemove', (e) => {
                const rect = platformImage.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Crear efecto de brillo que sigue al cursor
                const shine = document.querySelector('.shine-effect') || document.createElement('div');
                shine.classList.add('shine-effect');
                
                // Posicionar el brillo en la posición del cursor
                shine.style.top = `${y}px`;
                shine.style.left = `${x}px`;
                
                // Añadir el elemento de brillo si no existe
                if (!document.querySelector('.shine-effect')) {
                    platformImage.appendChild(shine);
                }
            });
            
            platformImage.addEventListener('mouseleave', () => {
                const shine = document.querySelector('.shine-effect');
                if (shine) {
                    shine.remove();
                }
            });
        }
    }
});