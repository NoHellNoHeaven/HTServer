/*
  Warnings:

  - You are about to drop the column `capacidad` on the `Camion` table. All the data in the column will be lost.
  - You are about to drop the column `fVencimientoSeguro` on the `Camion` table. All the data in the column will be lost.
  - You are about to drop the column `permisoCirculacion` on the `Camion` table. All the data in the column will be lost.
  - You are about to drop the column `descripcion` on the `Mantencion` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `Mantencion` table. All the data in the column will be lost.
  - You are about to drop the column `fecha` on the `Mantencion` table. All the data in the column will be lost.
  - You are about to drop the column `patenteCamion` on the `Mantencion` table. All the data in the column will be lost.
  - You are about to drop the column `tipoMantencion` on the `Mantencion` table. All the data in the column will be lost.
  - You are about to drop the `Alerta` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `estado` on table `Camion` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `accion` to the `Mantencion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `camionPatente` to the `Mantencion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kilometraje` to the `Mantencion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meses` to the `Mantencion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Mantencion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proximoKilometraje` to the `Mantencion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Alerta" DROP CONSTRAINT "Alerta_patenteCamion_fkey";

-- DropForeignKey
ALTER TABLE "Mantencion" DROP CONSTRAINT "Mantencion_patenteCamion_fkey";

-- AlterTable
ALTER TABLE "Camion" DROP COLUMN "capacidad",
DROP COLUMN "fVencimientoSeguro",
DROP COLUMN "permisoCirculacion",
ALTER COLUMN "estado" SET NOT NULL;

-- AlterTable
ALTER TABLE "Mantencion" DROP COLUMN "descripcion",
DROP COLUMN "estado",
DROP COLUMN "fecha",
DROP COLUMN "patenteCamion",
DROP COLUMN "tipoMantencion",
ADD COLUMN     "accion" TEXT NOT NULL,
ADD COLUMN     "camionPatente" TEXT NOT NULL,
ADD COLUMN     "kilometraje" INTEGER NOT NULL,
ADD COLUMN     "meses" INTEGER NOT NULL,
ADD COLUMN     "nombre" TEXT NOT NULL,
ADD COLUMN     "proximoKilometraje" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Alerta";

-- AddForeignKey
ALTER TABLE "Mantencion" ADD CONSTRAINT "Mantencion_camionPatente_fkey" FOREIGN KEY ("camionPatente") REFERENCES "Camion"("patente") ON DELETE CASCADE ON UPDATE CASCADE;
