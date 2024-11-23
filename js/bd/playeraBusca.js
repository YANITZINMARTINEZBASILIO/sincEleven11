import { bdConsulta } from "../../lib/js/bdConsulta.js"
import { exportaAHtml } from "../../lib/js/exportaAHtml.js"
import { validaPlayera } from "../modelo/validaPlayera.js"
import { ALMACEN_PLAYERA, Bd } from "./Bd.js"

/**
 * @param {string} id
 */
export async function playeraBusca(id) {

 return bdConsulta(Bd, [ALMACEN_PLAYERA],
  /**
   * @param {(resultado: import("../modelo/PLAYERA.js").PLAYERA|undefined)
   *                                                            => any} resolve 
   */
  (transaccion, resolve) => {

   /* Pide el primer objeto de ALMACEN_PLAYERA que tenga como llave
    * primaria el valor del parámetro id. */
   const consulta = transaccion.objectStore(ALMACEN_PLAYERA).get(id)

   // onsuccess se invoca solo una vez, devolviendo el objeto solicitado.
   consulta.onsuccess = () => {
    /* Se recupera el objeto solicitado usando
     *  consulta.result
     * Si el objeto no se encuentra se recupera undefined. */
    const objeto = consulta.result
    if (objeto !== undefined) {
     const modelo = validaPlayera(objeto)
     if (modelo.PLA_ID === "") {
      resolve(modelo)
      return
     }
    }
    resolve(undefined)

   }

  })

}

exportaAHtml(playeraBusca)