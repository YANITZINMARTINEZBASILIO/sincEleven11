import { bdEjecuta } from "../../lib/js/bdEjecuta.js"
import { creaIdCliente } from "../../lib/js/creaIdCliente.js"
import { ALMACEN_PLAYERA, Bd } from "./Bd.js"
import { validaNombre } from "../modelo/validaNombre.js"
import { exportaAHtml } from "../../lib/js/exportaAHtml.js"

/**
 * @param {import("../modelo/PLAYERA.js").PLAYERA} modelo
 */
export async function playeraAgrega(modelo) {
 validaNombre(modelo.PLA_NOM)
 // Genera id único en internet.
 modelo.PLA_ID = creaIdCliente(Date.now().toString())
 return bdEjecuta(Bd, [ALMACEN_PLAYERA], transaccion => {
  const almacenPlayera = transaccion.objectStore(ALMACEN_PLAYERA)
  almacenPlayera.add(modelo)
 })
}

exportaAHtml(playeraAgrega)