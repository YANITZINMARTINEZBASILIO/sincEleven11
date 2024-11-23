<?php

require_once __DIR__ . "/../../lib/php/validaNombre.php";
require_once __DIR__ . "/../../lib/php/insert.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/../modelo/TABLA_PLAYERA.php";
require_once __DIR__ . "/../modelo/validaId.php";

/**
 * @param array{
 *   PLA_ID: string,
 *   PLA_NOM: string,
 *   PLA_TALLA: string,
 *   PLA_TELA: string,
 *   PLA_COLOR: string
 *  } $modelo
 */
function playeraAgrega(array $modelo)
{
 validaId($modelo[PLA_ID]);
 validaNombre($modelo[PLA_NOM]);
 validaTalla($modelo[PLA_TALLA]);
 validaTela($modelo[PLA_TELA]);
 validaColor($modelo[PLA_COLOR]);
 insert(pdo: Bd::pdo(), into: PLAYERA, values: $modelo);
}
