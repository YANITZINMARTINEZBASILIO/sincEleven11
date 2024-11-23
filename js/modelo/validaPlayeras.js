import { validaPlayera } from "./validaPlayera.js"

/**
 * @param { any } objetos
 * @returns {import("./PLAYERA.js").PLAYERA[]}
 */
export function validaPlayeras(objetos) {
 if (!Array.isArray(objetos))
  throw new Error("no se recibió un arreglo.")
 /**
  * @type {import("./PLAYERA.js").PLAYERA[]}
  */
 const arreglo = []
 for (const objeto of objetos) {
  arreglo.push(validaPlayera(objeto))
 }
 return arreglo
}