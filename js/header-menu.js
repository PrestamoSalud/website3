// header-menu.js - Funcionalidad específica para el menú del header

document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos del DOM
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const header = document.querySelector('.header');
    
    // Verificar que los elementos existan
    if (!hamburger || !navMenu) {
        console.error('Menú hamburguesa o nav-menu no encontrados');
        return;
    }
    
    // Función para alternar estado del menú
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        header.classList.toggle('menu-open');
        
        // Prevenir scroll en el body cuando el menú está abierto
        //document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        
        console.log('Menú toggled, estado actual:', navMenu.classList.contains('active') ? 'abierto' : 'cerrado');
    }
    
    // Event listener para el botón hamburguesa
    hamburger.addEventListener('click', toggleMenu);
    
    // Cerrar menú al hacer clic en los enlaces
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            toggleMenu();
        });
    });
    
    // Cerrar menú al redimensionar la ventana a tamaño grande
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992 && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});