import { exportaAHtml } from "../lib/js/exportaAHtml.js"
import { htmlentities } from "../lib/js/htmlentities.js"

/**
 * @param {HTMLUListElement} lista
 * @param {import("./modelo/PLAYERA.js").PLAYERA[]} playeras
 */
export function renderiza(lista, playeras) {
 let render = ""
 for (const modelo of playeras) {
  if (modelo.PLA_ID === undefined)
   throw new Error(`Falta PLA_ID de ${modelo.PLA_NOM}.`)
  const nombre = htmlentities(modelo.PLA_NOM)
  const searchParams = new URLSearchParams([["id", modelo.PLA_ID]])
  const params = htmlentities(searchParams.toString())
  render += /* html */
   `<li>
     <p><a href="modifica.html?${params}">${nombre}</a></p>
    </li>`
 }
 lista.innerHTML = render
}

exportaAHtml(renderiza)