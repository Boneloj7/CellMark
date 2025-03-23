
// Animaciones al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Animar elementos al cargar
    gsap.from(".login-container", {
        duration: 0.8, 
        opacity: 0, 
        y: 30, 
        ease: "power3.out"
    });
     
    gsap.from(".login-image", {
        duration: 1, 
        opacity: 0, 
        x: -50, 
        ease: "power3.out",
        delay: 0.3
    });
    
    gsap.from(".login-form", {
        duration: 1, 
        opacity: 0, 
        x: 50, 
        ease: "power3.out",
        delay: 0.3
    });
    
    gsap.from(".input-group", {
        duration: 0.5, 
        opacity: 0, 
        y: 20, 
        stagger: 0.1, 
        ease: "power3.out",
        delay: 0.6
    });
    
    // Manejo del formulario de inicio de sesión
    const loginForm = document.getElementById('loginForm');
    const notification = document.getElementById('notification');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const loginButton = document.getElementById('loginButton');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Mostrar animación de carga
        loginButton.disabled = true;
        loadingSpinner.style.display = 'inline-block';
        
        // Simular verificación de inicio de sesión (tiempo reducido)
        setTimeout(function() {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Validación básica
            if (email && password) {
                // Éxito - redirigir a página principal
                showNotification('¡Inicio de sesión exitoso! Redirigiendo...', 'success');
                setTimeout(function() {
                    window.location.href = "index.html"; // Cambiado a index.html (página principal)
                }, 1000);
            } else {
                // Error
                showNotification('Por favor, complete todos los campos correctamente.', 'error');
                loginButton.disabled = false;
                loadingSpinner.style.display = 'none';
            }
        }, 1000);
    });
    
    // Función para mostrar notificaciones
    function showNotification(message, type) {
        notification.textContent = message;
        notification.className = 'notification ' + type;
        notification.style.display = 'block';
        
        gsap.from(notification, {
            duration: 0.3,
            y: -20,
            opacity: 0,
            ease: "power3.out"
        });
        
        // Auto ocultar después de 5 segundos
        setTimeout(function() {
            gsap.to(notification, {
                duration: 0.3,
                opacity: 0,
                onComplete: function() {
                    notification.style.display = 'none';
                }
            });
        }, 5000);
    }
    
    // Efecto visual en los campos de entrada
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.querySelector('.input-icon').style.color = 'var(--primary-color)';
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentNode.querySelector('.input-icon').style.color = '#999';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value !== '') {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });
});
