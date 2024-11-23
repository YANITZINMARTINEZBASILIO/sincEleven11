import { enviaJson } from "../lib/js/enviaJson.js"
import { exportaAHtml } from "../lib/js/exportaAHtml.js"
import { muestraError } from "../lib/js/muestraError.js"
import { playeraConsultaTodos } from "./bd/playeraConsultaTodos.js"
import { playerasReemplaza } from "./bd/playeraReemplaza.js"
import { esperaUnPocoYSincroniza } from "./esperaUnPocoYSincroniza.js"
import { validaPlayeras } from "./modelo/validaPlayeras.js"
import { renderiza } from "./renderiza.js"

/**
 * @param {HTMLUListElement} lista
 */
export async function sincroniza(lista) {
 try {
  if (navigator.onLine) {
   const todos = await playeraConsultaTodos()
   const respuesta = await enviaJson("srv/sincroniza.php", todos)
   const pasatiempos = validaPlayeras(respuesta.body)
   await playerasReemplaza(pasatiempos)
   renderiza(lista, pasatiempos)
  }
 } catch (error) {
  muestraError(error)
 }
 esperaUnPocoYSincroniza(lista)

}

exportaAHtml(sincroniza)