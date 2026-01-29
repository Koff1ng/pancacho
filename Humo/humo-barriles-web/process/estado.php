<?php 
require('../administrador/lib/funciones.php');

$reg = $_COOKIE['registro'];

$es = buscar_estado($reg);

echo $es;
?>