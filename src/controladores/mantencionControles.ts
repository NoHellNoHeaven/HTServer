import { Request, Response } from "express";
import prisma from "../models/prisma"; // Usa un solo PrismaClient

export const crearMantencion = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { patenteCamion, tipoMantencion, fecha, descripcion, estado } =
    req.body;

  try {
    const crearMantencion = await prisma.mantencion.create({
      data: {
        tipoMantencion,
        fecha,
        descripcion,
        estado,
        camion: {
          connect: { patente: patenteCamion },
        },
      },
    });

    res.status(201).json({
      message: "Mantención creada correctamente",
      data: crearMantencion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al crear mantención",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

// Obtener una mantención por ID
export const obtenerMantencionPorId = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  try {
    const mantencion = await prisma.mantencion.findUnique({
      where: { id: Number(id) },
      include: {
        camion: true, // Incluye los datos del camión relacionado
      },
    });

    if (!mantencion) {
      res.status(404).json({ message: "Mantención no encontrada" });
      return;
    }

    res.status(200).json(mantencion);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener mantención",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

// Obtener todas las mantenciones
export const obtenerTodasMantenciones = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const mantenciones = await prisma.mantencion.findMany({
      include: {
        camion: true,
      },
    });

    res.status(200).json(mantenciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener las mantenciones",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const actualizarMantencion = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  const { tipoMantencion, fecha, descripcion, estado, patenteCamion } =
    req.body;

  try {
    // Verifica si la mantención existe antes de actualizar
    const mantencionExistente = await prisma.mantencion.findUnique({
      where: { id: Number(id) },
    });

    if (!mantencionExistente) {
      res.status(404).json({ message: "Mantención no encontrada" });
      return;
    }

    const mantencionActualizada = await prisma.mantencion.update({
      where: { id: Number(id) },
      data: {
        tipoMantencion,
        fecha,
        descripcion,
        estado,
        ...(patenteCamion && {
          camion: {
            connect: { patente: patenteCamion },
          },
        }),
      },
    });

    res.status(200).json({
      message: "Mantención actualizada correctamente",
      data: mantencionActualizada,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al actualizar mantención",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const eliminarMantencion = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  try {
    const mantencionEliminada = await prisma.mantencion.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({
      message: "Mantención eliminada correctamente",
      data: mantencionEliminada,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al eliminar mantención",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};
