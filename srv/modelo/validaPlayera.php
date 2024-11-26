<?php

require_once __DIR__ . "/../../lib/php/BAD_REQUEST.php";
require_once __DIR__ . "/../../lib/php/validaJson.php";
require_once __DIR__ . "/../../lib/php/ProblemDetails.php";
require_once __DIR__ . "/TABLA_PLAYERA.php";

function validaPlayera($objeto)
{

 $objeto = validaJson($objeto);

 if (!isset($objeto->PLA_ID) || !is_string($objeto->PLA_ID))
 throw new ProblemDetails(
     status: BAD_REQUEST,
     title: "El id debe ser texto.",
     type: "/error/idincorrecto.html"
 );

// Validación de PLA_NOM
if (!isset($objeto->PLA_NOM) || !is_string($objeto->PLA_NOM))
 throw new ProblemDetails(
     status: BAD_REQUEST,
     title: "El nombre debe ser texto.",
     type: "/error/nombreincorrecto.html"
 );

// Validación de PLA_TALLA
if (!isset($objeto->PLA_TALLA) || !is_string($objeto->PLA_TALLA))
 throw new ProblemDetails(
     status: BAD_REQUEST,
     title: "La talla debe ser texto.",
     type: "/error/nombreincorrecto.html"
 );

// Validación de PLA_TELA
if (!isset($objeto->PLA_TELA) || !is_string($objeto->PLA_TELA))
 throw new ProblemDetails(
     status: BAD_REQUEST,
     title: "El tipo de tela debe ser texto.",
     type: "/error/nombreincorrecto.html"
 );

// Validación de PLA_COLOR
if (!isset($objeto->PLA_COLOR) || !is_string($objeto->PLA_COLOR))
 throw new ProblemDetails(
     status: BAD_REQUEST,
     title: "El color debe ser texto.",
     type: "/error/nombreincorrecto.html"
 );

 if (!isset($objeto->PLA_MODIFICACION)  || !is_int($objeto->PLA_MODIFICACION))
 throw new ProblemDetails(
  status: BAD_REQUEST,
  title: "La modificacion debe ser número.",
  type: "/error/modificacionincorrecta.html",
 );

 if (!isset($objeto->PLA_ELIMINADO) || !is_int($objeto->PLA_ELIMINADO))
 throw new ProblemDetails(
  status: BAD_REQUEST,
  title: "El campo eliminado debe ser entero.",
  type: "/error/eliminadoincorrecto.html",
 );

// Si todas las validaciones son correctas, retornamos los valores del objeto.
return [
 PLA_ID => $objeto->PLA_ID,
 PLA_NOM => $objeto->PLA_NOM,
 PLA_TALLA => $objeto->PLA_TALLA,
 PLA_TELA => $objeto->PLA_TELA,
 PLA_COLOR => $objeto->PLA_COLOR,
 PLA_MODIFICACION => $objeto->PLA_MODIFICACION,
 PLA_ELIMINADO => $objeto->PLA_ELIMINADO
];
}
