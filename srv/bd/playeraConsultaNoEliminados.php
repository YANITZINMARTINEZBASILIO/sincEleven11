<?php

require_once __DIR__ . "/../../lib/php/select.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/../modelo/TABLA_PLAYERA.php";

/**
 * Consulta las playeras según los parámetros proporcionados.
 * Los parámetros son opcionales y se aplican solo si son proporcionados.
 *
 * @param string|null $nombre Nombre de la playera a buscar (opcional).
 * @param string|null $talla Talla de la playera a buscar (opcional).
 * @param string|null $tela Tipo de tela de la playera a buscar (opcional).
 * @param string|null $color Color de la playera a buscar (opcional).
 * 
 * @return array{
 *   PLA_ID: string,   // ID de la playera
 *   PLA_NOM: string,  // Nombre de la playera
 *   PLA_TALLA: string,// Talla de la playera
 *   PLA_TELA: string, // Tipo de tela
 *   PLA_COLOR: string // Color de la playera
 * }[]
 */
function playeraConsultaNoEliminados($nombre = null, $talla = null, $tela = null, $color = null)
{
    // Construir el array de condiciones dinámicamente
    $where = [];

    // Solo añadir las condiciones si los valores no son null
    if ($nombre !== null) {
        $where[PLA_NOM] = $nombre;  // Filtrar por nombre si se proporcionó
    }
    if ($talla !== null) {
        $where[PLA_TALLA] = $talla;  // Filtrar por talla si se proporcionó
    }
    if ($tela !== null) {
        $where[PLA_TELA] = $tela;    // Filtrar por tipo de tela si se proporcionó
    }
    if ($color !== null) {
        $where[PLA_COLOR] = $color;  // Filtrar por color si se proporcionó
    }

    // Ejecutar la consulta con las condiciones dinámicas
    return select(
        pdo: Bd::pdo(),
        from: PLAYERA,
        where: $where, // Pasar las condiciones dinámicas
        orderBy: PLA_NOM // Ordenar por nombre de la playera
    );
}
