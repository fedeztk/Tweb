<!-- 
Federico Serra matricola 898925
Corso di Tecnologie Web
    Consegna esercizio 4 di laboratorio: PHP e forms HTML
    - aggiunta l'opzione di scelta del sesso ricercato dall'utente ("politically  correct").
      Per questo motivo si è modificato il file singles.txt, aggiungendo un campo [M|F|B]
      che indica le proprio preferenze (la B sta per both). Il campo viene scelto al 
      momento dell'iscrizione ed è messo di default a both genders
    - come da consegna non sono stati implementati controlli sull'input (es.: login inesistente)
-->
<?php include "top.html"; ?>

<div>
    <h1>Welcome!</h1>

    <ul>
        <li>
            <a href="signup.php">
                <img src="http://www.cs.washington.edu/education/courses/cse190m/12sp/homework/4/signup.gif" alt="icon">
                Sign up for a new account
            </a>
        </li>

        <li>
            <a href="matches.php">
                <img src="http://www.cs.washington.edu/education/courses/cse190m/12sp/homework/4/heartbig.gif" alt="icon">
                Check your matches
            </a>
        </li>
    </ul>
</div>

<?php include "bottom.html"; ?>
