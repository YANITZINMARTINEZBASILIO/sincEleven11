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
    
    // Escapar las propiedades para evitar inyecciones
    const nombre = htmlentities(modelo.PLA_NOM)
    const talla = htmlentities(modelo.PLA_TALLA)
    const tela = htmlentities(modelo.PLA_TELA)
    const color = htmlentities(modelo.PLA_COLOR)

    // Crear los parámetros de búsqueda para el enlace
    const searchParams = new URLSearchParams([["id", modelo.PLA_ID]])
    const params = htmlentities(searchParams.toString())

    // Generación del HTML de forma segura
    render += `
      <li class="md-two-line image">
        <img alt="Icono de Playera" src="img/icono2048.png">
        <p><a href="modifica.html?${params}"><span class="headline">${nombre}</span></a></p>
        <span class="supporting">Talla: ${talla}, Tipo de tela: ${tela}, Color: ${color}</span>
      </li>`
  }

  // Inyectar el HTML generado en el contenedor
  lista.innerHTML = render
}

exportaAHtml(renderiza)
