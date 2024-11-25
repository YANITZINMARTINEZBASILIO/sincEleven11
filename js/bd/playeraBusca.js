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
   * @param {(resultado: import("../modelo/PLAYERA.js").PLAYERA|undefined) => any} resolve 
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

    // Si el objeto es undefined, no se encuentra en la base de datos.
    if (objeto !== undefined) {
      // Validar el objeto para asegurarse de que tiene las propiedades necesarias.
      const modelo = validaPlayera(objeto)

      // Verificar si el modelo tiene las propiedades esperadas (ajusta la validación si es necesario).
      if (modelo && modelo.PLA_NOM && modelo.PLA_TALLA && modelo.PLA_TELA && modelo.PLA_COLOR) {
        resolve(modelo) // Si todo está bien, se resuelve el modelo.
        return
      }
    }

    // Si el objeto no cumple las condiciones o no fue encontrado, resuelve con undefined.
    resolve(undefined)
   }

  })
}

// Exporta la función de búsqueda de playera a HTML
exportaAHtml(playeraBusca)
