/*
  Warnings:

  - The `vencLicencia` column on the `Usuario` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `alertas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `camion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mantencion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "alertas" DROP CONSTRAINT "alertas_patenteCamion_fkey";

-- DropForeignKey
ALTER TABLE "mantencion" DROP CONSTRAINT "mantencion_patenteCamion_fkey";

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "vencLicencia",
ADD COLUMN     "vencLicencia" TIMESTAMP(3);

-- DropTable
DROP TABLE "alertas";

-- DropTable
DROP TABLE "camion";

-- DropTable
DROP TABLE "mantencion";

-- CreateTable
CREATE TABLE "Camion" (
    "patente" TEXT NOT NULL,
    "tipoCamion" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "anio" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "capacidad" INTEGER,
    "nroMotor" TEXT NOT NULL,
    "nroChasis" TEXT NOT NULL,
    "fabrica" TEXT NOT NULL,
    "procedencia" TEXT NOT NULL,
    "tipoSello" TEXT NOT NULL,
    "combustible" TEXT NOT NULL,
    "kilometraje" INTEGER NOT NULL,
    "fRevisionTecnica" TIMESTAMP(3) NOT NULL,
    "fVencimientoSeguro" TIMESTAMP(3) NOT NULL,
    "permisoCirculacion" TIMESTAMP(3) NOT NULL,
    "estado" "Estado" NOT NULL DEFAULT 'Activo',

    CONSTRAINT "Camion_pkey" PRIMARY KEY ("patente")
);

-- CreateTable
CREATE TABLE "Mantencion" (
    "id" SERIAL NOT NULL,
    "patenteCamion" TEXT NOT NULL,
    "tipoMantencion" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "estado" "Estado" NOT NULL DEFAULT 'Activo',

    CONSTRAINT "Mantencion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alerta" (
    "id" SERIAL NOT NULL,
    "patenteCamion" TEXT NOT NULL,
    "tipoAlerta" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "estado" "Estado" NOT NULL DEFAULT 'Activo',

    CONSTRAINT "Alerta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Mantencion" ADD CONSTRAINT "Mantencion_patenteCamion_fkey" FOREIGN KEY ("patenteCamion") REFERENCES "Camion"("patente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alerta" ADD CONSTRAINT "Alerta_patenteCamion_fkey" FOREIGN KEY ("patenteCamion") REFERENCES "Camion"("patente") ON DELETE RESTRICT ON UPDATE CASCADE;
