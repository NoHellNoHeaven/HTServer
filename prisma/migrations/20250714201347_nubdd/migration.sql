/*
  Warnings:

  - Changed the type of `estado` on the `Alerta` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `estado` on the `Camion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `estado` on the `Mantencion` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `estado` on the `Usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Alerta" DROP COLUMN "estado",
ADD COLUMN     "estado" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Camion" DROP COLUMN "estado",
ADD COLUMN     "estado" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Mantencion" DROP COLUMN "estado",
ADD COLUMN     "estado" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "estado",
ADD COLUMN     "estado" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Estado";
