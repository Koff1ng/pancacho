<?php

session_start();


// Realizar la conexión a la base de datos y ejecutar la consulta
$conexion = mysqli_connect('sql10.freesqldatabase.com', 'sql10815651', 'ex8yVen4BK', 'sql10815651');
$query = "SELECT estado FROM estado_servidor WHERE id = 1";
$resultado = mysqli_query($conexion, $query);



$query2 = "SELECT * FROM estado_servicios";
$resultado2 = mysqli_query($conexion, $query2);

if ($resultado2) {
    // Si la consulta se ejecutó correctamente
    
    // Mostrar los registros
    $contador = 1;
    while ($row = mysqli_fetch_assoc($resultado2)) {
        // Aquí puedes acceder a los campos de cada registro utilizando $row['nombre_campo']
        $_SESSION[$row['nombre_servicio']] = $row['estado_servicio'];
    }
} else {
    // Si ocurrió un error en la consulta
    echo "Error en la consulta: " . mysqli_error($conexion);
}

// Obtener el valor del campo
$valorCampo = mysqli_fetch_assoc($resultado)['estado'];

// Verificar si el campo ha cambiado o no
if ($valorCampo == '1') {
  $response = array('campo_cambiado' => '1');
  $_SESSION['estado'] = 1;

}else if($valorCampo == '2'){
    $response = array('campo_cambiado' => '2');
    $_SESSION['estado'] = 2;


} else if($valorCampo == '3') {
    $response = array('campo_cambiado' => '3');
    $_SESSION['estado'] = 3;

}

// Devolver la respuesta como JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
