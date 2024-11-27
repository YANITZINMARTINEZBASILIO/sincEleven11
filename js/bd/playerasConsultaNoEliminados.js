import { bdConsulta } from "../../lib/js/bdConsulta.js"
import { exportaAHtml } from "../../lib/js/exportaAHtml.js"
import { validaPlayera } from "../modelo/validaPlayera.js"
import { ALMACEN_PLAYERA, Bd, INDICE_NOMBRE } from "./Bd.js"

export async function playerasConsultaNoEliminados() {

 return bdConsulta(Bd, [ALMACEN_PLAYERA],
  /**
   * @param {(resultado: import("../modelo/PLAYERA.js").PLAYERA[])=>void
   *                                                                  } resolve
   */
  (transaccion, resolve) => {

   const resultado = []

   const almacenPlayera = transaccion.objectStore(ALMACEN_PLAYERA)

   // Usa el índice INDICE_NOMBRE para recuperar los datos ordenados.
   const indiceNombre = almacenPlayera.index(INDICE_NOMBRE)

   // Pide un cursor para recorrer cada objeto que devuelve la consulta.
   const consulta = indiceNombre.openCursor()

   /* onsuccess se invoca por cada uno de los objetos de la consulta y una vez
    * cuando se acaban dichos objetos. */
   consulta.onsuccess = () => {
    /* El cursor correspondiente al objeto se recupera usando
     *  consulta.result */
    const cursor = consulta.result
    if (cursor === null) {
     /* Si el cursor vale null, ya no hay más objetos que procesar; por lo
      * mismo, se devuelve el resultado con los pasatiempos recuperados, usando
      *  resolve(resultado). */
     resolve(resultado)
    } else {
     /* Si el cursor no vale null y hay más objetos, el siguiente se obtiene con
      *  cursor.value */
     const modelo = validaPlayera(cursor.value)
     if (modelo.PLA_TALLA == "") {
      resultado.push(modelo)
     }
     /* Busca el siguiente objeto de la consulta, que se recupera la siguiente
      * vez que se invoque la función onsuccess. */
     cursor.continue()
    }
   }

  })

}

exportaAHtml(playerasConsultaNoEliminados)