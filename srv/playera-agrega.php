<?php

require_once __DIR__ . "/../lib/php/ejecutaServicio.php";
require_once __DIR__ . "/../lib/php/recuperaTexto.php";
require_once __DIR__ . "/../lib/php/validaNombre.php";
require_once __DIR__ . "/../lib/php/insert.php";
require_once __DIR__ . "/../lib/php/devuelveCreated.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/TABLA_PLAYERA.php";

ejecutaServicio(function () {

    $nombre = recuperaTexto("nombre");
    $talla = recuperaTexto("talla");
    $tela = recuperaTexto("tela");
    $color = recuperaTexto("color");
   
    $nombre = validaNombre($nombre);
    $talla = validaTalla($talla);
    $tela = validaTela($tela);
    $color = validaColor($color);
   

 $pdo = Bd::pdo();
 insert(pdo: $pdo, into: PLAYERA, values: [PLA_NOM => $nombre, PLA_TALLA => $talla, PLA_TELA => $tela, PLA_COLOR => $color]);
 $id = $pdo->lastInsertId();

 $encodeId = urlencode($id);
 devuelveCreated("/srv/playera.php?id=$encodeId", [
  "id" => ["value" => $id],
  "nombre" => ["value" => $nombre],
  "talla" => ["value" => $talla],
  "tela" => ["value" => $tela],
  "color" => ["value" => $color],
 ]);
});
