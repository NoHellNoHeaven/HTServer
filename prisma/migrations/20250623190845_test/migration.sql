/*
  Warnings:

  - You are about to drop the `chofer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "chofer" DROP CONSTRAINT "chofer_patenteCamion_fkey";

-- DropForeignKey
ALTER TABLE "chofer" DROP CONSTRAINT "chofer_usuarioRut_fkey";

-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "direccion" TEXT,
ADD COLUMN     "estado" "Estado" NOT NULL DEFAULT 'Activo',
ADD COLUMN     "licencia" TEXT,
ADD COLUMN     "telEmergencia" INTEGER,
ADD COLUMN     "vencLicencia" TEXT;

-- DropTable
DROP TABLE "chofer";
