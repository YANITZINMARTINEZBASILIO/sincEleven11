import { bdEjecuta } from "../../lib/js/bdEjecuta.js"
import { exportaAHtml } from "../../lib/js/exportaAHtml.js"
import { ALMACEN_PLAYERA, Bd } from "./Bd.js"
import { playeraBusca } from "./playeraBusca.js"

/**
 * @param { string } id
 */
export async function playeraElimina(id) {
  const modelo = await playeraBusca(id)

  if (modelo !== undefined) {
    modelo.PLA_MODIFICACION = Date.now()
    modelo.PLA_ELIMINADO = 1
    return bdEjecuta(Bd, [ALMACEN_PLAYERA], transaccion => {
     const almacenPlayera = transaccion.objectStore(ALMACEN_PLAYERA)
     almacenPlayera.put(modelo)
    })
   }

}

exportaAHtml(playeraElimina)
