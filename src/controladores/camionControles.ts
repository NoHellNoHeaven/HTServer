import { Request, Response } from "express";
import prisma from "../models/prisma"; // Usa un solo PrismaClient

export const crearCamion = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const {
    patente,
    tipoCamion,
    marca,
    modelo,
    anio,
    color,
    capacidad,
    nroMotor,
    nroChasis,
    fabrica,
    procedencia,
    tipoSello,
    combustible,
    kilometraje,
    fRevisionTecnica,
    fVencimientoSeguro,
    permisoCirculacion,
  } = req.body;

  try {
    // 1. Crear camion
    const crearCamion = await prisma.camion.create({
      data: {
        patente,
        tipoCamion,
        marca,
        modelo,
        anio,
        color,
        capacidad,
        nroMotor,
        nroChasis,
        fabrica,
        procedencia,
        tipoSello,
        combustible,
        kilometraje,
        fRevisionTecnica,
        fVencimientoSeguro,
        permisoCirculacion,
      },
    });

    // 2. Respuesta
    res.status(201).json({
      message: "Camión creado correctamente",
      data: { crearCamion },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al crear el camión",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

// Obtener todos los camiones
export const obtenerCamiones = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const camiones = await prisma.camion.findMany();
    res.status(200).json(camiones);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener camiones",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

// Obtener camión por patente
export const obtenerCamionPorPatente = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { patente } = req.params;

  try {
    const camion = await prisma.camion.findUnique({
      where: { patente },
    });

    if (!camion) {
      res.status(404).json({ message: "Camión no encontrado" });
      return;
    }

    res.status(200).json(camion);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener camión",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const actualizarCamion = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { patente } = req.params;
  const datos = req.body;

  try {
    const camionExistente = await prisma.camion.findUnique({
      where: { patente },
    });

    if (!camionExistente) {
      res.status(404).json({ message: "Camión no encontrado" });
      return;
    }

    const camionActualizado = await prisma.camion.update({
      where: { patente },
      data: datos,
    });

    res.status(200).json({
      message: "Camión actualizado correctamente",
      data: camionActualizado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al actualizar camión",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const eliminarCamion = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { patente } = req.params;

  try {
    const camionEliminado = await prisma.camion.delete({
      where: { patente },
    });

    res.status(200).json({
      message: "Camión eliminado correctamente",
      data: camionEliminado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al eliminar camión",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};
