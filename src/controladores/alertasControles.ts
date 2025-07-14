import { Request, Response } from "express";
import prisma from "../models/prisma";

// Crear alerta
export const crearAlertas = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const {
    tipoAlerta,
    fecha,
    descripcion,
    estado = "Pendiente",
    patenteCamion,
  } = req.body;

  if (!patenteCamion || !tipoAlerta || !fecha) {
    res.status(400).json({
      message: "Faltan datos obligatorios: patenteCamion, tipoAlerta, fecha",
    });
    return;
  }

  try {
    const alertaCreada = await prisma.alerta.create({
      data: {
        tipoAlerta,
        fecha: new Date(fecha),
        descripcion,
        estado,
        camion: {
          connect: { patente: patenteCamion },
        },
      },
    });

    res.status(201).json({
      message: "Alerta creada correctamente",
      data: alertaCreada,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al crear la alerta",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Obtener todas las alertas
export const obtenerAlertas = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const alertas = await prisma.alerta.findMany({
      include: {
        camion: true,
      },
    });
    res.status(200).json(alertas);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener alertas",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Obtener una alerta por ID
export const obtenerAlertaPorId = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const idParsed = Number(req.params.id);
  if (isNaN(idParsed)) {
    res.status(400).json({ message: "ID inválido" });
    return;
  }

  try {
    const alerta = await prisma.alerta.findUnique({
      where: { id: idParsed },
      include: {
        camion: true,
      },
    });

    if (!alerta) {
      res.status(404).json({ message: "Alerta no encontrada" });
      return;
    }

    res.status(200).json(alerta);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener alerta",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Actualizar una alerta
export const actualizarAlerta = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const idParsed = Number(req.params.id);
  if (isNaN(idParsed)) {
    res.status(400).json({ message: "ID inválido" });
    return;
  }

  const { tipoAlerta, fecha, descripcion, estado, patenteCamion } = req.body;

  try {
    const alertaExistente = await prisma.alerta.findUnique({
      where: { id: idParsed },
    });

    if (!alertaExistente) {
      res.status(404).json({ message: "Alerta no encontrada" });
      return;
    }

    const alertaActualizada = await prisma.alerta.update({
      where: { id: idParsed },
      data: {
        tipoAlerta,
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
      message: "Alerta actualizada correctamente",
      data: alertaActualizada,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al actualizar alerta",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Eliminar una alerta
export const eliminarAlerta = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const idParsed = Number(req.params.id);
  if (isNaN(idParsed)) {
    res.status(400).json({ message: "ID inválido" });
    return;
  }

  try {
    const alertaEliminada = await prisma.alerta.delete({
      where: { id: idParsed },
    });

    res.status(200).json({
      message: "Alerta eliminada correctamente",
      data: alertaEliminada,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al eliminar alerta",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
