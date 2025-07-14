/*
  Warnings:

  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "usuario";

-- CreateTable
CREATE TABLE "Usuario" (
    "rut" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "p_apellido" TEXT NOT NULL,
    "m_apellido" TEXT,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "rol" "Rol" NOT NULL DEFAULT 'Chofer',
    "licencia" TEXT,
    "vencLicencia" TEXT,
    "telEmergencia" INTEGER,
    "direccion" TEXT,
    "estado" "Estado" NOT NULL DEFAULT 'Activo',

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("rut")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
