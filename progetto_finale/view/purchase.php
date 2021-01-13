<?php include("top.html");
include("../model/common.php");
?>
<script src="../controller/purchase.js" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.min.js"></script>
<!-- common style for form-boxes -->
<link href="css/boxes.css" type="text/css" rel="stylesheet">
<link href="css/purchase.css" type="text/css" rel="stylesheet">

</head>

<body>
    <?php include("navbar.html") ?>
  <div id="formWrap">
    <h1>Totale: </h1>
      <dl>
          <dt>Intestario della carta:</dt>
          <dd><input type="text" required></dd>
          <dt>Via:</dt>
          <dd><input type="text" name='street' required></dd>
          <div class="multi">
              <dt>Provincia:</dt>
              <dd><input type="text" name='prov' required></dd>
              <dt>Città:</dt>
              <dd><input type="text" name='city' required></dd>
          </div>
          <dt>Numero della carta:</dt>
          <dd><input type="text" name="cardNum" placeholder="0000 0000 0000 0000" required></dd>
          <div class="multi">
              <dt>Scadenza:</dt>
              <dd><input type="text" name="expire" placeholder="00 / 00" required></dd>
              <dt>CVC:</dt>
              <dd><input type="text" name='cvc' data-mask="000" placeholder="000" maxlength="3" required></dd>
          </div>
          <dt></dt>
          <dd><input type="submit" name="submit" value="Acquista" required></dd>
      </dl>
  </div>

<?php include("bottom.html") ?>