// Cerebro y Familia · comportamiento del sitio (sin dependencias)
(function () {
  var html = document.documentElement;

  // Menú en móvil
  var botonMenu = document.querySelector('.boton-menu');
  var nav = document.getElementById('menu-principal');
  if (botonMenu && nav) {
    botonMenu.addEventListener('click', function () {
      var abierto = nav.classList.toggle('abierto');
      botonMenu.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('abierto')) {
        nav.classList.remove('abierto');
        botonMenu.setAttribute('aria-expanded', 'false');
        botonMenu.focus();
      }
    });
  }

  // Letra más grande (se recuerda en este navegador)
  var botonLetra = document.querySelector('.boton-letra');
  function aplicarLetra(grande) {
    html.classList.toggle('letra-grande', grande);
    if (botonLetra) botonLetra.setAttribute('aria-pressed', grande ? 'true' : 'false');
  }
  try { aplicarLetra(localStorage.getItem('cyf-letra') === 'grande'); } catch (e) {}
  if (botonLetra) {
    botonLetra.addEventListener('click', function () {
      var grande = !html.classList.contains('letra-grande');
      aplicarLetra(grande);
      try { localStorage.setItem('cyf-letra', grande ? 'grande' : 'normal'); } catch (e) {}
    });
  }

  // Formulario de contacto: arma un mensaje y lo abre en WhatsApp.
  var form = document.getElementById('form-contacto');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nombre = form.nombre.value.trim();
      var error = document.getElementById('error-nombre');
      if (!nombre) {
        error.hidden = false;
        form.nombre.setAttribute('aria-invalid', 'true');
        form.nombre.focus();
        return;
      }
      error.hidden = true;
      form.nombre.removeAttribute('aria-invalid');
      var quien = form.querySelector('input[name="quien"]:checked');
      var partes = ['Hola, Cerebro y Familia. Soy ' + nombre + '.'];
      if (quien) partes.push(quien.value + '.');
      if (form.ciudad.value.trim()) partes.push('Escribo desde ' + form.ciudad.value.trim() + '.');
      if (form.mensaje.value.trim()) partes.push(form.mensaje.value.trim());
      var numero = form.getAttribute('data-whatsapp');
      window.open('https://wa.me/' + numero + '?text=' + encodeURIComponent(partes.join(' ')), '_blank', 'noopener');
    });
  }
})();
