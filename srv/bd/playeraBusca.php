<?php

require_once __DIR__ . "/../../lib/php/selectFirst.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/../modelo/TABLA_PLAYERA.php";

/**
 * @return false | array{
 *   PLA_ID: string,
 *   PLA_NOM: string,
 *   PLA_TALLA: string,
 *   PLA_TELA: string,
 *   PLA_COLOR: string,
 *  }
 */
function playeraBusca(string $id): false|array
{
 return selectFirst(
  pdo: Bd::pdo(),
  from: PLAYERA,
  where: [PLA_ID => $id]
 );
}
