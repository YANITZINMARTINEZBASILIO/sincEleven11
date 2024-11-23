<?php

class Bd
{

 private static ?PDO $pdo = null;

 static function pdo(): PDO
 {
  if (self::$pdo === null) {
   self::$pdo = new PDO(
    // cadena de conexión
    "sqlite:sincronizacion.db",
    // usuario
    null,
    // contraseña
    null,
    // Opciones: pdos no persistentes y lanza excepciones.
    [PDO::ATTR_PERSISTENT => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
   );

   self::$pdo->exec(
    'CREATE TABLE IF NOT EXISTS PLAYERA (
      PLA_ID INTEGER,
      PLA_NOM TEXT NOT NULL,
      PLA_TALLA TEXT NOT NULL,
      PLA_TELA TEXT NOT NULL,
      PLA_COLOR TEXT NOT NULL,
      CONSTRAINT PLA_PK
       PRIMARY KEY(PLA_ID),
      CONSTRAINT PLA_NOM_UNQ
       UNIQUE(PLA_NOM),
      CONSTRAINT PLA_NOM_NV
       CHECK(LENGTH(PLA_NOM) > 0)
     )'
   );
  }

  return self::$pdo;
 }
}
