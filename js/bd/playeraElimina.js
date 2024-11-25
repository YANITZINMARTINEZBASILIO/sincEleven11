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
    // Elimina el objeto completamente de la base de datos utilizando el ID.
    return bdEjecuta(Bd, [ALMACEN_PLAYERA], transaccion => {
      const almacenPlayera = transaccion.objectStore(ALMACEN_PLAYERA)
      almacenPlayera.delete(id)  // Elimina el objeto por su ID.
    })
  }
}

exportaAHtml(playeraElimina)
