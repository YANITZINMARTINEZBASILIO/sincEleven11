import { bdEjecuta } from "../../lib/js/bdEjecuta.js"
import { exportaAHtml } from "../../lib/js/exportaAHtml.js"
import { validaId } from "../modelo/validaId.js"
import { validaNombre } from "../modelo/validaNombre.js"
import { ALMACEN_PLAYERA, Bd } from "./Bd.js"
import { playeraBusca } from "./playeraBusca.js"

/**
 * @param { import("../modelo/PLAYERA.js").PLAYERA } modelo
 */
export async function playeraModifica(modelo) {
 validaNombre(modelo.PLA_NOM)
 if (modelo.PLA_ID === undefined)
  throw new Error(`Falta PLA_ID de ${modelo.PLA_NOM}.`)
 validaId(modelo.PLA_ID)
 const anterior = await playeraBusca(modelo.PLA_ID)
 if (anterior !== undefined) {
  return bdEjecuta(Bd, [ALMACEN_PLAYERA], transaccion => {
   const almacenPlayera = transaccion.objectStore(ALMACEN_PLAYERA)
   almacenPlayera.put(modelo)
  })
 }
}

exportaAHtml(playeraModifica)