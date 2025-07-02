-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('Chofer', 'Admin');

-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('Activo', 'Inactivo');

-- CreateTable
CREATE TABLE "usuario" (
    "rut" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "p_apellido" TEXT NOT NULL,
    "m_apellido" TEXT,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "rol" "Rol" NOT NULL DEFAULT 'Chofer',

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("rut")
);

-- CreateTable
CREATE TABLE "chofer" (
    "rut" TEXT NOT NULL,
    "usuarioRut" TEXT NOT NULL,
    "licencia" TEXT NOT NULL,
    "vencLicencia" TEXT NOT NULL,
    "telEmergencia" INTEGER,
    "direccion" TEXT,
    "estado" "Estado" NOT NULL DEFAULT 'Activo',
    "patenteCamion" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "camion" (
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
    "fRevisionTecnica" TEXT NOT NULL,
    "fVencimientoSeguro" TEXT NOT NULL,
    "permisoCirculacion" TEXT NOT NULL,
    "estado" "Estado" NOT NULL DEFAULT 'Activo',

    CONSTRAINT "camion_pkey" PRIMARY KEY ("patente")
);

-- CreateTable
CREATE TABLE "mantencion" (
    "id" SERIAL NOT NULL,
    "patenteCamion" TEXT NOT NULL,
    "tipoMantencion" TEXT NOT NULL,
    "fecha" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "estado" "Estado" NOT NULL DEFAULT 'Activo',

    CONSTRAINT "mantencion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alertas" (
    "id" SERIAL NOT NULL,
    "patenteCamion" TEXT NOT NULL,
    "tipoAlerta" TEXT NOT NULL,
    "fecha" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "estado" "Estado" NOT NULL DEFAULT 'Activo',

    CONSTRAINT "alertas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "chofer_rut_key" ON "chofer"("rut");

-- CreateIndex
CREATE UNIQUE INDEX "chofer_usuarioRut_key" ON "chofer"("usuarioRut");

-- CreateIndex
CREATE UNIQUE INDEX "chofer_patenteCamion_key" ON "chofer"("patenteCamion");

-- AddForeignKey
ALTER TABLE "chofer" ADD CONSTRAINT "chofer_usuarioRut_fkey" FOREIGN KEY ("usuarioRut") REFERENCES "usuario"("rut") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chofer" ADD CONSTRAINT "chofer_patenteCamion_fkey" FOREIGN KEY ("patenteCamion") REFERENCES "camion"("patente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mantencion" ADD CONSTRAINT "mantencion_patenteCamion_fkey" FOREIGN KEY ("patenteCamion") REFERENCES "camion"("patente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alertas" ADD CONSTRAINT "alertas_patenteCamion_fkey" FOREIGN KEY ("patenteCamion") REFERENCES "camion"("patente") ON DELETE RESTRICT ON UPDATE CASCADE;
