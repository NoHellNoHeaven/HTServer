-- AlterTable
ALTER TABLE "Alerta" ALTER COLUMN "estado" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Camion" ALTER COLUMN "estado" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Mantencion" ALTER COLUMN "estado" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "estado" DROP NOT NULL;
