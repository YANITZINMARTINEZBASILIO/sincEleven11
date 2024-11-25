<?php

require_once __DIR__ . "/../lib/php/ejecutaServicio.php";
require_once __DIR__ . "/../lib/php/recuperaJson.php";
require_once __DIR__ . "/../lib/php/devuelveJson.php";
require_once __DIR__ . "/../lib/php/ProblemDetails.php";
require_once __DIR__ . "/../lib/php/devuelveProblemDetails.php";
require_once __DIR__ . "/../lib/php/devuelveErrorInterno.php";
require_once __DIR__ . "/modelo/TABLA_PASATIEMPO.php";
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
        $modeloEnElCliente = validaPlayera($modelo);  // Valida la playera que llegó del cliente
        $modeloEnElServidor = playeraBusca($modeloEnElCliente[PLA_ID]);  // Busca en el servidor por PLA_ID

        if ($modeloEnElServidor === false) {
            // CONFLICTO: El modelo no está en el servidor, agregarlo solo si no está eliminado.
            // NOTA: Como ya no usamos PAS_ELIMINADO, se puede agregar directamente.
            playeraAgrega($modeloEnElCliente);
        } elseif (
            $modeloEnElServidor[PLA_NOM] !== $modeloEnElCliente[PLA_NOM] || // Conflicto en el nombre
            $modeloEnElServidor[PLA_TALLA] !== $modeloEnElCliente[PLA_TALLA] || // Conflicto en talla
            $modeloEnElServidor[PLA_TELA] !== $modeloEnElCliente[PLA_TELA] || // Conflicto en tela
            $modeloEnElServidor[PLA_COLOR] !== $modeloEnElCliente[PLA_COLOR]    // Conflicto en color
        ) {
            // CONFLICTO: Los registros no coinciden, actualizamos el servidor con los datos del cliente.
            playeraModifica($modeloEnElCliente);
        }
    }

    // Consultamos todos los modelos no eliminados (esto es solo un ejemplo, si necesitas algo diferente
    // se puede ajustar el filtro en la consulta).
    $lista = playeraConsultaNoEliminados();  // Aquí si sigues necesitando el filtro, lo adaptamos a tu lógica

    // Devolvemos la respuesta con los modelos.
    devuelveJson($lista);
});
