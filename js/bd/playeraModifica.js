import { bdEjecuta } from "../../lib/js/bdEjecuta.js";
import { exportaAHtml } from "../../lib/js/exportaAHtml.js";
import { validaId } from "../modelo/validaId.js";
import { validaNombre } from "../modelo/validaNombre.js";
import { validaTalla } from "../modelo/validaTalla.js";
import { validaTela } from "../modelo/validaTela.js";
import { validaColor } from "../modelo/validaColor.js";
import { ALMACEN_PLAYERA, Bd } from "./Bd.js";
import { playeraBusca } from "./playeraBusca.js";

/**
 * @param { import("../modelo/PLAYERA.js").PLAYERA } modelo
 */
export async function playeraModifica(modelo) {
  // Validación de los campos
  validaNombre(modelo.PLA_NOM);
  validaTalla(modelo.PLA_TALLA);
  validaTela(modelo.PLA_TELA);
  validaColor(modelo.PLA_COLOR);

  // Verifica que PLA_ID esté presente
  if (modelo.PLA_ID === undefined) {
    throw new Error(`Falta PLA_ID de ${modelo.PLA_NOM}.`);
  }
  validaId(modelo.PLA_ID);

  // Buscar la playera antes de modificarla
  const anterior = await playeraBusca(modelo.PLA_ID);

  if (anterior !== undefined) {
    // Aquí solo actualizamos los campos principales de la playera
    return bdEjecuta(Bd, [ALMACEN_PLAYERA], transaccion => {
      const almacenPlayera = transaccion.objectStore(ALMACEN_PLAYERA);
      almacenPlayera.put(modelo);  // Actualiza la playera en la base de datos
    });
  } else {
    throw new Error(`Playera no encontrada con ID: ${modelo.PLA_ID}`);
  }
}

// Exporta la función a HTML para su uso
exportaAHtml(playeraModifica);
