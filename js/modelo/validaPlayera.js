/**
 * @param { any } objeto
 * @returns {import("./PLAYERA.js").PLAYERA}
 */
export function validaPlayera(objeto) {

 if (typeof objeto.PLA_ID !== "string")
  throw new Error("El id debe ser texto.")

 if (typeof objeto.PLA_NOM !== "string")
  throw new Error("El nombre debe ser texto.")

 if (typeof objeto.PLA_TALLA !== "string")
  throw new Error("La talla debe ser numeros y comas.")

 if (typeof objeto.PLA_TELA !== "string")
    throw new Error("La tela debe ser texto.")

 if (typeof objeto.PLA_COLOR !== "string")
    throw new Error("El color debe ser texto.")

 return objeto

}