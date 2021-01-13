<?php include("top.html") ?>
<script src="../controller/user.js" type="text/javascript"></script>
<!-- common style for form-boxes -->
<link href="css/boxes.css" type="text/css" rel="stylesheet">
<link href="css/user.css" type="text/css" rel="stylesheet">
</head>

<body>
    <?php include("navbar.html") ?>
    <div id="formWrap">
        <h1>Benvenut* su BB ceramics</h1>
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
                    <dd><input type="password" name="password" required></dd>
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
                    <dd><input type="password" name="rePassword" placeholder="Ripeti password" required></dd>
                    <dt></dt>
                    <dd><input type="submit" name="submit" value="Registrati"></dd>
                </dl>
            </div>
        </div>
    </div>
    <?php include("bottom.html") ?>
