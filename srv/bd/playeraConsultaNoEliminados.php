<?php

require_once __DIR__ . "/../../lib/php/select.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/../modelo/TABLA_PLAYERA.php";

/**
 * @return array{
 *    PLA_ID: string,
 *   PLA_NOM: string,
 *   PLA_TALLA: string,
 *   PLA_TELA: string,
 *   PLA_COLOR: string
 *  }[]
 */
function playeraConsultaNoEliminados()
{
 return select(
  pdo: Bd::pdo(),
  from: PLAYERA,
  where: [PLA_ID => 0],
  orderBy: PLA_NOM
 );
}
