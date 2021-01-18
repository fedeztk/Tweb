<!-- BB Ceramics, sito di e-commerce per pezzi di ceramica artigianale
     Autore: Federico Serra
     Pagina di login/signup -->

<?php include("top.html");

/* if user is logged and try to access this page is redirected to index */
if (!isset($_SESSION))
    session_start();
if (isset($_SESSION['email']))
    header('location: index.php');
?>

<script src="../controller/user.js" type="text/javascript"></script>
<!-- common style for form-boxes -->
<link href="css/boxes.css" type="text/css" rel="stylesheet">
<link href="css/user.css" type="text/css" rel="stylesheet">
</head>

<body>
    <?php include("navbar.html") ?>
    <div id="formWrap">
        <h2>Benvenut* su BB ceramics</h2>
        <ul class="selector">
            <li class="field active"><a href="#login">Entra</a></li>
            <li class="field"><a href="#signup">Registrati</a></li>
        </ul>

        <div class="boxWrap">

            <div id="login">
                <dl>
                    <dt>Indirizzo e-mail</dt>
                    <dd><input type="email" name="email" required></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="password" required minlength="6"></dd>
                    <dt> </dt>
                    <dd><input type="submit" name="submit" value="Accedi"></dd>
                </dl>
            </div>

            <div id="signup">
                <dl>
                    <dt>Il tuo nome</dt>
                    <dd><input type="text" name="username" required></dd>
                    <dt>Indirizzo e-mail</dt>
                    <dd><input type="email" name="email" required></dd>
                    <dt>Password<span id="pwdLenCheck"></span></dt>
                    <dd><input type="password" name="password" placeholder="Almeno 6 caratteri" required minlength="6"></dd>
                    <dt>Verifica password<span id="pwdVerify"></span></dt>
                    <dd><input type="password" name="rePassword" placeholder="Ripeti password" required minlength="6"></dd>
                    <dt></dt>
                    <dd><input type="submit" name="submit" value="Registrati"></dd>
                </dl>
            </div>
        </div>
    </div>
    <?php include("bottom.html") ?>
