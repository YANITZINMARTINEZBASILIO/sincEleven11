export const ALMACEN_PLAYERA = "PLAYERA"
export const PLA_ID = "PLA_ID"
export const INDICE_NOMBRE = "INDICE_NOMBRE"
export const PLA_NOM = "PLA_NOM"
export const PLA_TALLA = "PLA_TALLA"
export const PLA_TELA = "PLA_TELA"
export const PLA_COLOR = "PLA_COLOR"
const BD_NOMBRE = "sincronizacion"
const BD_VERSION = 1

/** @type { Promise<IDBDatabase> } */
export const Bd = new Promise((resolve, reject) => {

 /* Se solicita abrir la base de datos, indicando nombre y
  * número de versión. */
 const solicitud = indexedDB.open(BD_NOMBRE, BD_VERSION)

 // Si se presenta un error, rechaza la promesa.
 solicitud.onerror = () => reject(solicitud.error)

 // Si se abre con éxito, devuelve una conexión a la base de datos.
 solicitud.onsuccess = () => resolve(solicitud.result)

 // Si es necesario, se inicia una transacción para cambio de versión.
 solicitud.onupgradeneeded = () => {

  const bd = solicitud.result

  // Como hay cambio de versión, borra el almacén si es que existe.
  if (bd.objectStoreNames.contains(ALMACEN_PLAYERA)) {
   bd.deleteObjectStore(ALMACEN_PLAYERA)
  }

  // Crea el almacén "PLAYERA" con el campo llave "PLA_ID".
  const almacenPlayera =
   bd.createObjectStore(ALMACEN_PLAYERA, { keyPath: PLA_ID })

  // Crea un índice ordenado por el campo "PLA_NOM" que no acepta duplicados.
  almacenPlayera.createIndex(INDICE_NOMBRE, "PLA_NOM")
 }

})