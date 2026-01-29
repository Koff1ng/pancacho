<?php
require_once('funciones.php');  // Tu archivo original de funciones
//require_once('funciones_telegram.php');  // El nuevo archivo con funciones de Telegram

$update = json_decode(file_get_contents('php://input'), true);

if (isset($update['callback_query'])) {
    manejar_callback_query($update['callback_query']);
}

// Aquí puedes manejar otros tipos de actualizaciones si es necesario
?>
