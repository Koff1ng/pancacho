<?php 
$usuario = $_POST['usr'];
setcookie('usuario',$usuario,time()+60*9);
?>