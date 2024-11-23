<?php

require_once __DIR__ . "/../lib/php/ejecutaServicio.php";
require_once __DIR__ . "/../lib/php/recuperaJson.php";
require_once __DIR__ . "/../lib/php/devuelveJson.php";
require_once __DIR__ . "/../lib/php/ProblemDetails.php";
require_once __DIR__ . "/../lib/php/devuelveProblemDetails.php";
require_once __DIR__ . "/../lib/php/devuelveErrorInterno.php";
require_once __DIR__ . "/modelo/TABLA_PLAYERA.php";
require_once __DIR__ . "/modelo/validaPlayera.php";
require_once __DIR__ . "/bd/playeraAgrega.php";
require_once __DIR__ . "/bd/playeraBusca.php";
require_once __DIR__ . "/bd/playeraConsultaNoEliminados.php";
require_once __DIR__ . "/bd/playeraModifica.php";

ejecutaServicio(function () {

 $lista = recuperaJson();

 if (!is_array($lista)) {
  $lista = [];
 }

 foreach ($lista as $modelo) {
  $modeloEnElCliente = validaPlayera($modelo);
  $modeloEnElServidor = playeraBusca($modeloEnElCliente[PLA_ID]);

  if ($modeloEnElServidor === false) {

   /* CONFLICTO: El modelo no ha estado en el servidor.
    * AGREGARLO solamente si no está eliminado. */
   if ($modeloEnElCliente[PLA_ID] === 0) {
    playeraAgrega($modeloEnElCliente);
   }
  } elseif (
   $modeloEnElServidor[PLA_ID] === 0
   && $modeloEnElCliente[PLA_ID] === 1
  ) {

   /* CONFLICTO: El registro está en el servidor, donde no se ha eliminado, pero
    * ha sido eliminado en el cliente.
    * Gana el cliente, porque optamos por no revivir lo eliminado. */
   playeraModifica($modeloEnElCliente);
  } else if (
   $modeloEnElCliente[PLA_ID] === 0
   && $modeloEnElServidor[PLA_ID] === 0
  ) {

   /* CONFLICTO: Registros en el servidor y en el cliente. Pueden ser
    * diferentes.
    * GANA FECHA MÁS GRANDE. Cuando gana el servidor, no se hace nada. */
   if (
    $modeloEnElCliente[PLA_TALLA] >
    $modeloEnElServidor[PLA_TALLA]
    
   ) {
    // La versión del cliente es más nueva y prevalece.
    playeraModifica($modeloEnElCliente);
   }
  }
 }

 $lista = playeraConsultaNoEliminados();

 devuelveJson($lista);
});
