document.addEventListener('DOMContentLoaded', function() {
    // Creación del fondo de red interactivo
    createInteractiveBackground();
    
    // Efecto parallax para los blobs y elementos al mover el mouse
    initMouseParallax();
});

function createInteractiveBackground() {
    const container = document.getElementById('networkGrid');
    const containerRect = container.getBoundingClientRect();
    const numPoints = 30; // Número de puntos en la red
    const points = [];
    const lines = [];
    const maxDistance = 200; // Distancia máxima para crear líneas entre puntos
    
    // Crear puntos
    for (let i = 0; i < numPoints; i++) {
        const point = document.createElement('div');
        point.classList.add('network-point');
        
        // Posición aleatoria
        const x = Math.random() * (containerRect.width - 10);
        const y = Math.random() * (containerRect.height - 10);
        
        point.style.left = `${x}px`;
        point.style.top = `${y}px`;
        
        container.appendChild(point);
        points.push({ element: point, x, y });
    }
    
    // Crear líneas entre puntos cercanos
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const dx = points[i].x - points[j].x;
            const dy = points[i].y - points[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < maxDistance) {
                const line = document.createElement('div');
                line.classList.add('network-line');
                
                // Calcular posición y rotación de la línea
                const length = distance;
                const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                
                line.style.width = `${length}px`;
                line.style.left = `${(points[i].x + points[j].x) / 2}px`;
                line.style.top = `${(points[i].y + points[j].y) / 2}px`;
                line.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
                
                container.appendChild(line);
                lines.push({ element: line, points: [i, j] });
            }
        }
    }
    
    // Animación de puntos lenta
    points.forEach(point => {
        animatePoint(point, containerRect);
    });
    
    // Interactividad con el mouse
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Afectar a los puntos cercanos al mouse
        points.forEach((point, index) => {
            const pointRect = point.element.getBoundingClientRect();
            const pointX = pointRect.left + pointRect.width / 2;
            const pointY = pointRect.top + pointRect.height / 2;
            
            const dx = mouseX - pointX;
            const dy = mouseY - pointY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Solo afecta a puntos dentro de cierto radio
            if (distance < 150) {
                const strength = (150 - distance) / 150; // 0 a 1, más fuerte cuanto más cerca
                const moveX = dx * 0.2 * strength;
                const moveY = dy * 0.2 * strength;
                
                point.element.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + strength * 0.5})`;
                
                // Iluminar el punto
                point.element.style.backgroundColor = `rgba(0, 102, 255, ${0.2 + strength * 0.4})`;
                point.element.style.boxShadow = `0 0 ${5 * strength}px rgba(0, 102, 255, ${strength * 0.7})`;
            } else {
                point.element.style.transform = '';
                point.element.style.backgroundColor = 'rgba(0, 102, 255, 0.2)';
                point.element.style.boxShadow = '';
            }
        });
        
        // Iluminar líneas cercanas al mouse
        lines.forEach(line => {
            const lineRect = line.element.getBoundingClientRect();
            const lineX = lineRect.left + lineRect.width / 2;
            const lineY = lineRect.top + lineRect.height / 2;
            
            const dx = mouseX - lineX;
            const dy = mouseY - lineY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const strength = (100 - distance) / 100;
                line.element.style.backgroundColor = `rgba(0, 102, 255, ${0.05 + strength * 0.2})`;
                line.element.style.height = `${1 + strength * 2}px`;
            } else {
                line.element.style.backgroundColor = 'rgba(0, 102, 255, 0.05)';
                line.element.style.height = '1px';
            }
        });
    });
}

function animatePoint(point, containerRect) {
    // Animación suave y continua para puntos
    const newX = Math.random() * (containerRect.width - 10);
    const newY = Math.random() * (containerRect.height - 10);
    
    const currentX = parseFloat(point.element.style.left);
    const currentY = parseFloat(point.element.style.top);
    
    const dx = newX - currentX;
    const dy = newY - currentY;
    
    // Duración de la animación (entre 20 y 40 segundos)
    const duration = 20000 + Math.random() * 20000;
    
    // Animación con requestAnimationFrame
    const startTime = performance.now();
    
    function movePoint(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Función de easing para un movimiento más natural
        const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
        
        const x = currentX + dx * easeProgress;
        const y = currentY + dy * easeProgress;
        
        point.element.style.left = `${x}px`;
        point.element.style.top = `${y}px`;
        
        if (progress < 1) {
            requestAnimationFrame(movePoint);
        } else {
            // Una vez finalizada la animación, comienza otra
            setTimeout(() => {
                animatePoint(point, containerRect);
            }, 100);
        }
    }
    
    requestAnimationFrame(movePoint);
}

function initMouseParallax() {
    const blobs = document.querySelectorAll('.blob');
    const cards = document.querySelectorAll('.feature-card');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Efecto parallax para los blobs (movimiento invertido)
        blobs.forEach((blob, index) => {
            const depth = index === 0 ? 30 : 20;
            const offsetX = (mouseX - 0.5) * depth;
            const offsetY = (mouseY - 0.5) * depth;
            
            blob.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
        });
        
        // Efecto sutil para las tarjetas
        cards.forEach((card, index) => {
            const depth = 10;
            const offsetX = (mouseX - 0.5) * depth * (index * 0.2 + 0.8);
            const offsetY = (mouseY - 0.5) * depth * (index * 0.2 + 0.8);
            
            // Combinar con la animación flotante
            card.style.transform = `translate3d(${offsetX}px, ${offsetY - 5}px, 0)`;
        });
    });
}