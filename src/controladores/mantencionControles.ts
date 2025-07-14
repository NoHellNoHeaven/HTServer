import { Request, Response } from "express";
import prisma from "../models/prisma";

export const crearMantencion = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { patenteCamion, tipoMantencion, fecha, descripcion, estado } = req.body;

  if (!patenteCamion || !tipoMantencion || !fecha) {
    res.status(400).json({
      message: "Faltan datos obligatorios: patenteCamion, tipoMantencion, fecha",
    });
    return;
  }

  try {
    const mantencionCreada = await prisma.mantencion.create({
      data: {
        tipoMantencion,
        fecha: new Date(fecha),
        descripcion,
        estado,
        camion: {
          connect: { patente: patenteCamion },
        },
      },
    });

    res.status(201).json({
      message: "Mantención creada correctamente",
      data: mantencionCreada,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al crear mantención",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const obtenerMantencionPorId = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const idParsed = Number(req.params.id);
  if (isNaN(idParsed)) {
    res.status(400).json({ message: "ID inválido" });
    return;
  }

  try {
    const mantencion = await prisma.mantencion.findUnique({
      where: { id: idParsed },
      include: { camion: true },
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

export const obtenerTodasMantenciones = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const mantenciones = await prisma.mantencion.findMany({
      include: { camion: true },
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
  const idParsed = Number(req.params.id);
  if (isNaN(idParsed)) {
    res.status(400).json({ message: "ID inválido" });
    return;
  }

  const { tipoMantencion, fecha, descripcion, estado, patenteCamion } = req.body;

  try {
    const mantencionExistente = await prisma.mantencion.findUnique({
      where: { id: idParsed },
    });

    if (!mantencionExistente) {
      res.status(404).json({ message: "Mantención no encontrada" });
      return;
    }

    const mantencionActualizada = await prisma.mantencion.update({
      where: { id: idParsed },
      data: {
        tipoMantencion,
        fecha: fecha ? new Date(fecha) : undefined,
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
  const idParsed = Number(req.params.id);
  if (isNaN(idParsed)) {
    res.status(400).json({ message: "ID inválido" });
    return;
  }

  try {
    const mantencionEliminada = await prisma.mantencion.delete({
      where: { id: idParsed },
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
