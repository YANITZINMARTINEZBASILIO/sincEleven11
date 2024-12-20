/**
 * @param { any } objeto
 * @returns {import("./PLAYERA.js").PLAYERA}
 */
export function validaPlayera(objeto) {

   if (typeof objeto.PLA_ID !== "string") 
     throw new Error("El id debe ser texto.")
   
 
   if (typeof objeto.PLA_NOM !== "string") 
     throw new Error("El nombre debe ser texto.")
   
 
   if (typeof objeto.PLA_TALLA !== "string") {
     console.log("Valor de PLA_TALLA:", objeto.PLA_TALLA); // Depura el valor de PLA_TALLA
     throw new Error("La talla debe ser texto.");
   }
 
   if (typeof objeto.PLA_TELA !== "string") 
     throw new Error("La Tela debe ser texto.")
   
 
   if (typeof objeto.PLA_COLOR !== "string") 
     throw new Error("El color debe ser texto.")
   
   if (typeof objeto.PLA_MODIFICACION !== "number")
    throw new Error("El campo modificacion debe ser número.")
  
   if (typeof objeto.PLA_ELIMINADO !== "number")
    throw new Error("El campo eliminado debe ser número.")
 
   return objeto;
 }
 