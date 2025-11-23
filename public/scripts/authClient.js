// src/scripts/authClient.js
// Script de soporte para la página de login Teachly
// Se ejecuta automáticamente al cargar la página

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    console.log('[Teachly] authClient.js cargado correctamente');

    const form = document.querySelector('.login-form');
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');

    if (form) {
      form.addEventListener('submit', function (event) {
        // Validación simple en el cliente
        if (!emailInput.value || !passwordInput.value) {
          event.preventDefault();
          alert('Por favor, completa todos los campos.');
          return;
        }

        // Validación de formato de correo
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!emailPattern.test(emailInput.value)) {
          event.preventDefault();
          alert('Ingresa un correo electrónico válido.');
          return;
        }

        console.log('[Teachly] Formulario enviado correctamente');
      });
    }

    // Botón Google simulado
    const googleBtn = document.querySelector('.google-btn');
    if (googleBtn) {
      googleBtn.addEventListener('click', function () {
        alert('Inicio con Google próximamente...');
      });
    }

    // Botones de registrar y recuperar
    const registerBtn = document.querySelector('.link-btn.register');
    const recoverBtn = document.querySelector('.link-btn.recover');

    if (registerBtn) {
      registerBtn.addEventListener('click', () => {
        window.location.href = '/auth/register';
      });
    }

    if (recoverBtn) {
      recoverBtn.addEventListener('click', () => {
        alert('Función de recuperación próximamente...');
      });
    }
  });
})();
