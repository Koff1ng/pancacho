<?php


session_start();

if(isset($_SESSION['estado']) && $_SESSION['estado'] == 1){
    header('location:/404.php');


}else if(isset($_SESSION['estado']) && $_SESSION['estado'] == 2){

    header('location:/404.php');

}else if(isset($_SESSION['estado']) && $_SESSION['estado'] == 3){

    header('location:https://www.4-72.com.co/publicaciones/236/personas/');
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>ERROR 404</title>
</head>
<body>
    <img src="/img/error.avif" alt="" srcset="" width="100%">
</body>
</html>