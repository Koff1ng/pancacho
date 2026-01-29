<?php
session_start();
define('PASSWORD', 'isla0109$$');

if (isset($_POST['pass'])) {
    if (hash_equals(PASSWORD, $_POST['pass'])) {
        $_SESSION['sesion'] = 'OK';
        header('Location: /administrador/admin/');
        exit;
    }
    $error = 'Contraseña incorrecta';
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <link rel="icon" type="image/png" href="isla.png">
    <meta charset="utf-8">
    <title>LOS DE LA ISLA</title>
    <style>
        body {
            min-height: 100vh;
            background: #000;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
            font-family: 'Montserrat', Arial, sans-serif;
        }
        .login-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            max-width: 420px;
            padding: 36px 24px 30px 24px;
            background: rgba(30,30,30,0.98);
            border-radius: 22px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.42);
        }
        .logo {
            width: 100%;
            max-width: 370px;
            margin-bottom: 30px;
            display: block;
        }
        form {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        input[type="password"] {
            width: 100%;
            max-width: 260px;
            padding: 12px 16px;
            font-size: 1.1rem;
            background: #191919;
            color: #fff;
            border: none;
            border-radius: 7px;
            margin-bottom: 16px;
            outline: none;
            box-shadow: 0 1px 2px #2224;
        }
        input[type="password"]::placeholder {
            color: #bbbbbb;
            opacity: 1;
        }
        button[type="submit"] {
            width: 100%;
            max-width: 260px;
            padding: 12px 16px;
            background: #e8be3e;
            color: #222;
            border: none;
            border-radius: 7px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.15s;
            margin-bottom: 10px;
        }
        button[type="submit"]:hover {
            background: #ffc700;
        }
        .error {
            color: #ff5a5a;
            font-size: 1rem;
            margin-top: 7px;
            margin-bottom: 0;
            text-align: center;
            width: 100%;
        }
    </style>
</head>
<body>
    <div class="login-box">
        <img src="losdelaisla.svg" class="logo" alt="Los de la isla">
        <form method="post" autocomplete="off">
            <input type="password" name="pass" placeholder="Contraseña" required>
            <button type="submit">Ingresar</button>
            <?php if (!empty($error)) echo "<p class='error'>$error</p>"; ?>
        </form>
    </div>
</body>
</html>
