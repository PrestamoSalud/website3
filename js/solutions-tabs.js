document.addEventListener('DOMContentLoaded', function() {
  const tabItems = document.querySelectorAll('.tab-item');
  
  // Manejar el clic en las pestañas
  tabItems.forEach(tab => {
    tab.addEventListener('click', function() {
      // Eliminar la clase activa de todas las pestañas
      tabItems.forEach(t => t.classList.remove('active'));
      
      // Agregar la clase activa a la pestaña seleccionada
      this.classList.add('active');
      
      // Aquí podrías agregar lógica para cambiar el contenido según la pestaña seleccionada
      // Por ejemplo, cargar dinámicamente la información de cada tipo de institución
    });
  });
  
  // Animación de entrada para tarjetas de características
  const featureCards = document.querySelectorAll('.feature-card');
  
  featureCards.forEach((card, index) => {
    // Establecer un retraso escalonado para la animación
    const delay = 200 * index;
    
    // Configurar estilos iniciales para la animación
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    // Iniciar la animación después del retraso
    setTimeout(() => {
      card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, delay + 300);
  });
});