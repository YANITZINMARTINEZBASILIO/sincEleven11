<?php

require_once __DIR__ . "/../lib/php/ejecutaServicio.php";
require_once __DIR__ . "/../lib/php/recuperaIdEntero.php";
require_once __DIR__ . "/../lib/php/recuperaTexto.php";
require_once __DIR__ . "/../lib/php/validaNombre.php";
require_once __DIR__ . "/../lib/php/update.php";
require_once __DIR__ . "/../lib/php/devuelveJson.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/TABLA_PLAYERA.php";

ejecutaServicio(function () {

 $id = recuperaIdEntero("id");
 $nombre = recuperaTexto("nombre");
 $talla = recuperaTexto("talla");
 $tela = recuperaTexto("tela");
 $color = recuperaTexto("color");

 $nombre = validaNombre($nombre);
 $talla = validaTalla($talla);
 $tela = validaTela($tela);
 $color = validaColor($color);

 update(
  pdo: Bd::pdo(),
  table: PLAYERA,
  set: [PLA_NOM => $nombre, PLA_TALLA => $talla, PLA_TELA => $tela, PLA_COLOR => $color],
  where: [PLA_ID => $id]
 );

 devuelveJson([
  "id" => ["value" => $id],
  "nombre" => ["value" => $nombre],
  "talla" => ["value" => $talla],
  "tela" => ["value" => $tela],
  "color" => ["value" => $color],
 ]);
});
