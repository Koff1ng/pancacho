<?php
require('../lib/funciones.php');

// Log para depuración
file_put_contents('telegram_log.txt', print_r($_POST, true), FILE_APPEND);

if(isset($_POST['id'])) {
    $resultado = enviar_a_telegram($_POST);
    if($resultado) {
        echo "OK";
    } else {
        echo "ERROR";
    }
} else {
    echo "ERROR";
}
?>