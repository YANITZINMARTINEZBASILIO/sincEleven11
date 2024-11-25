import { bdEjecuta } from "../../lib/js/bdEjecuta.js"
import { ALMACEN_PLAYERA, Bd } from "./Bd.js"

/**
 * Borra el contenido del almacén PLAYERA y guarda nuevasplayeras.
 * @param {import("../modelo/PLAYERA.js").PLAYERA[]} nuevasplayeras
 */
export async function playerasReemplaza(nuevasplayeras) {
 return bdEjecuta(Bd, [ALMACEN_PLAYERA], transaccion => {
  const almacenPlayera = transaccion.objectStore(ALMACEN_PLAYERA)
  almacenPlayera.clear()
  for (const objeto of nuevasplayeras) {
   almacenPlayera.add(objeto)
  }
 })
}