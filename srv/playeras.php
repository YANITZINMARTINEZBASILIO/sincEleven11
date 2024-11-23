<?php

require_once __DIR__ . "/../lib/php/ejecutaServicio.php";
require_once __DIR__ . "/../lib/php/select.php";
require_once __DIR__ . "/../lib/php/devuelveJson.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/TABLA_PLAYERA.php";

ejecutaServicio(function () {

 $lista = select(pdo: Bd::pdo(),  from: PLAYERA,  orderBy: PLA_NOM);

 $render = "";
 foreach ($lista as $modelo) {
  $encodeId = urlencode($modelo[PLA_ID]);
  $id = htmlentities($encodeId);
  $nombre = htmlentities($modelo[PLA_NOM]);
  $talla = htmlentities($modelo[PLA_TALLA]);
  $tela = htmlentities($modelo[PLA_TELA]);
  $color = htmlentities($modelo[PLA_COLOR]);
  $render .=
   " <li class='md-two-line image'>
   <img alt='Coyote de Neza' src='img/icono2048.png'>
           <a href='modifica.html?id=$id'> <span class='headline'>{$nombre} </span></a>
            <span class='supporting'>Talla: {$talla}, Tipo de tela: {$tela}, Color: {$color}</span>
         </li>
         ";
 }

 devuelveJson(["lista" => ["innerHTML" => $render]]);
});

// <p>
//       <a href='modifica.html?id=$id'>$nombre</a>
//      </p>