<!-- BB Ceramics, sito di e-commerce per pezzi di ceramica artigianale
     Autore: Federico Serra
     Pagina di visualizzazione pezzi di ceramica (shop) -->

<?php include("top.html");
include("../model/common.php");
?>
<script src="../controller/shop.js" type="text/javascript"></script>
<link href="css/shop.css" type="text/css" rel="stylesheet">

</head>

<body>
    <?php include("navbar.html") ?>

    <h1>Shop</h1>
    <hr />
    <form action="../model/shop/filter.php">
        <fieldset>
            <legend>Migliora la ricerca:</legend>
            <label>Ordina per prezzo</label>
            <select name="price">
                <option value="" selected>Non ordinare</option>
                <option value="ASC">Crescente</option>
                <option value="DESC">Decrescente</option>
            </select>
            <label>Scegli un colore</label>
            <select name="color">
                <option value="" selected>Tutti i colori</option>
            </select>
            <label>Scegli una categoria</label>
            <select name="category">
                <option value="" selected>Tutte le categorie</option>
            </select>
            <input type="submit" value="Conferma">
        </fieldset>
    </form>

    <div class="grid"></div>

    <?php include("bottom.html") ?>
