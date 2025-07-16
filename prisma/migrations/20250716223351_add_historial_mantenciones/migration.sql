-- CreateTable
CREATE TABLE "historial_mantenciones" (
    "id" SERIAL NOT NULL,
    "fechaRealizada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "camionPatente" TEXT NOT NULL,
    "camionMarca" TEXT NOT NULL,
    "camionModelo" TEXT NOT NULL,
    "mantencionNombre" TEXT NOT NULL,
    "mantencionAccion" TEXT NOT NULL,
    "kilometrajeRealizado" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "historial_mantenciones_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "historial_mantenciones" ADD CONSTRAINT "historial_mantenciones_camionPatente_fkey" FOREIGN KEY ("camionPatente") REFERENCES "Camion"("patente") ON DELETE CASCADE ON UPDATE CASCADE;
