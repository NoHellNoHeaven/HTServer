-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('Chofer', 'Admin');

-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('Activo', 'Inactivo', 'Pendiente');

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
    "vencLicencia" TIMESTAMP(3),
    "telEmergencia" INTEGER,
    "direccion" TEXT,
    "estado" "Estado" NOT NULL DEFAULT 'Activo',

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("rut")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Mantencion" ADD CONSTRAINT "Mantencion_patenteCamion_fkey" FOREIGN KEY ("patenteCamion") REFERENCES "Camion"("patente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alerta" ADD CONSTRAINT "Alerta_patenteCamion_fkey" FOREIGN KEY ("patenteCamion") REFERENCES "Camion"("patente") ON DELETE RESTRICT ON UPDATE CASCADE;
